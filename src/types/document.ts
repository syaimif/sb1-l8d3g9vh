export interface DocumentDetails {
  officialName: string;
  position: string;
  documentDate: string;
  documentNumber: string;
}

export interface DocumentFormData extends DocumentDetails {
  file: File | null;
}