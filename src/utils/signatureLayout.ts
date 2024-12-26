import type { SignatureElements } from '../types/signature';

export function calculateSignatureLayout(
  pdfX: number,
  pdfY: number,
  qrDimension: number
): SignatureElements {
  return {
    qrCode: {
      dimension: qrDimension,
      x: pdfX - qrDimension / 2,
      y: pdfY - qrDimension / 2,
    },
    signature: {
      x: pdfX - 100,
      y: pdfY - qrDimension - 15,
      width: 200,
    },
    details: {
      x: pdfX - 100,
      y: pdfY - qrDimension - 60,
    },
  };
}