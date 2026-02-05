export interface ValentineSite {
  id: string;
  creatorName: string;
  partnerName: string;
  loveMessage: string;
  photoBase64?: string;
  photoCaption?: string;
  howWeMet?: string;
  favoriteMemory?: string;
  reasons?: string[];
  songUrl?: string;
  petName?: string;
  secretMessage?: string;
  viewCount: number;
  accepted: boolean;
}

export interface CreateSitePayload {
  creatorName: string;
  partnerName: string;
  loveMessage: string;
  photoBase64?: string;
  photoCaption?: string;
  howWeMet?: string;
  favoriteMemory?: string;
  reasons?: string[];
  songUrl?: string;
  petName?: string;
  secretMessage?: string;
}

export interface SiteCreatedResponse {
  id: string;
  url: string;
}

export interface EncryptedSitePayload {
  encrypted_data: string;
  iv: string;
}

export interface EncryptedSiteResponse {
  id: string;
  encrypted_data: string;
  iv: string;
  view_count: number;
  accepted: boolean;
}
