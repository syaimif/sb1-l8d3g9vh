import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, User, Briefcase, Calendar } from 'lucide-react';
import type { SignatureData } from '../types';

export const VerifySignature: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [signatureData, setSignatureData] = useState<SignatureData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const data = searchParams.get('data');
    if (data) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(data));
        setSignatureData(decodedData);
      } catch (err) {
        setError('Invalid signature data');
        console.error('Error parsing signature data:', err);
      }
    }
  }, [searchParams]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm text-center">
          <div className="text-red-500 mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-red-700 mb-4">
            Verification Failed
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!signatureData) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm text-center">
          <div className="animate-spin text-blue-500 mb-4">⌛</div>
          <p className="text-gray-600">Verifying signature...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm">
        <div className="text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-green-700 mb-6">
            Document Successfully Verified
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Signed by</p>
              <p className="font-medium">{signatureData.officialName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Briefcase className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Position</p>
              <p className="font-medium">{signatureData.position}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Signature Date</p>
              <p className="font-medium">{formatDate(signatureData.timestamp)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};