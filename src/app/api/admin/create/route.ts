import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";

// Cette route ne devrait être utilisée qu'une seule fois pour créer un admin initial
// Dans un environnement de production, elle devrait être sécurisée ou désactivée après utilisation

export async function POST(req: NextRequest) {
  try {
    const { email, password, nom, prenom } = await req.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    // Vérifier si des utilisateurs existent déjà
    const userCount = await prisma.user.count();
    
    // Si des utilisateurs existent déjà, bloquer la création d'un admin par cette route
    if (userCount > 0) {
      return NextResponse.json(
        { error: "Des utilisateurs existent déjà. Cette route ne peut être utilisée qu'une seule fois." },
        { status: 403 }
      );
    }

    const hashedPassword = await hash(password, 12);
    
    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        nom: nom || null,
        prenom: prenom || null,
        role: "admin",
        dateCreation: new Date(),
        actif: true
      }
    });

    return NextResponse.json(
      {
        id: admin.id,
        email: admin.email,
        nom: admin.nom,
        prenom: admin.prenom,
        role: admin.role,
        message: "Administrateur créé avec succès"
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création de l'administrateur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de l'administrateur" },
      { status: 500 }
    );
  }
} 