import { NextRequest, NextResponse } from 'next/server';
import { transporter } from '@/lib/email';

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
    
    // Utiliser la même adresse que celle configurée dans le transporteur
    const smtpUser = process.env.SMTP_USER || '';
    
    // Envoyer un email de test
    const result = await transporter.sendMail({
      from: `"Oh Pieces Logistique" <${smtpUser}>`,
      to: email,
      subject: 'Test de configuration SMTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #254e9d; margin-bottom: 5px;">Oh Pieces Logistique</h1>
            <p style="color: #666; font-size: 14px;">Test de configuration SMTP</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h4 style="color: #333; margin-top: 0;">Configuration réussie !</h4>
            <p>Si vous recevez cet email, cela signifie que la configuration SMTP de votre application est correcte.</p>
            <p>Paramètres utilisés :</p>
            <ul>
              <li>Hôte SMTP : ${process.env.SMTP_HOST}</li>
              <li>Port : ${process.env.SMTP_PORT}</li>
              <li>Sécurisé : ${process.env.SMTP_SECURE}</li>
              <li>Utilisateur : ${process.env.SMTP_USER}</li>
            </ul>
          </div>
          
          <div style="font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
            <p>Ce message a été envoyé automatiquement à des fins de test.</p>
            <p>&copy; ${new Date().getFullYear()} Oh Pieces Logistique. Tous droits réservés.</p>
          </div>
          
          <div style="margin-top: 20px; text-align: center; border-top: 1px solid #e0e0e0; padding-top: 20px;">
            <img src="${process.env.NEXT_PUBLIC_APP_URL || 'https://ohpieces.com'}/images/ohpieces.png" alt="Oh Pieces Logistique" style="max-width: 150px; height: auto; margin-bottom: 10px;">
            <div style="font-size: 12px; color: #666;">
              <p style="margin: 5px 0;"><a href="mailto:contact@ohpieces.com" style="color: #254e9d; text-decoration: none;">contact@ohpieces.com</a></p>
              <p style="margin: 5px 0;"><a href="tel:+221768669898" style="color: #254e9d; text-decoration: none;">+221 76 866 98 98</a></p>
              <p style="margin: 5px 0;"><a href="https://www.ohpieces.com" style="color: #254e9d; text-decoration: none;">www.ohpieces.com</a></p>
            </div>
          </div>
        </div>
      `
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Email de test envoyé avec succès',
      details: result
    });
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de test:', error);
    
    return NextResponse.json({ 
      success: false, 
      error: 'Échec de l\'envoi de l\'email de test',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
} 