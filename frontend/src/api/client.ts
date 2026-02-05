import type { ValentineSite, CreateSitePayload, SiteCreatedResponse } from '../types/valentine';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

function toSnakeCase(payload: CreateSitePayload): Record<string, unknown> {
  return {
    creator_name: payload.creatorName,
    partner_name: payload.partnerName,
    love_message: payload.loveMessage,
    photo_base64: payload.photoBase64,
    photo_caption: payload.photoCaption,
    how_we_met: payload.howWeMet,
    favorite_memory: payload.favoriteMemory,
    reasons: payload.reasons,
    song_url: payload.songUrl,
    pet_name: payload.petName,
    secret_message: payload.secretMessage,
  };
}

function toCamelCase(data: Record<string, unknown>): ValentineSite {
  return {
    id: data.id as string,
    creatorName: data.creator_name as string,
    partnerName: data.partner_name as string,
    loveMessage: data.love_message as string,
    photoBase64: data.photo_base64 as string | undefined,
    photoCaption: data.photo_caption as string | undefined,
    howWeMet: data.how_we_met as string | undefined,
    favoriteMemory: data.favorite_memory as string | undefined,
    reasons: data.reasons as string[] | undefined,
    songUrl: data.song_url as string | undefined,
    petName: data.pet_name as string | undefined,
    secretMessage: data.secret_message as string | undefined,
    viewCount: data.view_count as number,
    accepted: data.accepted as boolean,
  };
}

export async function createSite(payload: CreateSitePayload): Promise<SiteCreatedResponse> {
  const res = await fetch(`${API_BASE}/sites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toSnakeCase(payload)),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Failed to create site' }));
    throw new Error(err.detail || 'Failed to create site');
  }
  return res.json();
}

export async function getSite(id: string): Promise<ValentineSite> {
  const res = await fetch(`${API_BASE}/sites/${encodeURIComponent(id)}`);
  if (res.status === 410) {
    throw new Error('expired');
  }
  if (!res.ok) {
    throw new Error('Site not found');
  }
  const data = await res.json();
  return toCamelCase(data);
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
