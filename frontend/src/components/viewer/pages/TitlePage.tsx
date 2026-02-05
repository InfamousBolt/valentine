import PixelHeart from '../../ui/PixelHeart';
import HandwrittenText from '../../ui/HandwrittenText';

interface TitlePageProps {
  partnerName: string;
  creatorName: string;
  petName?: string;
  loveMessage: string;
}

export default function TitlePage({ partnerName, creatorName, petName, loveMessage }: TitlePageProps) {
  return (
    <div className="w-full max-w-lg mx-auto px-6 py-12 text-center">
      {/* Decorative hearts */}
      <div className="flex justify-center gap-2 mb-6 animate-fade-in-up">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-float" style={{ animationDelay: `${i * 0.2}s` }}>
            <PixelHeart size={16} color={i % 2 === 0 ? '#E63946' : '#FF6B9D'} />
          </div>
        ))}
      </div>

      {/* Title */}
      <h1 className="font-handwritten text-4xl md:text-5xl text-ink-dark mb-4 animate-fade-in-up">
        To My Dearest {partnerName}, Welcome To My Scrapebook!
      </h1>

      {/* From line */}
      <p className="font-handwritten text-xl text-ink-faded mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        From {petName ? `your ${petName}` : creatorName}
      </p>

      {/* Love message with side stickers */}
      <div className="relative animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        {/* Left side stickers */}
        <div className="absolute -left-2 top-0 bottom-0 pointer-events-none scale-[0.5] md:scale-100 origin-top-left">
          <div className="animate-float" style={{ animationDelay: '0.5s' }}>
            <PixelHeart size={28} color="#E63946" className="opacity-60" />
          </div>
          <div className="mt-6 -ml-1 animate-float" style={{ animationDelay: '1.1s' }}>
            <svg width="32" height="32" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
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
          </div>
          <div className="mt-4 ml-1 animate-float" style={{ animationDelay: '1.7s' }}>
            <svg width="28" height="28" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
              <rect x="7" y="0" width="2" height="2" fill="#FFD700" />
              <rect x="7" y="2" width="2" height="2" fill="#FFD700" />
              <rect x="5" y="4" width="6" height="2" fill="#FFD700" />
              <rect x="0" y="6" width="16" height="2" fill="#FFD700" />
              <rect x="2" y="8" width="12" height="2" fill="#FFD700" />
              <rect x="4" y="10" width="8" height="2" fill="#FFD700" />
              <rect x="2" y="10" width="2" height="2" fill="#FFD700" />
              <rect x="12" y="10" width="2" height="2" fill="#FFD700" />
              <rect x="0" y="12" width="2" height="2" fill="#FFD700" />
              <rect x="14" y="12" width="2" height="2" fill="#FFD700" />
            </svg>
          </div>
        </div>

        {/* Right side stickers */}
        <div className="absolute -right-2 top-0 bottom-0 pointer-events-none flex flex-col items-end scale-[0.5] md:scale-100 origin-top-right">
          <div className="animate-float" style={{ animationDelay: '0.8s' }}>
            <svg width="30" height="21" viewBox="0 0 16 11" style={{ imageRendering: 'pixelated' }}>
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
          </div>
          <div className="mt-5 -mr-1 animate-float" style={{ animationDelay: '1.4s' }}>
            <PixelHeart size={24} color="#FF6B9D" className="opacity-50" />
          </div>
          <div className="mt-6 animate-float" style={{ animationDelay: '2.0s' }}>
            <svg width="30" height="30" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
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
          </div>
        </div>

        <div className="px-8">
          <HandwrittenText
            text={loveMessage}
            typewriter
            speed={40}
            className="text-xl md:text-2xl text-ink-dark leading-relaxed whitespace-pre-wrap"
          />
        </div>
      </div>

      {/* Date stamp */}
      <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <p className="font-pixel text-[8px] text-ink-faded">
          Valentine's Day {new Date().getFullYear()}
        </p>
      </div>

      {/* Bottom hearts */}
      <div className="flex justify-center gap-2 mt-6 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-float" style={{ animationDelay: `${i * 0.2 + 1}s` }}>
            <PixelHeart size={12} color={i % 2 === 0 ? '#FF6B9D' : '#E63946'} />
          </div>
        ))}
      </div>
    </div>
  );
}
