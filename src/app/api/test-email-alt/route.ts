import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET(req: NextRequest) {
  try {
    // Récupérer l'adresse email de destination depuis les paramètres de requête
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json({ 
        error: 'Email parameter is required' 
      }, { status: 400 });
    }
    
    // Créer un transporteur alternatif avec le port 587
    const altTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'mail.ohpieces.com',
      port: 587, // Utiliser le port 587 (TLS) au lieu de 465 (SSL)
      secure: false, // false pour TLS - le serveur mettra à niveau la connexion
      auth: {
        user: process.env.SMTP_USER || 'noreply@ohpieces.com',
        pass: process.env.SMTP_PASSWORD || 'P@sser1234',
      },
      debug: true,
      logger: true,
      tls: {
        rejectUnauthorized: false,
      }
    });
    
    // Afficher les informations de configuration
    console.log('Configuration SMTP:', {
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      user: process.env.SMTP_USER,
      tls: { rejectUnauthorized: false }
    });
    
    // Envoyer un email de test
    const result = await altTransporter.sendMail({
      from: `"Oh Pieces Logistique" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Test de configuration SMTP (Alternative)',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #254e9d; margin-bottom: 5px;">Oh Pieces Logistique</h1>
            <p style="color: #666; font-size: 14px;">Test de configuration SMTP (Alternative)</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h2 style="color: #333; margin-top: 0;">Configuration réussie !</h2>
            <p>Si vous recevez cet email, cela signifie que la configuration SMTP alternative de votre application est correcte.</p>
            <p>Paramètres utilisés :</p>
            <ul>
              <li>Hôte SMTP : ${process.env.SMTP_HOST}</li>
              <li>Port : 587 (TLS)</li>
              <li>Sécurisé : false</li>
              <li>Utilisateur : ${process.env.SMTP_USER}</li>
            </ul>
          </div>
          
          <div style="font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
            <p>Ce message a été envoyé automatiquement à des fins de test.</p>
            <p>&copy; ${new Date().getFullYear()} Oh Pieces Logistique. Tous droits réservés.</p>
          </div>
        </div>
      `
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Email de test envoyé avec succès (configuration alternative)',
      details: result
    });
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de test (alternative):', error);
    
    return NextResponse.json({ 
      success: false, 
      error: 'Échec de l\'envoi de l\'email de test (configuration alternative)',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
} 