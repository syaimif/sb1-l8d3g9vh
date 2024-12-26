import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { PenTool } from 'lucide-react';
import type { SignaturePosition } from '../types';

interface SignatureCanvasProps {
  onPositionChange: (position: SignaturePosition) => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

export const SignatureCanvas: React.FC<SignatureCanvasProps> = ({
  onPositionChange,
  containerRef,
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable
      nodeRef={nodeRef}
      bounds="parent"
      onStop={(e, data) => {
        onPositionChange({ x: data.x, y: data.y });
      }}
    >
      <div 
        ref={nodeRef}
        className="absolute cursor-move bg-blue-100 p-2 rounded border border-blue-300"
      >
        <div className="flex items-center gap-2">
          <PenTool className="h-4 w-4 text-blue-500" />
          <span className="text-sm text-blue-700">Digital Signature</span>
        </div>
      </div>
    </Draggable>
  );
};