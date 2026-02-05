import { useState } from 'react';
import ConfettiExplosion from '../ui/ConfettiExplosion';
import PixelHeart from '../ui/PixelHeart';

interface CelebrationOverlayProps {
  partnerName: string;
  siteId: string;
}

export default function CelebrationOverlay({ partnerName, siteId }: CelebrationOverlayProps) {
  const [copied, setCopied] = useState(false);

  const shareLink = async () => {
    const url = `${window.location.origin}/v/${siteId}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-paper-cream/95 flex flex-col items-center justify-center px-4">
      <ConfettiExplosion />

      <div className="animate-bounce-in mb-4">
        <PixelHeart size={80} color="#E63946" />
      </div>

      <h1 className="font-handwritten text-5xl md:text-6xl text-pixel-red animate-fade-in-up mb-3">
        It's Official!
      </h1>

      <p
        className="font-handwritten text-2xl md:text-3xl text-ink-dark animate-fade-in-up mb-8"
        style={{ animationDelay: '0.3s' }}
      >
        {partnerName} said YES!
      </p>

      <div className="flex flex-col items-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <button
          onClick={shareLink}
          className={`font-pixel text-[10px] px-6 py-3 rounded-lg transition-all duration-200 shadow-md ${
            copied
              ? 'bg-button-yes text-white scale-105'
              : 'bg-pixel-pink text-white hover:bg-pixel-red'
          }`}
        >
          {copied ? 'Link Copied!' : 'Share This Love Story'}
        </button>
        {copied && (
          <p className="font-pixel text-[8px] text-button-yes animate-fade-in-up">
            Send it to your friends!
          </p>
        )}
      </div>

      {/* Floating hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${4 + (i * 7) % 92}%`,
              top: `${8 + (i * 11) % 84}%`,
              animationDelay: `${i * 0.25}s`,
              opacity: 0.15 + (i % 3) * 0.05,
            }}
          >
            <PixelHeart size={10 + (i % 5) * 5} color={i % 3 === 0 ? '#E63946' : '#FF6B9D'} />
          </div>
        ))}
      </div>
    </div>
  );
}
