import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Récupérer le nombre de consultations pour tous les colis
export async function GET() {
  try {
    // Requête pour compter les consultations par numéro de commande
    const consultations = await prisma.$queryRaw<Array<{numero_commande: string, consultation_count: BigInt}>>`
      SELECT numero_commande, COUNT(*) as consultation_count
      FROM consultation_history 
      GROUP BY numero_commande
    `;

    // Transformer BigInt en number pour la sérialisation JSON
    const consultationsFormatted = consultations.map(item => ({
      numero_commande: item.numero_commande,
      consultation_count: Number(item.consultation_count)
    }));

    return NextResponse.json(consultationsFormatted);
  } catch (error) {
    console.error('Erreur lors de la récupération des consultations:', error);
    // Retourner un tableau vide en cas d'erreur (table n'existe pas encore)
    return NextResponse.json([]);
  }
} 