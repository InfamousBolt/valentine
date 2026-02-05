import FlipCard from '../../ui/FlipCard';
import PixelHeart from '../../ui/PixelHeart';

interface ReasonsPageProps {
  reasons: string[];
}

export default function ReasonsPage({ reasons }: ReasonsPageProps) {
  return (
    <div className="w-full max-w-lg mx-auto px-6 py-12">
      <h2 className="font-handwritten text-3xl md:text-4xl text-center text-ink-dark mb-8 animate-fade-in-up">
        Reasons I Love You
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {reasons.map((reason, i) => (
          <div
            key={i}
            className="animate-fade-in-up"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <FlipCard
              className="w-full h-36"
              front={
                <div className="w-full h-full bg-paper-cream rounded-lg shadow-md flex flex-col items-center justify-center gap-2 border-2 border-pixel-pink/20">
                  <PixelHeart size={28} color="#E63946" />
                  <span className="font-pixel text-[10px] text-pixel-pink">#{i + 1}</span>
                </div>
              }
              back={
                <div className="w-full h-full bg-pixel-pink rounded-lg shadow-md flex items-center justify-center p-3">
                  <p className="font-handwritten text-lg text-white text-center leading-snug">
                    {reason}
                  </p>
                </div>
              }
            />
          </div>
        ))}
      </div>

      <p className="text-center font-pixel text-[8px] text-ink-faded mt-6">
        Tap each card to reveal
      </p>
    </div>
  );
}
