import React from 'react';
import { FileSignature, Loader2 } from 'lucide-react';

interface SignButtonProps {
  onSign: () => void;
  disabled?: boolean;
  isProcessing?: boolean;
}

export const SignButton: React.FC<SignButtonProps> = ({ 
  onSign, 
  disabled,
  isProcessing 
}) => {
  return (
    <button
      onClick={onSign}
      disabled={disabled}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isProcessing ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <FileSignature className="h-5 w-5" />
      )}
      <span>{isProcessing ? 'Processing...' : 'Sign Document'}</span>
    </button>
  );
};