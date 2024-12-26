export interface SignaturePosition {
  x: number;
  y: number;
}

export interface SignatureData {
  position: SignaturePosition;
  signature: string;
  timestamp: string;
  documentHash: string;
}