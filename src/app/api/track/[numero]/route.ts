import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // Extraire le numéro de l'URL
    const pathname = req.nextUrl.pathname;
    const numeroMatch = pathname.match(/\/api\/track\/([^\/]+)/);
    if (!numeroMatch) {
      return NextResponse.json(
        { error: "Numéro de commande non valide" },
        { status: 400 }
      );
    }
    
    const numero = numeroMatch[1];
    
    // Utiliser une requête SQL brute pour éviter les problèmes avec les dates invalides
    const colis = await prisma.$queryRawUnsafe(`
      SELECT 
        id, 
        colis_nom, 
        description, 
        numero_commande, 
        date_format(date_commande, '%Y-%m-%d %H:%i:%s') as date_commande, 
        date_format(date_reception, '%Y-%m-%d %H:%i:%s') as date_reception, 
        date_format(estimation_livraison, '%Y-%m-%d %H:%i:%s') as estimation_livraison,
        proprietaire_nom, 
        proprietaire_email, 
        proprietaire_telephone,
        statut_validated, 
        statut_preparing, 
        statut_departure, 
        statut_attente_douane, 
        statut_delivered, 
        statut_en_cours_de_reparation, 
        statut_reparation_terminee,
        description_validated,
        description_preparing,
        description_departure,
        description_attente_douane,
        description_delivered,
        description_en_cours_de_reparation,
        description_reparation_terminee,
        prise_rendez_vous_active,
        date_format(rendez_vous_date, '%Y-%m-%d %H:%i:%s') as rendez_vous_date,
        rendez_vous_statut,
        details_supplementaires_visible,
        details_supplementaires,
        etapes_suivi
      FROM wp_tracking_colis 
      WHERE numero_commande = ?
      LIMIT 1
    `, numero);
    
    if (!colis || (Array.isArray(colis) && colis.length === 0)) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }
    
    // Si le résultat est un tableau, prendre le premier élément
    const colisData = Array.isArray(colis) ? colis[0] : colis;
    
    // Convertir les valeurs booléennes (qui peuvent être 0/1 dans MySQL)
    const formattedColis = {
      ...colisData,
      statut_validated: Boolean(colisData.statut_validated),
      statut_preparing: Boolean(colisData.statut_preparing),
      statut_departure: Boolean(colisData.statut_departure),
      statut_attente_douane: Boolean(colisData.statut_attente_douane),
      statut_delivered: Boolean(colisData.statut_delivered),
      statut_en_cours_de_reparation: Boolean(colisData.statut_en_cours_de_reparation),
      statut_reparation_terminee: Boolean(colisData.statut_reparation_terminee),
      prise_rendez_vous_active: Boolean(colisData.prise_rendez_vous_active),
      details_supplementaires_visible: Boolean(colisData.details_supplementaires_visible),
    };
    
    return NextResponse.json(formattedColis, { status: 200 });
  } catch (error) {
    console.error('Error tracking package:', error);
    return NextResponse.json({ error: 'Failed to track package' }, { status: 500 });
  }
} 