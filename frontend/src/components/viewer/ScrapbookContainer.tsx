import { useMemo } from 'react';
import type { ValentineSite } from '../../types/valentine';
import TitlePage from './pages/TitlePage';
import PhotoPage from './pages/PhotoPage';
import StoryPage from './pages/StoryPage';
import ReasonsPage from './pages/ReasonsPage';
import SongPage from './pages/SongPage';
import SecretMessagePage from './pages/SecretMessagePage';
import AskPage from './pages/AskPage';
import PixelHeart from '../ui/PixelHeart';

interface ScrapbookContainerProps {
  site: ValentineSite;
  onAccept: () => void;
}

/* ── Tape strip decoration ── */
type TapeColor = 'pink' | 'yellow' | 'mint' | 'lavender';

const tapeColors: Record<TapeColor, { bg: string; border: string }> = {
  pink:     { bg: 'rgba(255, 182, 193, 0.55)', border: 'rgba(255, 105, 145, 0.2)' },
  yellow:   { bg: 'rgba(255, 245, 157, 0.55)', border: 'rgba(200, 180, 60, 0.2)' },
  mint:     { bg: 'rgba(180, 240, 210, 0.50)', border: 'rgba(100, 180, 140, 0.2)' },
  lavender: { bg: 'rgba(210, 180, 255, 0.50)', border: 'rgba(150, 100, 220, 0.2)' },
};

function Tape({ color, rotation, position, width = 60 }: {
  color: TapeColor;
  rotation: number;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  width?: number;
}) {
  const c = tapeColors[color];
  return (
    <div
      className="absolute pointer-events-none z-20"
      style={{
        ...position,
        width: `${width}px`,
        height: '18px',
        background: c.bg,
        borderTop: `1px solid ${c.border}`,
        borderBottom: `1px solid ${c.border}`,
        transform: `rotate(${rotation}deg)`,
        backdropFilter: 'blur(0.5px)',
      }}
    />
  );
}

/* ── Pixel art sticker components ── */

function PixelStar({ size = 24, color = '#FFD700', className = '' }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
      <rect x="7" y="0" width="2" height="2" fill={color} />
      <rect x="7" y="2" width="2" height="2" fill={color} />
      <rect x="5" y="4" width="6" height="2" fill={color} />
      <rect x="0" y="6" width="16" height="2" fill={color} />
      <rect x="2" y="8" width="12" height="2" fill={color} />
      <rect x="4" y="10" width="8" height="2" fill={color} />
      <rect x="2" y="10" width="2" height="2" fill={color} />
      <rect x="12" y="10" width="2" height="2" fill={color} />
      <rect x="0" y="12" width="2" height="2" fill={color} />
      <rect x="14" y="12" width="2" height="2" fill={color} />
    </svg>
  );
}

function PixelFlower({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 16" className={className} style={{ imageRendering: 'pixelated' }}>
      <rect x="5" y="0" width="4" height="2" fill="#FF6B9D" />
      <rect x="3" y="2" width="2" height="2" fill="#FF6B9D" />
      <rect x="9" y="2" width="2" height="2" fill="#FF6B9D" />
      <rect x="5" y="2" width="4" height="2" fill="#FFEB3B" />
      <rect x="3" y="4" width="2" height="2" fill="#FF6B9D" />
      <rect x="9" y="4" width="2" height="2" fill="#FF6B9D" />
      <rect x="5" y="4" width="4" height="2" fill="#FFEB3B" />
      <rect x="5" y="6" width="4" height="2" fill="#FF6B9D" />
      <rect x="6" y="8" width="2" height="6" fill="#4CAF50" />
      <rect x="4" y="10" width="2" height="2" fill="#66BB6A" />
      <rect x="8" y="12" width="2" height="2" fill="#66BB6A" />
    </svg>
  );
}

function PixelEnvelope({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 20 14" className={className} style={{ imageRendering: 'pixelated' }}>
      <rect x="0" y="0" width="20" height="14" fill="#E8D4B8" />
      <rect x="1" y="1" width="18" height="12" fill="#F5E6D0" />
      <rect x="0" y="0" width="2" height="2" fill="#D4B896" />
      <rect x="18" y="0" width="2" height="2" fill="#D4B896" />
      <rect x="2" y="2" width="2" height="2" fill="#D4B896" />
      <rect x="16" y="2" width="2" height="2" fill="#D4B896" />
      <rect x="4" y="4" width="2" height="2" fill="#D4B896" />
      <rect x="14" y="4" width="2" height="2" fill="#D4B896" />
      <rect x="6" y="6" width="2" height="2" fill="#D4B896" />
      <rect x="12" y="6" width="2" height="2" fill="#D4B896" />
      <rect x="8" y="8" width="4" height="2" fill="#E63946" />
    </svg>
  );
}

function PixelLoveSign({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
      {/* Sign board */}
      <rect x="1" y="1" width="14" height="7" fill="#F5E6D0" />
      <rect x="1" y="1" width="14" height="1" fill="#D4B896" />
      <rect x="1" y="7" width="14" height="1" fill="#D4B896" />
      <rect x="1" y="1" width="1" height="7" fill="#D4B896" />
      <rect x="14" y="1" width="1" height="7" fill="#D4B896" />
      {/* Heart on sign */}
      <rect x="5" y="2" width="2" height="1" fill="#E63946" />
      <rect x="9" y="2" width="2" height="1" fill="#E63946" />
      <rect x="4" y="3" width="8" height="2" fill="#E63946" />
      <rect x="5" y="5" width="6" height="1" fill="#E63946" />
      <rect x="6" y="6" width="4" height="1" fill="#E63946" />
      {/* Post */}
      <rect x="7" y="8" width="2" height="6" fill="#8B6914" />
      <rect x="5" y="14" width="6" height="2" fill="#8B6914" />
    </svg>
  );
}

function PixelHouse({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
      <rect x="11" y="1" width="2" height="3" fill="#8B4513" />
      <rect x="7" y="2" width="2" height="2" fill="#E63946" />
      <rect x="5" y="4" width="6" height="2" fill="#E63946" />
      <rect x="3" y="6" width="10" height="2" fill="#E63946" />
      <rect x="4" y="8" width="8" height="6" fill="#FFF5E1" />
      <rect x="7" y="10" width="2" height="4" fill="#8B4513" />
      <rect x="8" y="12" width="1" height="1" fill="#FFD700" />
      <rect x="5" y="9" width="2" height="2" fill="#87CEEB" />
      <rect x="10" y="9" width="2" height="2" fill="#87CEEB" />
      <rect x="2" y="14" width="12" height="2" fill="#4CAF50" />
    </svg>
  );
}

function PixelChocolateBox({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size * 0.75} viewBox="0 0 16 12" className={className} style={{ imageRendering: 'pixelated' }}>
      <rect x="1" y="4" width="14" height="7" fill="#8B4513" />
      <rect x="2" y="5" width="12" height="5" fill="#A0522D" />
      <rect x="0" y="3" width="16" height="2" fill="#6B3410" />
      <rect x="7" y="3" width="2" height="8" fill="#FF6B9D" />
      <rect x="1" y="6" width="14" height="2" fill="#FF6B9D" />
      <rect x="5" y="1" width="2" height="2" fill="#FF6B9D" />
      <rect x="9" y="1" width="2" height="2" fill="#FF6B9D" />
      <rect x="7" y="0" width="2" height="2" fill="#E63946" />
      <rect x="3" y="5" width="2" height="1" fill="#3E2723" />
      <rect x="11" y="5" width="2" height="1" fill="#3E2723" />
      <rect x="3" y="8" width="2" height="1" fill="#3E2723" />
      <rect x="11" y="8" width="2" height="1" fill="#3E2723" />
    </svg>
  );
}

function PixelBouquet({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
      <rect x="7" y="7" width="2" height="5" fill="#4CAF50" />
      <rect x="4" y="11" width="8" height="2" fill="#FFB4D6" />
      <rect x="3" y="12" width="10" height="3" fill="#FF6B9D" />
      <rect x="4" y="15" width="8" height="1" fill="#E63946" />
      <rect x="2" y="1" width="4" height="2" fill="#FF6B9D" />
      <rect x="3" y="0" width="2" height="4" fill="#FF6B9D" />
      <rect x="3" y="1" width="2" height="2" fill="#FFEB3B" />
      <rect x="6" y="2" width="4" height="2" fill="#E63946" />
      <rect x="7" y="1" width="2" height="4" fill="#E63946" />
      <rect x="7" y="2" width="2" height="2" fill="#FFEB3B" />
      <rect x="10" y="1" width="4" height="2" fill="#C480FF" />
      <rect x="11" y="0" width="2" height="4" fill="#C480FF" />
      <rect x="11" y="1" width="2" height="2" fill="#FFEB3B" />
      <rect x="4" y="6" width="2" height="2" fill="#66BB6A" />
      <rect x="10" y="7" width="2" height="2" fill="#66BB6A" />
    </svg>
  );
}

function PixelLips({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 16 11" className={className} style={{ imageRendering: 'pixelated' }}>
      <rect x="3" y="1" width="3" height="2" fill="#E63946" />
      <rect x="10" y="1" width="3" height="2" fill="#E63946" />
      <rect x="6" y="2" width="1" height="1" fill="#E63946" />
      <rect x="9" y="2" width="1" height="1" fill="#E63946" />
      <rect x="2" y="3" width="12" height="2" fill="#E63946" />
      <rect x="1" y="5" width="14" height="2" fill="#FF6B9D" />
      <rect x="2" y="7" width="12" height="2" fill="#FF6B9D" />
      <rect x="4" y="9" width="8" height="1" fill="#FF6B9D" />
      <rect x="4" y="6" width="3" height="1" fill="#FF8FAB" />
    </svg>
  );
}

function PixelKissMark({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
      <rect x="5" y="0" width="2" height="1" fill="#FF6B9D" />
      <rect x="9" y="0" width="2" height="1" fill="#FF6B9D" />
      <rect x="4" y="1" width="8" height="1" fill="#FF6B9D" />
      <rect x="5" y="2" width="6" height="1" fill="#FF6B9D" />
      <rect x="6" y="3" width="4" height="1" fill="#FF6B9D" />
      <rect x="7" y="4" width="2" height="1" fill="#FF6B9D" />
      <rect x="4" y="6" width="3" height="1" fill="#E63946" />
      <rect x="9" y="6" width="3" height="1" fill="#E63946" />
      <rect x="3" y="7" width="10" height="2" fill="#E63946" />
      <rect x="2" y="9" width="12" height="2" fill="#FF6B9D" />
      <rect x="3" y="11" width="10" height="1" fill="#FF6B9D" />
      <rect x="5" y="12" width="6" height="1" fill="#FF6B9D" />
    </svg>
  );
}

function DoodleText({ text, rotation = 0, color = '#FF6B9D', className = '' }: { text: string; rotation?: number; color?: string; className?: string }) {
  return (
    <span
      className={`font-handwritten select-none pointer-events-none ${className}`}
      style={{ color, transform: `rotate(${rotation}deg)`, display: 'inline-block', opacity: 0.5 }}
    >
      {text}
    </span>
  );
}

/* ── Scattered sticker decorations placed between sections ── */
const stickerSets: React.ReactNode[][] = [
  // After title
  [
    <div key="s0a" className="absolute pointer-events-none" style={{ right: '8%', top: '10%' }}>
      <PixelStar size={120} color="#FFD700" />
    </div>,
    <div key="s0b" className="absolute pointer-events-none" style={{ left: '5%', bottom: '20%' }}>
      <DoodleText text="xoxo" rotation={-12} color="#FF6B9D" className="text-lg" />
    </div>,
    <div key="s0c" className="absolute pointer-events-none" style={{ left: '30%', top: '5%' }}>
      <PixelKissMark size={96} className="opacity-40" />
    </div>,
  ],
  // After photo
  [
    <div key="s1a" className="absolute pointer-events-none" style={{ right: '5%', top: '30%' }}>
      <PixelFlower size={132} />
    </div>,
    <div key="s1b" className="absolute pointer-events-none" style={{ left: '60%', bottom: '10%' }}>
      <PixelStar size={96} color="#FF6B9D" />
    </div>,
    <div key="s1c" className="absolute pointer-events-none" style={{ left: '18%', top: '15%' }}>
      <PixelChocolateBox size={108} className="opacity-40" />
    </div>,
  ],
  // After story
  [
    <div key="s2a" className="absolute pointer-events-none" style={{ left: '3%', top: '15%' }}>
      <PixelEnvelope size={156} />
    </div>,
    <div key="s2b" className="absolute pointer-events-none" style={{ right: '10%', bottom: '15%' }}>
      <DoodleText text="forever ♥" rotation={8} color="#E63946" className="text-base" />
    </div>,
    <div key="s2c" className="absolute pointer-events-none" style={{ left: '45%', top: '0%' }}>
      <PixelLips size={96} className="opacity-35" />
    </div>,
  ],
  // After reasons
  [
    <div key="s3a" className="absolute pointer-events-none" style={{ right: '4%', top: '20%' }}>
      <PixelStar size={108} color="#C0A0FF" />
    </div>,
    <div key="s3b" className="absolute pointer-events-none" style={{ left: '8%', bottom: '25%' }}>
      <PixelFlower size={120} />
    </div>,
    <div key="s3c" className="absolute pointer-events-none" style={{ left: '50%', bottom: '5%' }}>
      <PixelHouse size={108} className="opacity-35" />
    </div>,
  ],
  // After song
  [
    <div key="s4a" className="absolute pointer-events-none" style={{ left: '55%', top: '10%' }}>
      <DoodleText text="♪ ♫ ♪" rotation={-5} color="#FF6B9D" className="text-xl" />
    </div>,
    <div key="s4b" className="absolute pointer-events-none" style={{ right: '6%', bottom: '10%' }}>
      <PixelHeart size={84} color="#E63946" className="opacity-40" />
    </div>,
    <div key="s4c" className="absolute pointer-events-none" style={{ left: '15%', bottom: '15%' }}>
      <PixelBouquet size={108} className="opacity-40" />
    </div>,
  ],
  // After secret
  [
    <div key="s5a" className="absolute pointer-events-none" style={{ left: '4%', top: '20%' }}>
      <PixelStar size={96} color="#FFD700" />
    </div>,
    <div key="s5b" className="absolute pointer-events-none" style={{ right: '12%', bottom: '20%' }}>
      <DoodleText text="shhh..." rotation={6} color="#aaa" className="text-sm" />
    </div>,
    <div key="s5c" className="absolute pointer-events-none" style={{ left: '40%', top: '5%' }}>
      <PixelLoveSign size={108} className="opacity-35" />
    </div>,
  ],
];

/* ── Layout presets per page key ── */
type Align = 'left' | 'left-center' | 'center' | 'right';

const alignStyles: Record<Align, React.CSSProperties> = {
  left:          { marginLeft: 0, marginRight: 'auto' },
  'left-center': { marginLeft: '8%', marginRight: 'auto' },
  center:        { marginLeft: 'auto', marginRight: 'auto' },
  right:         { marginLeft: 'auto', marginRight: 0 },
};

interface PageLayout {
  rotation: number;
  align: Align;
  tapes: { color: TapeColor; rotation: number; position: { top?: string; bottom?: string; left?: string; right?: string }; width?: number }[];
}

const layouts: Record<string, PageLayout> = {
  title: {
    rotation: 0,
    align: 'center',
    tapes: [
      { color: 'pink', rotation: -18, position: { top: '-6px', left: '-8px' }, width: 65 },
      { color: 'pink', rotation: 22, position: { top: '-6px', right: '-8px' }, width: 65 },
    ],
  },
  photo: {
    rotation: -2,
    align: 'left-center',
    tapes: [
      { color: 'yellow', rotation: -25, position: { top: '-4px', left: '10%' }, width: 55 },
      { color: 'yellow', rotation: 30, position: { top: '-4px', right: '10%' }, width: 55 },
    ],
  },
  story: {
    rotation: 1.5,
    align: 'right',
    tapes: [
      { color: 'mint', rotation: 15, position: { top: '-5px', right: '-6px' }, width: 70 },
      { color: 'mint', rotation: -20, position: { bottom: '-5px', left: '5%' }, width: 55 },
    ],
  },
  reasons: {
    rotation: -1,
    align: 'center',
    tapes: [
      { color: 'lavender', rotation: -22, position: { top: '-5px', left: '-5px' }, width: 60 },
      { color: 'lavender', rotation: 18, position: { bottom: '-5px', right: '8%' }, width: 55 },
    ],
  },
  song: {
    rotation: 2,
    align: 'left',
    tapes: [
      { color: 'yellow', rotation: -15, position: { top: '-5px', left: '10%' }, width: 55 },
      { color: 'pink', rotation: 20, position: { top: '-5px', right: '5%' }, width: 55 },
    ],
  },
  secret: {
    rotation: -1.5,
    align: 'right',
    tapes: [
      { color: 'mint', rotation: 25, position: { top: '-5px', right: '-6px' }, width: 60 },
      { color: 'mint', rotation: -18, position: { top: '-5px', left: '-6px' }, width: 60 },
    ],
  },
  ask: {
    rotation: 0,
    align: 'center',
    tapes: [
      { color: 'pink', rotation: -20, position: { top: '-6px', left: '-6px' }, width: 65 },
      { color: 'pink', rotation: 15, position: { top: '-6px', right: '-6px' }, width: 65 },
    ],
  },
};

export default function ScrapbookContainer({ site, onAccept }: ScrapbookContainerProps) {
  const pages = useMemo(() => {
    const p: { key: string; content: React.ReactNode }[] = [];

    p.push({
      key: 'title',
      content: (
        <TitlePage
          partnerName={site.partnerName}
          creatorName={site.creatorName}
          petName={site.petName}
          loveMessage={site.loveMessage}
        />
      ),
    });

    if (site.photoBase64) {
      p.push({
        key: 'photo',
        content: <PhotoPage photoBase64={site.photoBase64} caption={site.photoCaption} />,
      });
    }

    if (site.howWeMet || site.favoriteMemory) {
      p.push({
        key: 'story',
        content: <StoryPage howWeMet={site.howWeMet} favoriteMemory={site.favoriteMemory} />,
      });
    }

    if (site.reasons && site.reasons.length > 0) {
      p.push({
        key: 'reasons',
        content: <ReasonsPage reasons={site.reasons} />,
      });
    }

    if (site.songUrl) {
      p.push({
        key: 'song',
        content: <SongPage songUrl={site.songUrl} />,
      });
    }

    if (site.secretMessage) {
      p.push({
        key: 'secret',
        content: <SecretMessagePage message={site.secretMessage} />,
      });
    }

    p.push({
      key: 'ask',
      content: (
        <AskPage
          partnerName={site.petName || site.partnerName}
          siteId={site.id}
          onAccept={onAccept}
        />
      ),
    });

    return p;
  }, [site, onAccept]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Ruled diary page */}
      <div
        className="relative rounded-lg"
        style={{
          width: '80%',
          height: '80vh',
          overflow: 'hidden',
          background: '#FFFEF9',
          boxShadow:
            '0 0 40px rgba(255, 105, 180, 0.15), 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.6)',
          border: '1px solid rgba(180, 160, 130, 0.4)',
        }}
      >
        {/* Ruled lines background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #e0ddd5 28px)',
            backgroundPosition: '0 20px',
          }}
        />

        {/* Red margin line */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{ left: '48px', width: '1px', background: 'rgba(230, 57, 70, 0.25)' }}
        />

        {/* Top edge / header strip */}
        <div
          className="absolute top-0 left-0 right-0 h-5 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(220,210,190,0.5) 0%, transparent 100%)' }}
        />

        {/* Margin doodles */}
        <div className="absolute top-8 left-3 pointer-events-none opacity-40">
          <PixelHeart size={10} color="#FF6B9D" />
        </div>
        <div className="absolute top-24 left-4 pointer-events-none opacity-30">
          <PixelHeart size={8} color="#E63946" />
        </div>
        <div className="absolute bottom-16 left-3 pointer-events-none opacity-30">
          <PixelHeart size={10} color="#E63946" />
        </div>
        <div className="absolute top-[45%] left-2 pointer-events-none opacity-25">
          <PixelFlower size={14} />
        </div>
        <div className="absolute top-[70%] left-3 pointer-events-none opacity-30">
          <PixelStar size={10} color="#FFD700" />
        </div>
        <div className="absolute top-[58%] left-2 pointer-events-none opacity-25">
          <PixelLips size={12} />
        </div>
        <div className="absolute bottom-32 left-3 pointer-events-none opacity-25">
          <PixelKissMark size={11} />
        </div>

        {/* Right margin doodles */}
        <div className="absolute top-12 right-3 pointer-events-none opacity-30">
          <PixelLoveSign size={20} />
        </div>
        <div className="absolute top-[38%] right-2 pointer-events-none opacity-25">
          <PixelHouse size={18} />
        </div>
        <div className="absolute top-[62%] right-3 pointer-events-none opacity-30">
          <PixelChocolateBox size={16} />
        </div>
        <div className="absolute bottom-20 right-2 pointer-events-none opacity-25">
          <PixelBouquet size={16} />
        </div>

        {/* Paper grain texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Scrollable content area */}
        <div
          data-scrapbook-scroll
          className="relative z-10 h-full overflow-y-auto overflow-x-hidden px-8 md:px-14 py-16"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#d4b896 transparent',
          }}
        >
          {pages.map((page, i) => {
            const layout = layouts[page.key] || layouts.title;
            const stickers = stickerSets[i] || [];
            return (
              <div key={page.key}>
                {/* Scrapbook section wrapper */}
                <div
                  className="relative"
                  style={{
                    maxWidth: '672px',
                    transform: `rotate(${layout.rotation}deg)`,
                    ...alignStyles[layout.align],
                  }}
                >
                  {/* Tape decorations */}
                  {layout.tapes.map((tape, ti) => (
                    <Tape
                      key={ti}
                      color={tape.color}
                      rotation={tape.rotation}
                      position={tape.position}
                      width={tape.width}
                    />
                  ))}
                  {page.content}
                </div>

                {/* Divider with stickers between sections */}
                {i < pages.length - 1 && (
                  <div className="relative my-10">
                    <div className="flex items-center justify-center gap-3">
                      <div className="h-px flex-1 bg-pixel-pink/15" />
                      <PixelHeart size={10} color="#FF6B9D" className="opacity-30" />
                      <div className="h-px flex-1 bg-pixel-pink/15" />
                    </div>
                    {/* Scattered stickers in the gap area */}
                    <div className="relative h-14 md:h-36">
                      <div className="absolute inset-0 scale-[0.35] md:scale-100 origin-top-left">
                        {stickers}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
