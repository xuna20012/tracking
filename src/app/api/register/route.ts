import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Route désactivée - Blocage des inscriptions
  return NextResponse.json(
    { error: "Les inscriptions sont désactivées. Veuillez contacter l'administrateur pour obtenir un compte." },
    { status: 403 }
  );
} 