import { PDFDocument, rgb, StandardFonts, PDFPage } from 'pdf-lib';
import type { SignaturePosition, SignatureData } from '../types';
import type { SignatureMetadata } from '../types/signature';
import { generateQRCodeImage } from './qrUtils';
import { calculateSignatureLayout } from './signatureLayout';

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

async function addSignatureDetails(
  page: PDFPage,
  metadata: SignatureMetadata,
  layout: SignatureElements
) {
  const font = await page.doc.embedFont(StandardFonts.Helvetica);
  const boldFont = await page.doc.embedFont(StandardFonts.HelveticaBold);

  // Add signature line
  page.drawLine({
    start: { x: layout.signature.x, y: layout.signature.y },
    end: { x: layout.signature.x + layout.signature.width, y: layout.signature.y },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  // Add signer details
  const detailsY = layout.details.y;
  const lineHeight = 15;

  page.drawText(metadata.officialName, {
    x: layout.details.x,
    y: detailsY,
    size: 11,
    font: boldFont,
  });

  page.drawText(metadata.position, {
    x: layout.details.x,
    y: detailsY - lineHeight,
    size: 10,
    font: font,
    color: rgb(0.3, 0.3, 0.3),
  });

  page.drawText(`Signed: ${formatDate(metadata.timestamp)}`, {
    x: layout.details.x,
    y: detailsY - lineHeight * 2,
    size: 9,
    font: font,
    color: rgb(0.4, 0.4, 0.4),
  });
}

export async function createSignedPDF(
  originalPDF: ArrayBuffer,
  signaturePosition: SignaturePosition,
  signatureData: SignatureData
): Promise<Uint8Array> {
  try {
    const pdfDoc = await PDFDocument.load(originalPDF);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();

    // Convert relative coordinates to PDF coordinates
    const pdfX = (signaturePosition.x / width) * width;
    const pdfY = height - (signaturePosition.y / height) * height;

    // Calculate layout
    const layout = calculateSignatureLayout(pdfX, pdfY, 50);

    // Generate and embed QR code
    const qrCodeImage = await generateQRCodeImage(signatureData);
    const qrImageBytes = await fetch(qrCodeImage).then(res => res.arrayBuffer());
    const qrImage = await pdfDoc.embedPng(qrImageBytes);

    // Add QR code
    firstPage.drawImage(qrImage, {
      x: layout.qrCode.x,
      y: layout.qrCode.y,
      width: layout.qrCode.dimension,
      height: layout.qrCode.dimension,
    });

    // Add signature details
    await addSignatureDetails(firstPage, {
      officialName: signatureData.officialName,
      position: signatureData.position,
      timestamp: signatureData.timestamp,
    }, layout);

    return await pdfDoc.save();
  } catch (error) {
    console.error('Error creating signed PDF:', error);
    throw new Error('Failed to create signed PDF');
  }
}