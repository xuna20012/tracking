import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";

// Récupérer tous les utilisateurs (admin uniquement)
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    
    // Vérifier si l'utilisateur est connecté et est un administrateur
    if (!session?.user || (session.user as any).role !== "admin") {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 403 }
      );
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        nom: true,
        prenom: true,
        role: true,
        dateCreation: true,
        derniereConnexion: true,
        actif: true
      },
      orderBy: {
        dateCreation: 'desc'
      }
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des utilisateurs" },
      { status: 500 }
    );
  }
}

// Créer un nouvel utilisateur (admin uniquement)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    
    // Vérifier si l'utilisateur est connecté et est un administrateur
    if (!session?.user || (session.user as any).role !== "admin") {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 403 }
      );
    }

    const { email, password, nom, prenom, role, actif } = await req.json();

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé" },
        { status: 400 }
      );
    }

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        password, // Le mot de passe devrait être déjà haché par le front-end
        nom: nom || null,
        prenom: prenom || null,
        role: role || "user",
        actif: actif !== undefined ? actif : true,
        dateCreation: new Date()
      }
    });

    return NextResponse.json(
      {
        id: user.id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        role: user.role,
        actif: user.actif,
        dateCreation: user.dateCreation
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de l'utilisateur" },
      { status: 500 }
    );
  }
} 