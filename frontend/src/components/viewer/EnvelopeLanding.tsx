import { useState } from 'react';
import PixelHeart from '../ui/PixelHeart';

interface EnvelopeLandingProps {
  partnerName: string;
  onOpen: () => void;
}

export default function EnvelopeLanding({ partnerName, onOpen }: EnvelopeLandingProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(onOpen, 1200);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center cursor-pointer select-none relative overflow-hidden"
      onClick={handleOpen}
    >

      {/* Envelope */}
      <div
        className={`relative transition-all duration-500 animate-scale-in ${isOpening ? 'scale-110' : ''}`}
      >
        {/* Envelope body */}
        <div
          className="w-72 h-48 md:w-96 md:h-64 bg-paper-craft rounded-lg relative overflow-hidden"
          style={{
            boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          {/* Subtle paper grain overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Envelope flap */}
          <div
            className={`absolute top-0 left-0 right-0 h-1/2 bg-paper-craft origin-top z-10 ${
              isOpening ? 'animate-flap-open' : ''
            }`}
            style={{
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              background: 'linear-gradient(180deg, #D4B896 0%, #E8D4B8 100%)',
            }}
          />

          {/* Inner V shape */}
          <div
            className="absolute top-0 left-0 right-0 h-1/2"
            style={{
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              background: 'linear-gradient(180deg, #C4A882 0%, #D4B896 100%)',
            }}
          />

          {/* Wax seal with shimmer */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 ${
              isOpening ? 'animate-seal-crack' : ''
            }`}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center relative"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #ef5350, #c62828 70%)',
                boxShadow: '0 3px 12px rgba(198, 40, 40, 0.5), inset 0 1px 2px rgba(255,255,255,0.2)',
              }}
            >
              <PixelHeart size={24} color="#FFF" />
              {/* Shimmer sweep */}
              {!isOpening && (
                <div
                  className="absolute inset-0 rounded-full overflow-hidden"
                  style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 3s ease-in-out infinite',
                  }}
                />
              )}
            </div>
          </div>

          {/* Letter peeking out */}
          <div
            className={`absolute inset-x-4 top-4 bottom-4 bg-white rounded flex items-center justify-center ${
              isOpening ? 'animate-slide-out' : ''
            }`}
            style={{
              boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.06)',
            }}
          >
            <p className="font-handwritten text-xl text-ink-faded opacity-50">
              A letter for you...
            </p>
          </div>
        </div>

        {/* "To:" label */}
        <div className="text-center mt-6">
          <p className="font-handwritten text-3xl text-white animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            To: {partnerName}
          </p>
        </div>
      </div>

      {/* Tap hint */}
      <p
        className={`mt-8 font-pixel text-[10px] text-gray-400 animate-pulse-heart transition-opacity duration-300 ${
          isOpening ? 'opacity-0' : ''
        }`}
      >
        Tap to open
      </p>
    </div>
  );
}
