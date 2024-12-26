import React from 'react';
import { PenTool } from 'lucide-react';
import type { SignaturePosition } from '../types';

interface SignatureMarkerProps {
  position: SignaturePosition;
}

export const SignatureMarker: React.FC<SignatureMarkerProps> = ({ position }) => {
  return (
    <div 
      className="absolute cursor-default bg-blue-100 p-2 rounded border border-blue-300"
      style={{ 
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className="flex items-center gap-2">
        <PenTool className="h-4 w-4 text-blue-500" />
        <span className="text-sm text-blue-700">Digital Signature</span>
      </div>
    </div>
  );
};