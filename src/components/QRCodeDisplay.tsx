import React from 'react';
import QRCode from 'qrcode.react';
import type { SignatureData } from '../types';

interface QRCodeDisplayProps {
  signatureData: SignatureData;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ signatureData }) => {
  // Use window.location.origin to get the current domain
  const VERIFICATION_URL = `${window.location.origin}/verify`;
  const encodedData = encodeURIComponent(JSON.stringify(signatureData));
  const verificationUrl = `${VERIFICATION_URL}?data=${encodedData}`;

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Digital Signature QR Code</h3>
      <QRCode value={verificationUrl} size={200} level="H" />
      <p className="mt-4 text-sm text-gray-600">
        Scan this QR code with your mobile device to verify the document's signature
      </p>
    </div>
  );
}