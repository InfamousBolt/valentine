import { useState } from 'react';
import PixelHeart from '../ui/PixelHeart';
import ConfettiExplosion from '../ui/ConfettiExplosion';

interface SuccessScreenProps {
  url: string;
  id: string;
  partnerName: string;
}

export default function SuccessScreen({ url, id, partnerName }: SuccessScreenProps) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="text-center py-8 animate-fade-in-up">
      <ConfettiExplosion />

      <div className="animate-bounce-in mb-6">
        <PixelHeart size={80} color="#FF00FF" />
      </div>

      <h2 className="font-pixel text-sm md:text-base text-neon-magenta neon-glow-magenta mb-2">
        YOUR VALENTINE IS READY!
      </h2>
      <p className="text-gray-400 mb-8 font-pixel text-[9px]">
        Share this link with {partnerName}
      </p>

      <div
        className="bg-black/40 border-2 border-gray-600 p-6 max-w-md mx-auto space-y-4"
        style={{ borderStyle: 'inset' }}
      >
        <div
          className="bg-retro-panel border-2 border-gray-700 p-3 font-mono text-sm break-all text-neon-green neon-glow-green"
          style={{ borderStyle: 'inset' }}
        >
          {url}
        </div>

        <button onClick={copyLink} className="xp-btn-primary w-full py-3">
          {copied ? 'COPIED!' : 'COPY LINK'}
        </button>

        <a
          href={`/preview/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="xp-btn block w-full py-3 text-center no-underline"
        >
          PREVIEW IT
        </a>
      </div>
    </div>
  );
}
