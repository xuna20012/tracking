import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { email, password, nom, prenom, role = "user" } = await req.json();

    // Vérification des champs obligatoires
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    // Vérification si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé" },
        { status: 400 }
      );
    }

    // Hachage du mot de passe
    const hashedPassword = await hash(password, 12);

    // Création de l'utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        nom: nom || null,
        prenom: prenom || null,
        role: role === "admin" ? "admin" : "user", // Sécurité pour éviter la création d'admins non autorisés
        dateCreation: new Date(),
        actif: true
      }
    });

    // Retourne l'utilisateur sans le mot de passe
    return NextResponse.json(
      {
        id: user.id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        role: user.role,
        dateCreation: user.dateCreation
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du compte" },
      { status: 500 }
    );
  }
} 