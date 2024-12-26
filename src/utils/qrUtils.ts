import QRCode from 'qrcode';
import type { SignatureData } from '../types';

export async function generateQRCodeImage(signatureData: SignatureData): Promise<string> {
  try {
    // Use window.location.origin to get the current domain
    const VERIFICATION_URL = `${window.location.origin}/verify`;
    const encodedData = encodeURIComponent(JSON.stringify(signatureData));
    const verificationUrl = `${VERIFICATION_URL}?data=${encodedData}`;
    
    return await QRCode.toDataURL(verificationUrl, {
      width: 100,
      margin: 0,
      errorCorrectionLevel: 'H',
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });
  } catch (err) {
    console.error('Error generating QR code:', err);
    throw err;
  }
}