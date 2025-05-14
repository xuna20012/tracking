import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";

// Corriger la signature de la fonction GET
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id;
    
    // Vérifier si l'ID est valide
    if (!id) {
      return NextResponse.json({ error: 'ID utilisateur requis' }, { status: 400 });
    }
    
    // Récupérer l'utilisateur par ID
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }
    
    // Ne pas renvoyer le mot de passe
    const { password, ...userWithoutPassword } = user;
    
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// Mettre à jour un utilisateur
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    
    // Vérifier si l'utilisateur est connecté et est un administrateur
    if (!session?.user || (session.user as any).role !== "admin") {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 403 }
      );
    }

    const id = parseInt(context.params.id);
    const { email, password, nom, prenom, role, actif } = await req.json();

    // Vérifier si l'utilisateur existe
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Préparer les données à mettre à jour
    const updateData: any = {};
    
    if (email !== undefined) updateData.email = email;
    if (nom !== undefined) updateData.nom = nom;
    if (prenom !== undefined) updateData.prenom = prenom;
    if (role !== undefined) updateData.role = role;
    if (actif !== undefined) updateData.actif = actif;
    
    // Si un nouveau mot de passe est fourni, le hacher
    if (password) {
      updateData.password = await hash(password, 12);
    }

    // Mettre à jour l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        nom: true,
        prenom: true,
        role: true,
        dateCreation: true,
        derniereConnexion: true,
        actif: true
      }
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de l'utilisateur" },
      { status: 500 }
    );
  }
}

// Supprimer un utilisateur
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    
    // Vérifier si l'utilisateur est connecté et est un administrateur
    if (!session?.user || (session.user as any).role !== "admin") {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 403 }
      );
    }

    const id = parseInt(context.params.id);

    // Vérifier si l'utilisateur existe
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Supprimer l'utilisateur
    await prisma.user.delete({
      where: { id }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'utilisateur" },
      { status: 500 }
    );
  }
} 