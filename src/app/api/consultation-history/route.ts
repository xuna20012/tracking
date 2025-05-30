import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Récupérer l'historique des consultations pour un colis
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const numeroCommande = searchParams.get('numero_commande');

    if (!numeroCommande) {
      return NextResponse.json(
        { error: 'Le numéro de commande est requis' },
        { status: 400 }
      );
    }

    const consultations = await prisma.consultationHistory.findMany({
      where: {
        numero_commande: numeroCommande
      },
      orderBy: {
        consultation_date: 'desc'
      }
    });

    return NextResponse.json(consultations);
  } catch (error) {
    console.error('Erreur lors de la récupération des consultations:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

// POST: Enregistrer une nouvelle consultation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { numero_commande, client_email, client_nom } = body;

    if (!numero_commande) {
      return NextResponse.json(
        { error: 'Le numéro de commande est requis' },
        { status: 400 }
      );
    }

    // Récupérer l'IP et l'User-Agent depuis les headers
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwarded ? forwarded.split(/, /)[0] : realIp || 'unknown';
    const userAgent = request.headers.get('user-agent');

    // Vérifier s'il y a déjà eu une consultation récente (dans les 5 dernières minutes)
    // depuis la même IP pour le même numéro de commande
    try {
      const recentConsultations = await prisma.$queryRaw<Array<{id: number}>>`
        SELECT id FROM consultation_history 
        WHERE numero_commande = ${numero_commande} 
        AND ip_address = ${ip}
        AND consultation_date > DATE_SUB(NOW(), INTERVAL 5 MINUTE)
        LIMIT 1
      `;

      // Si une consultation récente existe, ne pas en créer une nouvelle
      if (recentConsultations.length > 0) {
        return NextResponse.json({ 
          message: 'Consultation déjà enregistrée récemment',
          skipped: true 
        }, { status: 200 });
      }
    } catch (queryError) {
      // Si la table n'existe pas encore, continuer normalement
      console.warn('Erreur lors de la vérification des consultations récentes:', queryError);
    }

    const consultation = await prisma.$queryRaw`
      INSERT INTO consultation_history 
      (numero_commande, ip_address, user_agent, client_email, client_nom, consultation_date)
      VALUES (${numero_commande}, ${ip}, ${userAgent || 'unknown'}, ${client_email}, ${client_nom}, NOW())
    `;

    return NextResponse.json({ 
      message: 'Consultation enregistrée avec succès',
      consultation 
    }, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la consultation:', error);
    
    // Si la table n'existe pas encore, retourner une réponse de succès pour ne pas bloquer l'UX
    if (error instanceof Error && error.message.includes('Table') && error.message.includes('doesn\'t exist')) {
      return NextResponse.json({ 
        message: 'Table de consultations non encore créée',
        skipped: true 
      }, { status: 200 });
    }
    
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
} 