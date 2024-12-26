import React, { useState, useCallback } from 'react';
import { FileUpload } from '../components/FileUpload';
import { DocumentPreview } from '../components/DocumentPreview';
import { QRCodeDisplay } from '../components/QRCodeDisplay';
import { SignButton } from '../components/SignButton';
import { SignatureMarker } from '../components/SignatureMarker';
import { DocumentDetailsForm } from '../components/forms/DocumentDetailsForm';
import { generateKeyPair, signDocument } from '../utils/pki';
import { createSignedPDF } from '../utils/pdfUtils';
import { downloadFile } from '../utils/downloadUtils';
import type { SignaturePosition, SignatureData } from '../types';
import type { DocumentFormData, DocumentDetails } from '../types/document';

export const SignDocument: React.FC = () => {
  const [formData, setFormData] = useState<DocumentFormData>({
    officialName: '',
    position: '',
    documentDate: '',
    documentNumber: '',
    file: null,
  });
  const [signaturePosition, setSignaturePosition] = useState<SignaturePosition | null>(null);
  const [signatureData, setSignatureData] = useState<SignatureData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDetailsChange = (details: DocumentDetails) => {
    setFormData(prev => ({ ...prev, ...details }));
  };

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFormData(prev => ({ ...prev, file: selectedFile }));
    setSignaturePosition(null);
    setSignatureData(null);
  }, []);

  const handleSignaturePosition = useCallback((position: SignaturePosition) => {
    setSignaturePosition(position);
  }, []);

  const handleSign = useCallback(async () => {
    if (!formData.file || !signaturePosition) return;
    
    setIsProcessing(true);
    try {
      const { privateKey, publicKey } = generateKeyPair();
      const fileContent = await formData.file.arrayBuffer();
      const signature = signDocument(
        new Uint8Array(fileContent).toString(),
        privateKey
      );

      const newSignatureData = {
        position: signaturePosition,
        signature,
        timestamp: new Date().toISOString(),
        documentHash: await crypto.subtle.digest('SHA-256', fileContent).then(
          hash => Array.from(new Uint8Array(hash))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('')
        ),
        ...formData
      };

      setSignatureData(newSignatureData);

      const signedPDF = await createSignedPDF(
        fileContent,
        signaturePosition,
        newSignatureData
      );

      const originalName = formData.file.name;
      const signedFileName = originalName.replace('.pdf', '_signed.pdf');
      downloadFile(signedPDF, signedFileName);
    } catch (error) {
      console.error('Error signing document:', error);
      alert('An error occurred while signing the document');
    } finally {
      setIsProcessing(false);
    }
  }, [formData, signaturePosition]);

  const isDetailsComplete = formData.officialName && 
    formData.position && 
    formData.documentDate && 
    formData.documentNumber;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Digital Document Signing</h1>
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-6">Document Details</h2>
          <DocumentDetailsForm
            details={formData}
            onChange={handleDetailsChange}
          />
        </div>

        {isDetailsComplete && !formData.file && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Upload Document</h2>
            <FileUpload onFileSelect={handleFileSelect} />
          </div>
        )}
        
        {formData.file && !signatureData && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
              Double-click to place your signature
            </h2>
            <div className="relative">
              <DocumentPreview
                file={formData.file}
                onSignaturePosition={handleSignaturePosition}
              />
              {signaturePosition && (
                <SignatureMarker position={signaturePosition} />
              )}
            </div>
            <div className="mt-4 flex justify-end">
              <SignButton
                onSign={handleSign}
                disabled={!signaturePosition || isProcessing}
                isProcessing={isProcessing}
              />
            </div>
          </div>
        )}
        
        {signatureData && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
              Document Signed Successfully
            </h2>
            <p className="text-gray-600 mb-4">
              The signed PDF has been downloaded with the QR code embedded at the selected location.
            </p>
            <QRCodeDisplay signatureData={signatureData} />
          </div>
        )}
      </div>
    </div>
  );
};