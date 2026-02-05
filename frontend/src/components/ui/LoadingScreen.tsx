import PixelHeart from './PixelHeart';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-paper-cream flex flex-col items-center justify-center gap-6">
      {/* Floating mini hearts around the main heart */}
      <div className="relative">
        <div className="absolute -top-4 -left-6 animate-float" style={{ animationDelay: '0s' }}>
          <PixelHeart size={12} color="#FF6B9D" />
        </div>
        <div className="absolute -top-2 -right-8 animate-float" style={{ animationDelay: '0.5s' }}>
          <PixelHeart size={10} color="#FF8A80" />
        </div>
        <div className="absolute -bottom-3 -left-5 animate-float" style={{ animationDelay: '1s' }}>
          <PixelHeart size={8} color="#FF6B9D" />
        </div>
        <div className="animate-pulse-heart">
          <PixelHeart size={64} color="#E63946" />
        </div>
      </div>

      {/* Animated loading dots */}
      <div className="flex items-center gap-1.5">
        <p className="font-pixel text-[10px] text-ink-faded">Preparing your love letter</p>
        <span className="flex gap-0.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-1 h-1 rounded-full bg-pixel-pink animate-loading-dot"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}
