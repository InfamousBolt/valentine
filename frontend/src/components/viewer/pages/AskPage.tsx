import { useState, useCallback } from 'react';
import { acceptSite } from '../../../api/client';
import PixelHeart from '../../ui/PixelHeart';
import RunawayButton from '../../ui/RunawayButton';

interface AskPageProps {
  partnerName: string;
  siteId: string;
  onAccept: () => void;
}

export default function AskPage({ partnerName, siteId, onAccept }: AskPageProps) {
  const [yesHover, setYesHover] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handleYes = useCallback(async () => {
    if (accepted) return;
    setAccepted(true);
    try {
      await acceptSite(siteId);
    } catch {
      // Non-critical, proceed anyway
    }
    onAccept();
  }, [siteId, onAccept, accepted]);

  return (
    <div className="w-full max-w-lg mx-auto px-6 py-12 text-center">
      {/* Decorative hearts */}
      <div className="flex justify-center gap-3 mb-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-float" style={{ animationDelay: `${i * 0.25}s` }}>
            <PixelHeart
              size={16 + (i % 2) * 8}
              color={i % 2 === 0 ? '#E63946' : '#FF6B9D'}
            />
          </div>
        ))}
      </div>

      {/* Question */}
      <h2 className="font-handwritten text-4xl md:text-5xl text-ink-dark mb-12 animate-fade-in-up">
        {partnerName}, will you be my Valentine?
      </h2>

      {/* Buttons */}
      <div className="flex items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        {/* Yes button - slightly magnetic with glow */}
        <button
          onClick={handleYes}
          onMouseEnter={() => setYesHover(true)}
          onMouseLeave={() => setYesHover(false)}
          className="bg-button-yes text-white font-pixel text-xs px-8 py-4 rounded-lg transition-all duration-200"
          style={{
            transform: yesHover ? 'scale(1.15)' : 'scale(1)',
            boxShadow: yesHover
              ? '0 0 20px rgba(76, 175, 80, 0.5), 0 4px 16px rgba(0,0,0,0.15)'
              : '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          Yes!
        </button>

        {/* No button - runs away */}
        <RunawayButton />
      </div>

      {/* Subtle hint text */}
      <p className="mt-10 font-pixel text-[7px] text-ink-faded/50 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
        (psst... the answer is obviously yes)
      </p>
    </div>
  );
}
