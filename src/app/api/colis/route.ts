import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { sendNewPackageEmail, ColisEmailData } from '@/lib/email';
import { sendStatusSMS } from '@/lib/sms';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

/**
 * Génère un numéro de commande unique au format OP-XXXXX
 */
function generateTrackingNumber() {
  const prefix = 'OP-';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = prefix;
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Formate une date au format attendu par Prisma
 */
function formatDateForPrisma(dateStr: string) {
  if (!dateStr) return null;
  
  // Si la date est déjà au format ISO, on la retourne telle quelle
  if (dateStr.includes('T')) {
    return dateStr;
  }
  
  // Sinon, on assume que c'est une date au format YYYY-MM-DD
  // et on la convertit en ISO-8601
  try {
    return new Date(dateStr).toISOString();
  } catch (e) {
    return null;
  }
}

/**
 * Valide les données d'un colis avant création/modification
 */
function validateColisData(data: any) {
  const errors = [];

  // Vérification des champs obligatoires
  if (!data.colis_nom || !data.colis_nom.trim()) {
    errors.push('La description du colis est requise');
  }
  
  if (!data.proprietaire_nom || !data.proprietaire_nom.trim()) {
    errors.push('Le nom du destinataire est requis');
  }
  
  if (!data.proprietaire_email || !data.proprietaire_email.trim()) {
    errors.push('L\'email du destinataire est requis');
  } else {
    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.proprietaire_email)) {
      errors.push('Format d\'email invalide');
    }
  }
  
  if (!data.proprietaire_telephone || !data.proprietaire_telephone.trim()) {
    errors.push('Le téléphone du destinataire est requis');
  }
  
  // Vérification des dates
  try {
    if (!data.date_commande) {
      errors.push('La date de commande est requise');
    }
    
    if (!data.estimation_livraison) {
      errors.push('La date d\'estimation de livraison est requise');
    }
  } catch (e) {
    errors.push('Format de date invalide');
  }
  
  return errors;
}

// GET all packages
export async function GET(req: NextRequest) {
  try {
    // Utiliser une requête SQL directe sans Prisma pour éviter les problèmes de dates
    const formattedColis = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      try {
        // Récupérer les données avec les dates formatées directement par MySQL
        const results = await tx.$queryRawUnsafe(`
          SELECT id, colis_nom, description, numero_commande, proprietaire_nom,
          proprietaire_email, proprietaire_telephone, conseiller_technique_email,
          statut_ordered, statut_validated, statut_preparing, statut_departure,
          statut_in_transit, statut_out_of_delivery, statut_delivered, statut_attente_douane,
          statut_en_cours_de_reparation, statut_reparation_terminee, 
          description_validated, description_preparing, description_departure,
          description_attente_douane, description_delivered, 
          description_en_cours_de_reparation, description_reparation_terminee,
          prise_rendez_vous_active, details_supplementaires_visible,
          details_supplementaires, etapes_suivi, rendez_vous_statut,
          IF(date_commande = '0000-00-00', NULL, DATE_FORMAT(date_commande, '%Y-%m-%d')) as formatted_date_commande,
          IF(estimation_livraison = '0000-00-00', NULL, DATE_FORMAT(estimation_livraison, '%Y-%m-%d')) as formatted_estimation_livraison,
          IF(date_ajout = '0000-00-00', NULL, DATE_FORMAT(date_ajout, '%Y-%m-%d')) as formatted_date_ajout
          FROM wp_tracking_colis 
          ORDER BY id DESC
        `);
        
        // Convertir les résultats
        const now = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD pour date par défaut
        
        return Array.isArray(results) ? results.map(colis => {
          return {
            ...colis,
            // Utiliser les dates formatées par MySQL ou des dates par défaut
            date_commande: colis.formatted_date_commande || now,
            date_reception: colis.formatted_date_commande || now, // Utiliser date_commande pour date_reception
            date_ajout: colis.formatted_date_ajout || now,
            estimation_livraison: colis.formatted_estimation_livraison || now,
            rendez_vous_date: null,
            
            // Assurez-vous que les booléens sont correctement typés
            statut_ordered: Boolean(colis.statut_ordered),
            statut_validated: Boolean(colis.statut_validated),
            statut_preparing: Boolean(colis.statut_preparing),
            statut_departure: Boolean(colis.statut_departure),
            statut_in_transit: Boolean(colis.statut_in_transit),
            statut_out_of_delivery: Boolean(colis.statut_out_of_delivery),
            statut_delivered: Boolean(colis.statut_delivered),
            statut_attente_douane: Boolean(colis.statut_attente_douane),
            statut_en_cours_de_reparation: Boolean(colis.statut_en_cours_de_reparation),
            statut_reparation_terminee: Boolean(colis.statut_reparation_terminee),
            prise_rendez_vous_active: Boolean(colis.prise_rendez_vous_active),
            details_supplementaires_visible: Boolean(colis.details_supplementaires_visible),
          };
        }) : [];
      } catch (error) {
        console.error("Erreur lors de la requête SQL:", error);
        return [];
      }
    });
    
    return NextResponse.json(formattedColis, { status: 200 });
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
  }
}

// POST create a new package
export async function POST(req: NextRequest) {
  try {
    let data = await req.json();
    
    // Validation des données
    const validationErrors = validateColisData(data);
    if (validationErrors.length > 0) {
      return NextResponse.json({ 
        error: 'Données invalides', 
        details: validationErrors 
      }, { status: 400 });
    }
    
    // Transformer les dates au format attendu par Prisma
    data.date_commande = formatDateForPrisma(data.date_commande);
    data.date_reception = formatDateForPrisma(data.date_reception);
    data.estimation_livraison = formatDateForPrisma(data.estimation_livraison);
    
    // S'assurer que la date d'ajout est définie
    data.date_ajout = new Date().toISOString();
    
    // Gérer les champs null/undefined pour les dates optionnelles
    if (data.rendez_vous_date) {
      data.rendez_vous_date = formatDateForPrisma(data.rendez_vous_date);
    }
    
    // Générer un numéro de commande si absent
    if (!data.numero_commande || !data.numero_commande.trim()) {
      data.numero_commande = generateTrackingNumber();
    }
    
    // Utiliser une requête SQL directe au lieu de Prisma pour l'insertion
    const result = await prisma.$executeRawUnsafe(`
      INSERT INTO wp_tracking_colis (
        colis_nom, description, numero_commande, 
        date_commande, date_reception, estimation_livraison, date_ajout,
        proprietaire_nom, proprietaire_email, proprietaire_telephone,
        conseiller_technique_email,
        statut_ordered, statut_validated, statut_preparing, statut_departure,
        statut_in_transit, statut_out_of_delivery, statut_delivered, statut_attente_douane,
        statut_en_cours_de_reparation, statut_reparation_terminee,
        description_validated, description_preparing, description_departure,
        description_attente_douane, description_delivered, 
        description_en_cours_de_reparation, description_reparation_terminee,
        prise_rendez_vous_active, details_supplementaires_visible
      ) VALUES (
        '${data.colis_nom.replace(/'/g, "''")}', 
        '${data.description.replace(/'/g, "''")}', 
        '${data.numero_commande}',
        '${new Date(data.date_commande).toISOString().split('T')[0]}', 
        '${new Date(data.date_reception).toISOString().split('T')[0]}', 
        '${new Date(data.estimation_livraison).toISOString().split('T')[0]}',
        NOW(),
        '${data.proprietaire_nom.replace(/'/g, "''")}', 
        '${data.proprietaire_email}', 
        '${data.proprietaire_telephone}',
        ${data.conseiller_technique_email ? `'${data.conseiller_technique_email}'` : 'NULL'},
        ${data.statut_ordered ? 1 : 0}, 
        ${data.statut_validated ? 1 : 0}, 
        ${data.statut_preparing ? 1 : 0}, 
        ${data.statut_departure ? 1 : 0},
        ${data.statut_in_transit ? 1 : 0}, 
        ${data.statut_out_of_delivery ? 1 : 0}, 
        ${data.statut_delivered ? 1 : 0}, 
        ${data.statut_attente_douane ? 1 : 0},
        ${data.statut_en_cours_de_reparation ? 1 : 0}, 
        ${data.statut_reparation_terminee ? 1 : 0},
        '${data.description_validated || ""}', 
        '${data.description_preparing || ""}', 
        '${data.description_departure || ""}',
        '${data.description_attente_douane || ""}', 
        '${data.description_delivered || ""}', 
        '${data.description_en_cours_de_reparation || ""}', 
        '${data.description_reparation_terminee || ""}',
        ${data.prise_rendez_vous_active ? 1 : 0}, 
        ${data.details_supplementaires_visible ? 1 : 0}
      )
    `);
    
    // Récupérer l'ID du colis nouvellement créé
    const resultId = await prisma.$queryRawUnsafe(`
      SELECT LAST_INSERT_ID() as id
    `);
    
    const newId = Array.isArray(resultId) ? resultId[0].id : null;
    
    // Récupérer le colis créé (sans utiliser Prisma directement)
    const newColisData = await prisma.$queryRawUnsafe(`
      SELECT * FROM wp_tracking_colis WHERE id = ${newId}
    `);
    
    const newColis = Array.isArray(newColisData) && newColisData.length > 0 ? 
      {
        ...newColisData[0],
        // Formater les dates pour la réponse
        date_commande: new Date(data.date_commande).toISOString(),
        date_reception: new Date(data.date_reception).toISOString(),
        estimation_livraison: new Date(data.estimation_livraison).toISOString(),
        date_ajout: new Date().toISOString()
      } : 
      { id: newId };
    
    // Envoyer un email de confirmation au client
    try {
      const estimationDate = new Date(data.estimation_livraison);
      const formattedEstimationDate = format(estimationDate, 'dd MMMM yyyy', { locale: fr });
      
      const emailData: ColisEmailData = {
        id: newId,
        colisNom: data.colis_nom,
        numeroCommande: data.numero_commande,
        proprietaireNom: data.proprietaire_nom,
        proprietaireEmail: data.proprietaire_email,
        conseillerTechniqueEmail: data.conseiller_technique_email || undefined,
        status: 'Commandé',
        estimationLivraison: formattedEstimationDate
      };
      
      await sendNewPackageEmail(emailData);
    } catch (emailError) {
      console.error('Erreur lors de l\'envoi de l\'email:', emailError);
      // On continue même si l'envoi d'email échoue
    }
    
    // Envoyer un SMS de confirmation au client
    try {
      await sendStatusSMS(
        data.proprietaire_telephone,
        data.proprietaire_nom,
        data.numero_commande,
        'Commandé'
      );
      console.log(`SMS de confirmation envoyé à ${data.proprietaire_telephone}`);
    } catch (smsError) {
      console.error('Erreur lors de l\'envoi de l\'SMS:', smsError);
      // On continue même si l'envoi d'SMS échoue
    }
    
    return NextResponse.json(newColis, { status: 201 });
  } catch (error: any) {
    console.error('Error creating package:', error);
    
    return NextResponse.json({ 
      error: 'Failed to create package',
      details: error.message || 'Unknown error'
    }, { status: 500 });
  }
} 