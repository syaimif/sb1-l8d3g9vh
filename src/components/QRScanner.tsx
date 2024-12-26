import React, { useRef, useEffect } from 'react';
import { Camera } from 'lucide-react';
import QrScanner from 'qr-scanner';

interface QRScannerProps {
  onScan: (result: string) => void;
  onClose: () => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onScan, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      scannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          onScan(result.data);
          onClose();
        },
        { highlightScanRegion: true }
      );
      
      scannerRef.current.start();
    }

    return () => {
      scannerRef.current?.destroy();
    };
  }, [onScan, onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-4 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Scan QR Code</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        <video ref={videoRef} className="w-full aspect-square object-cover rounded" />
      </div>
    </div>
  );
};