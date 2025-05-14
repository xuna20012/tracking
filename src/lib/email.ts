import nodemailer from 'nodemailer';

// Configuration du transporteur SMTP
export const transporter = nodemailer.createTransport({
  host: 'mail84.lwspanel.com', // Utiliser le serveur SMTP direct de LWS
  port: 465,
  secure: true, // true pour SSL
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASSWORD || '',
  },
  tls: {
    rejectUnauthorized: false, // Ne pas échouer sur les certificats invalides
  }
});

// Interface pour les données du colis
export interface ColisEmailData {
  id: number;
  colisNom: string;
  numeroCommande: string;
  proprietaireNom: string;
  proprietaireEmail: string;
  status: string;
  estimationLivraison?: string;
}

// Fonction pour envoyer un email de création de colis
export async function sendNewPackageEmail(colisData: ColisEmailData): Promise<boolean> {
  try {
    const { proprietaireNom, proprietaireEmail, colisNom, numeroCommande, estimationLivraison } = colisData;
    
    // Utiliser la même adresse que celle configurée dans le transporteur
    const smtpUser = process.env.SMTP_USER || 'noreply@ohpieces.com';
    
    const mailOptions = {
      from: `"Oh Pieces Logistique" <${smtpUser}>`,
      to: proprietaireEmail,
      subject: `Votre colis ${numeroCommande} a été enregistré`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #254e9d; margin-bottom: 5px;">Oh Pieces Logistique</h1>
            <p style="color: #666; font-size: 14px;">Suivi de votre colis</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h4 style="color: #333; margin-top: 0;">Bonjour ${proprietaireNom},</h4>
            <p>Nous vous confirmons l'enregistrement de votre colis :</p>
            <ul style="list-style-type: none; padding-left: 0;">
              <li><strong>Numéro de suivi :</strong> ${numeroCommande}</li>
              <li><strong>Description :</strong> ${colisNom}</li>
              ${estimationLivraison ? `<li><strong>Livraison estimée :</strong> ${estimationLivraison}</li>` : ''}
            </ul>
          </div>
          
          <div style="margin-bottom: 20px;">
            <p>Vous pouvez suivre votre colis à tout moment en cliquant sur le bouton ci-dessous :</p>
            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://ohpieces.com'}/track/${numeroCommande}" style="display: inline-block; background-color: #254e9d; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Suivre mon colis</a>
            </div>
          </div>
          
          <div style="font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
            <p>Ce message a été envoyé automatiquement, merci de ne pas y répondre.</p>
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
    };
    
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de création de colis:', error);
    return false;
  }
}

// Fonction pour envoyer un email de mise à jour de statut
export async function sendStatusUpdateEmail(colisData: ColisEmailData): Promise<boolean> {
  try {
    const { proprietaireNom, proprietaireEmail, colisNom, numeroCommande, status } = colisData;
    
    // Utiliser la même adresse que celle configurée dans le transporteur
    const smtpUser = process.env.SMTP_USER || 'noreply@ohpieces.com';
    
    // Personnalisation du message en fonction du statut
    let statusMessage = '';
    let statusColor = '';
    
    switch (status) {
      case 'Livré':
        statusMessage = 'Votre colis a été livré avec succès.';
        statusColor = '#22c55e'; // vert
        break;
      case 'En cours de livraison':
        statusMessage = 'Votre colis est en cours de livraison.';
        statusColor = '#254e9d'; // bleu
        break;
      case 'En préparation':
        statusMessage = 'Votre colis est en cours de préparation.';
        statusColor = '#fd7e14'; // orange
        break;
      case 'En attente de dédouanement':
        statusMessage = 'Votre colis est en attente de dédouanement.';
        statusColor = '#9333ea'; // violet
        break;
      case 'En cours de réparation':
        statusMessage = 'Votre colis est en cours de réparation.';
        statusColor = '#f97316'; // orange foncé
        break;
      case 'Réparation terminée':
        statusMessage = 'La réparation de votre colis est terminée.';
        statusColor = '#14b8a6'; // teal
        break;
      default:
        statusMessage = `Le statut de votre colis a été mis à jour: ${status}`;
        statusColor = '#6b7280'; // gris
    }
    
    const mailOptions = {
      from: `"Oh Pieces Logistique" <${smtpUser}>`,
      to: proprietaireEmail,
      subject: `Mise à jour de votre colis ${numeroCommande} - ${status}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #254e9d; margin-bottom: 5px;">Oh Pieces Logistique</h1>
            <p style="color: #666; font-size: 14px;">Mise à jour de votre colis</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h4 style="color: #333; margin-top: 0;">Bonjour ${proprietaireNom},</h4>
            <p>Le statut de votre colis a été mis à jour :</p>
            <ul style="list-style-type: none; padding-left: 0;">
              <li><strong>Numéro de suivi :</strong> ${numeroCommande}</li>
              <li><strong>Description :</strong> ${colisNom}</li>
              <li><strong>Nouveau statut :</strong> <span style="color: ${statusColor}; font-weight: bold;">${status}</span></li>
            </ul>
            <p>${statusMessage}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <p>Pour plus de détails, vous pouvez suivre votre colis en cliquant sur le bouton ci-dessous :</p>
            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://ohpieces.com'}/track/${numeroCommande}" style="display: inline-block; background-color: #254e9d; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Suivre mon colis</a>
            </div>
          </div>
          
          <div style="font-size: 12px; color: #666; text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
            <p>Ce message a été envoyé automatiquement, merci de ne pas y répondre.</p>
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
    };
    
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de mise à jour de statut:', error);
    return false;
  }
} 