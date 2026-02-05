import type { ValentineSite, CreateSitePayload, SiteCreatedResponse, EncryptedSiteResponse } from '../types/valentine';
import { generateKey, exportKeyToBase64Url, importKeyFromBase64Url, encrypt, decrypt } from '../utils/crypto';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export async function createSite(payload: CreateSitePayload): Promise<SiteCreatedResponse> {
  const key = await generateKey();
  const keyFragment = await exportKeyToBase64Url(key);

  const plaintext = JSON.stringify({
    creatorName: payload.creatorName,
    partnerName: payload.partnerName,
    loveMessage: payload.loveMessage,
    photoBase64: payload.photoBase64,
    photoCaption: payload.photoCaption,
    howWeMet: payload.howWeMet,
    favoriteMemory: payload.favoriteMemory,
    reasons: payload.reasons,
    songUrl: payload.songUrl,
    petName: payload.petName,
    secretMessage: payload.secretMessage,
  });

  const { encryptedData, iv } = await encrypt(key, plaintext);

  const res = await fetch(`${API_BASE}/sites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ encrypted_data: encryptedData, iv }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Failed to create site' }));
    throw new Error(err.detail || 'Failed to create site');
  }

  const data: SiteCreatedResponse = await res.json();
  return { ...data, url: `${data.url}#${keyFragment}` };
}

export async function getSite(id: string, keyFragment: string): Promise<ValentineSite> {
  const res = await fetch(`${API_BASE}/sites/${encodeURIComponent(id)}`);
  if (res.status === 410) {
    throw new Error('expired');
  }
  if (!res.ok) {
    throw new Error('Site not found');
  }

  const data: EncryptedSiteResponse = await res.json();
  const key = await importKeyFromBase64Url(keyFragment);
  const plaintext = await decrypt(key, data.encrypted_data, data.iv);
  const personal = JSON.parse(plaintext);

  return {
    id: data.id,
    creatorName: personal.creatorName,
    partnerName: personal.partnerName,
    loveMessage: personal.loveMessage,
    photoBase64: personal.photoBase64,
    photoCaption: personal.photoCaption,
    howWeMet: personal.howWeMet,
    favoriteMemory: personal.favoriteMemory,
    reasons: personal.reasons,
    songUrl: personal.songUrl,
    petName: personal.petName,
    secretMessage: personal.secretMessage,
    viewCount: data.view_count,
    accepted: data.accepted,
  };
}

export async function recordView(id: string): Promise<void> {
  fetch(`${API_BASE}/sites/${encodeURIComponent(id)}/view`, { method: 'POST' }).catch(() => {});
}

export async function acceptSite(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/sites/${encodeURIComponent(id)}/accept`, { method: 'POST' });
  if (!res.ok) {
    throw new Error('Failed to accept');
  }
}
