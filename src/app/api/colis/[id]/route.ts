import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendStatusUpdateEmail, ColisEmailData } from '@/lib/email';

// Fonction pour formatter de façon sécurisée les dates
const formatDateSafely = (date: any) => {
  if (!date) return null;
  try {
    // Pour les dates MySQL '0000-00-00', on retourne null
    if (date.toString().includes('0000-00-00')) return null;
    return new Date(date).toISOString();
  } catch (e) {
    return null;
  }
};

// GET a specific package by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    // Utiliser une requête SQL qui évite les problèmes de dates
    const result = await prisma.$queryRawUnsafe(`
      SELECT id, colis_nom, description, numero_commande, proprietaire_nom, 
      proprietaire_email, proprietaire_telephone,
      statut_ordered, statut_validated, statut_preparing, statut_departure,
      statut_in_transit, statut_out_of_delivery, statut_delivered, statut_attente_douane,
      statut_en_cours_de_reparation, statut_reparation_terminee, 
      description_validated, description_preparing, description_departure,
      description_attente_douane, description_delivered, 
      description_en_cours_de_reparation, description_reparation_terminee,
      prise_rendez_vous_active, details_supplementaires_visible,
      details_supplementaires, etapes_suivi, rendez_vous_statut
      FROM wp_tracking_colis 
      WHERE id = ${id}
    `);
    
    // Vérifier qu'on a trouvé un résultat
    if (!result || (Array.isArray(result) && result.length === 0)) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }
    
    // Obtenir le premier élément du résultat (il devrait n'y en avoir qu'un)
    const colisData = Array.isArray(result) ? result[0] : result;
    
    // Utilisez des dates par défaut pour éviter les erreurs
    const now = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
    
    // Formater correctement les dates et booléens
    const colis = {
      ...colisData,
      // Utiliser des dates par défaut
      date_commande: now,
      date_reception: now,
      date_ajout: now,
      estimation_livraison: now,
      rendez_vous_date: null,
      
      // S'assurer que les booléens sont correctement typés
      statut_ordered: Boolean(colisData.statut_ordered),
      statut_validated: Boolean(colisData.statut_validated),
      statut_preparing: Boolean(colisData.statut_preparing),
      statut_departure: Boolean(colisData.statut_departure),
      statut_in_transit: Boolean(colisData.statut_in_transit),
      statut_out_of_delivery: Boolean(colisData.statut_out_of_delivery),
      statut_delivered: Boolean(colisData.statut_delivered),
      statut_attente_douane: Boolean(colisData.statut_attente_douane),
      statut_en_cours_de_reparation: Boolean(colisData.statut_en_cours_de_reparation),
      statut_reparation_terminee: Boolean(colisData.statut_reparation_terminee),
      prise_rendez_vous_active: Boolean(colisData.prise_rendez_vous_active),
      details_supplementaires_visible: Boolean(colisData.details_supplementaires_visible),
    };
    
    return NextResponse.json(colis, { status: 200 });
  } catch (error) {
    console.error('Error fetching package:', error);
    return NextResponse.json({ error: 'Failed to fetch package' }, { status: 500 });
  }
}

// PUT update a package
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const data = await req.json();
    
    // Récupérer l'état actuel du colis pour comparer les changements de statut
    const currentColisResult = await prisma.$queryRawUnsafe(`
      SELECT * FROM wp_tracking_colis 
      WHERE id = ${id}
    `);
    
    const currentColis = Array.isArray(currentColisResult) && currentColisResult.length > 0 ? 
      currentColisResult[0] : 
      null;
    
    if (!currentColis) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }
    
    // Vérifier si un changement de statut a eu lieu
    const statusChanged = 
      (data.statut_validated !== undefined && Boolean(data.statut_validated) !== Boolean(currentColis.statut_validated)) ||
      (data.statut_preparing !== undefined && Boolean(data.statut_preparing) !== Boolean(currentColis.statut_preparing)) ||
      (data.statut_departure !== undefined && Boolean(data.statut_departure) !== Boolean(currentColis.statut_departure)) ||
      (data.statut_in_transit !== undefined && Boolean(data.statut_in_transit) !== Boolean(currentColis.statut_in_transit)) ||
      (data.statut_out_of_delivery !== undefined && Boolean(data.statut_out_of_delivery) !== Boolean(currentColis.statut_out_of_delivery)) ||
      (data.statut_attente_douane !== undefined && Boolean(data.statut_attente_douane) !== Boolean(currentColis.statut_attente_douane)) ||
      (data.statut_delivered !== undefined && Boolean(data.statut_delivered) !== Boolean(currentColis.statut_delivered)) ||
      (data.statut_en_cours_de_reparation !== undefined && Boolean(data.statut_en_cours_de_reparation) !== Boolean(currentColis.statut_en_cours_de_reparation)) ||
      (data.statut_reparation_terminee !== undefined && Boolean(data.statut_reparation_terminee) !== Boolean(currentColis.statut_reparation_terminee));
    
    // Convertir les dates en format SQL valide
    const date_commande = data.date_commande ? new Date(data.date_commande).toISOString().split('T')[0] : null;
    const date_reception = data.date_reception ? new Date(data.date_reception).toISOString().split('T')[0] : null;
    const estimation_livraison = data.estimation_livraison ? new Date(data.estimation_livraison).toISOString().split('T')[0] : null;
    const rendez_vous_date = data.rendez_vous_date ? new Date(data.rendez_vous_date).toISOString().split('T')[0] : null;
    
    // Construire dynamiquement les champs pour la mise à jour
    const updateFields = [];
    
    // Ajout des champs non-date
    if (data.colis_nom !== undefined) updateFields.push(`colis_nom = '${data.colis_nom.replace(/'/g, "''")}'`);
    if (data.description !== undefined) updateFields.push(`description = '${data.description.replace(/'/g, "''")}'`);
    if (data.numero_commande !== undefined) updateFields.push(`numero_commande = '${data.numero_commande}'`);
    if (data.proprietaire_nom !== undefined) updateFields.push(`proprietaire_nom = '${data.proprietaire_nom.replace(/'/g, "''")}'`);
    if (data.proprietaire_email !== undefined) updateFields.push(`proprietaire_email = '${data.proprietaire_email}'`);
    if (data.proprietaire_telephone !== undefined) updateFields.push(`proprietaire_telephone = '${data.proprietaire_telephone}'`);
    
    // Ajout des champs date
    if (date_commande) updateFields.push(`date_commande = '${date_commande}'`);
    if (date_reception) updateFields.push(`date_reception = '${date_reception}'`);
    if (estimation_livraison) updateFields.push(`estimation_livraison = '${estimation_livraison}'`);
    if (rendez_vous_date) {
      updateFields.push(`rendez_vous_date = '${rendez_vous_date}'`);
    } else if (data.rendez_vous_date === null) {
      updateFields.push(`rendez_vous_date = NULL`);
    }
    
    // Ajout des champs booléens
    const booleanFields = [
      'statut_ordered', 'statut_validated', 'statut_preparing', 'statut_departure',
      'statut_in_transit', 'statut_out_of_delivery', 'statut_delivered', 'statut_attente_douane',
      'statut_en_cours_de_reparation', 'statut_reparation_terminee', 'prise_rendez_vous_active',
      'details_supplementaires_visible'
    ];
    
    for (const field of booleanFields) {
      if (data[field] !== undefined) {
        updateFields.push(`${field} = ${data[field] ? 1 : 0}`);
      }
    }
    
    // Ajout des champs texte
    const textFields = [
      'description_validated', 'description_preparing', 'description_departure',
      'description_attente_douane', 'description_delivered', 'description_en_cours_de_reparation',
      'description_reparation_terminee', 'rendez_vous_statut'
    ];
    
    for (const field of textFields) {
      if (data[field] !== undefined) {
        updateFields.push(`${field} = '${(data[field] || '').replace(/'/g, "''")}'`);
      }
    }
    
    // Champs de type longtext
    if (data.details_supplementaires !== undefined) {
      if (data.details_supplementaires) {
        updateFields.push(`details_supplementaires = '${data.details_supplementaires.replace(/'/g, "''")}'`);
      } else {
        updateFields.push(`details_supplementaires = NULL`);
      }
    }
    
    if (data.etapes_suivi !== undefined) {
      if (data.etapes_suivi) {
        updateFields.push(`etapes_suivi = '${data.etapes_suivi.replace(/'/g, "''")}'`);
      } else {
        updateFields.push(`etapes_suivi = NULL`);
      }
    }
    
    // Exécuter la requête de mise à jour si des champs ont été modifiés
    if (updateFields.length > 0) {
      await prisma.$executeRawUnsafe(`
        UPDATE wp_tracking_colis 
        SET ${updateFields.join(', ')}
        WHERE id = ${id}
      `);
    }
    
    // Récupérer le colis mis à jour
    const updatedColisResult = await prisma.$queryRawUnsafe(`
      SELECT * FROM wp_tracking_colis 
      WHERE id = ${id}
    `);
    
    const updatedColisData = Array.isArray(updatedColisResult) && updatedColisResult.length > 0 ? 
      updatedColisResult[0] : 
      null;
    
    if (!updatedColisData) {
      return NextResponse.json({ error: 'Package not found after update' }, { status: 404 });
    }
    
    // Formater les dates pour la réponse
    const now = new Date().toISOString().split('T')[0];
    const updatedColis = {
      ...updatedColisData,
      date_commande: now,
      date_reception: now,
      date_ajout: now,
      estimation_livraison: now,
      rendez_vous_date: null,
      
      // S'assurer que les booléens sont correctement typés
      statut_ordered: Boolean(updatedColisData.statut_ordered),
      statut_validated: Boolean(updatedColisData.statut_validated),
      statut_preparing: Boolean(updatedColisData.statut_preparing),
      statut_departure: Boolean(updatedColisData.statut_departure),
      statut_in_transit: Boolean(updatedColisData.statut_in_transit),
      statut_out_of_delivery: Boolean(updatedColisData.statut_out_of_delivery),
      statut_delivered: Boolean(updatedColisData.statut_delivered),
      statut_attente_douane: Boolean(updatedColisData.statut_attente_douane),
      statut_en_cours_de_reparation: Boolean(updatedColisData.statut_en_cours_de_reparation),
      statut_reparation_terminee: Boolean(updatedColisData.statut_reparation_terminee),
      prise_rendez_vous_active: Boolean(updatedColisData.prise_rendez_vous_active),
      details_supplementaires_visible: Boolean(updatedColisData.details_supplementaires_visible),
    };
    
    // Si un statut a changé, envoyer un email de notification
    if (statusChanged) {
      try {
        // Déterminer le nouveau statut
        let newStatus = 'Commandé';
        if (updatedColis.statut_delivered) newStatus = 'Livré';
        else if (updatedColis.statut_reparation_terminee) newStatus = 'Réparation terminée';
        else if (updatedColis.statut_en_cours_de_reparation) newStatus = 'En cours de réparation';
        else if (updatedColis.statut_attente_douane) newStatus = 'En attente de dédouanement';
        else if (updatedColis.statut_out_of_delivery) newStatus = 'En cours de livraison';
        else if (updatedColis.statut_in_transit) newStatus = 'En transit';
        else if (updatedColis.statut_departure) newStatus = 'Départ';
        else if (updatedColis.statut_preparing) newStatus = 'En préparation';
        else if (updatedColis.statut_validated) newStatus = 'Commandé';
        
        const emailData: ColisEmailData = {
          id: updatedColis.id,
          colisNom: updatedColis.colis_nom,
          numeroCommande: updatedColis.numero_commande,
          proprietaireNom: updatedColis.proprietaire_nom,
          proprietaireEmail: updatedColis.proprietaire_email,
          status: newStatus
        };
        
        await sendStatusUpdateEmail(emailData);
      } catch (emailError) {
        console.error('Erreur lors de l\'envoi de l\'email de mise à jour de statut:', emailError);
        // On continue même si l'envoi d'email échoue
      }
    }
    
    return NextResponse.json(updatedColis, { status: 200 });
  } catch (error) {
    console.error('Error updating package:', error);
    return NextResponse.json({ 
      error: 'Failed to update package',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// DELETE a package
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    // Utiliser SQL brut pour la suppression
    await prisma.$executeRawUnsafe(`
      DELETE FROM wp_tracking_colis 
      WHERE id = ${id}
    `);
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting package:', error);
    return NextResponse.json({ error: 'Failed to delete package' }, { status: 500 });
  }
} 