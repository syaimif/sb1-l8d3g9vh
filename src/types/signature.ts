export interface SignatureMetadata {
  officialName: string;
  position: string;
  timestamp: string;
}

export interface SignatureElements {
  qrCode: {
    dimension: number;
    x: number;
    y: number;
  };
  signature: {
    x: number;
    y: number;
    width: number;
  };
  details: {
    x: number;
    y: number;
  };
}