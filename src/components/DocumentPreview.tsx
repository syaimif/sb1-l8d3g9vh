import React, { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import type { SignaturePosition } from '../types';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface DocumentPreviewProps {
  file: File;
  onSignaturePosition: (position: SignaturePosition) => void;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  file,
  onSignaturePosition,
}) => {
  const [numPages, setNumPages] = useState<number>(1);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    onSignaturePosition({ x, y });
  }, [onSignaturePosition]);

  return (
    <div 
      ref={containerRef} 
      className="relative border rounded-lg overflow-hidden"
      onDoubleClick={handleDoubleClick}
    >
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {Array.from(new Array(numPages), (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        ))}
      </Document>
    </div>
  );
};