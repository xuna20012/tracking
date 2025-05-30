import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Récupérer toutes les consultations pour l'administration
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '1000');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Récupérer les consultations avec tri par date décroissante
    const consultations = await prisma.$queryRaw<Array<{
      id: number;
      numero_commande: string;
      ip_address: string | null;
      user_agent: string | null;
      consultation_date: string;
      client_email: string | null;
      client_nom: string | null;
    }>>`
      SELECT 
        id,
        numero_commande,
        ip_address,
        user_agent,
        consultation_date,
        client_email,
        client_nom
      FROM consultation_history 
      ORDER BY consultation_date DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    // Compter le total des consultations
    const totalResult = await prisma.$queryRaw<Array<{count: BigInt}>>`
      SELECT COUNT(*) as count FROM consultation_history
    `;
    
    const total = Number(totalResult[0]?.count || 0);

    return NextResponse.json({
      consultations,
      total,
      limit,
      offset
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des consultations admin:', error);
    
    // Si la table n'existe pas encore, retourner des données vides
    if (error instanceof Error && error.message.includes('Table') && error.message.includes('doesn\'t exist')) {
      return NextResponse.json({
        consultations: [],
        total: 0,
        limit: 0,
        offset: 0
      });
    }
    
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
} 