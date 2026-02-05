import HandwrittenText from '../../ui/HandwrittenText';
import PixelHeart from '../../ui/PixelHeart';

interface StoryPageProps {
  howWeMet?: string;
  favoriteMemory?: string;
}

export default function StoryPage({ howWeMet, favoriteMemory }: StoryPageProps) {
  return (
    <div className="w-full max-w-lg mx-auto px-6 py-12">
      {/* Lined paper effect */}
      <div
        className="bg-white rounded-lg shadow-md p-6 md:p-8 relative overflow-hidden"
        style={{
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #e8e8e8 28px)',
          backgroundPosition: '0 40px',
        }}
      >
        {/* Red margin line */}
        <div className="absolute top-0 bottom-0 left-12 w-[1px] bg-pixel-coral/30" />

        {/* Margin doodles */}
        <div className="absolute top-16 left-2">
          <PixelHeart size={10} color="#FF6B9D" />
        </div>
        <div className="absolute top-40 left-3">
          <PixelHeart size={8} color="#E63946" />
        </div>

        <div className="pl-8 space-y-8">
          {howWeMet && (
            <div className="animate-fade-in-up">
              <h3 className="font-pixel text-[10px] text-pixel-pink mb-3">
                How We Met
              </h3>
              <HandwrittenText
                text={howWeMet}
                typewriter
                speed={35}
                className="text-lg text-ink-dark leading-relaxed whitespace-pre-wrap"
              />
            </div>
          )}

          {favoriteMemory && (
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h3 className="font-pixel text-[10px] text-pixel-pink mb-3 mt-6">
                Our Favorite Memory
              </h3>
              <HandwrittenText
                text={favoriteMemory}
                typewriter
                speed={35}
                className="text-lg text-ink-dark leading-relaxed whitespace-pre-wrap"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
