import { createHash, createHmac } from 'crypto';
import axios from 'axios';

interface SMSResponse {
  code: number;
  body: any;
}

/**
 * Configuration pour l'API Orange SMS Pro
 */
const SMS_CONFIG = {
  login: "kiwimg1",
  apiKey: "093f2c9599f78688da440f191317ae6b",
  token: "3fae77a29d0bd1991d979d38f6b234fb",
  subject: "TRACKING",
  signature: "OH GARAGE", // Signature du SMS (apparaît comme expéditeur)
  baseUrl: "https://api.orangesmspro.sn:8443/api"
};

/**
 * Envoie un SMS via l'API Orange SMS Pro
 */
export async function sendSMS(recipient: string, content: string): Promise<SMSResponse> {
  try {
    // Formatage du numéro de téléphone (ajouter le préfixe 221 si nécessaire)
    recipient = formatPhoneNumber(recipient);
    
    // Préparation des paramètres
    const timestamp = Math.floor(Date.now() / 1000); // Timestamp en secondes
    const msgToEncrypt = SMS_CONFIG.token + SMS_CONFIG.subject + SMS_CONFIG.signature + recipient + content + timestamp;
    const key = createHmac('sha1', SMS_CONFIG.apiKey).update(msgToEncrypt).digest('hex');

    // Construction des paramètres de requête
    const params = {
      token: SMS_CONFIG.token,
      subject: SMS_CONFIG.subject,
      signature: SMS_CONFIG.signature,
      recipient: recipient,
      content: content,
      timestamp: timestamp,
      key: key
    };

    // Créer l'URL avec les paramètres
    const url = `${SMS_CONFIG.baseUrl}?${new URLSearchParams(params as any).toString()}`;

    // Envoyer la requête avec axios
    const response = await axios.get(url, {
      auth: {
        username: SMS_CONFIG.login,
        password: SMS_CONFIG.token
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      validateStatus: () => true, // Accepter tous les codes de statut pour pouvoir les gérer nous-mêmes
    });

    console.log(`SMS envoyé à ${recipient}: Statut ${response.status}`);
    
    return {
      code: response.status,
      body: response.data
    };
  } catch (error) {
    console.error('Erreur lors de l\'envoi du SMS:', error);
    return {
      code: 500,
      body: { error: (error as Error).message }
    };
  }
}

/**
 * Formate un numéro de téléphone en ajoutant le préfixe sénégalais si nécessaire
 */
function formatPhoneNumber(phone: string): string {
  // Supprimer tous les espaces, tirets, etc.
  phone = phone.replace(/[^0-9]/g, '');
  
  // Si le numéro ne commence pas par 221 (préfixe Sénégal), l'ajouter
  if (!phone.startsWith('221')) {
    // Si le numéro commence par un 0, le remplacer par 221
    if (phone.startsWith('0')) {
      phone = '221' + phone.substring(1);
    } else {
      phone = '221' + phone;
    }
  }
  
  return phone;
}

/**
 * Envoie une notification SMS de changement de statut
 */
export async function sendStatusSMS(phoneNumber: string, customerName: string, trackingNumber: string, status: string): Promise<SMSResponse> {
  const message = `Cher client, votre colis avec le numéro de tracking: ${trackingNumber} est maintenant ${status}. Suivez les details du tracking sur notre plateforme: logistique.ohgarage.com`;
  
  return sendSMS(phoneNumber, message);
} 