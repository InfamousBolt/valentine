import PixelHeart from '../ui/PixelHeart';

export default function ExpiredPage() {
  return (
    <div className="min-h-screen bg-paper-cream flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      {/* Faded background hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i * 23) % 60}%`,
              opacity: 0.04,
            }}
          >
            <PixelHeart size={30 + i * 10} color="#aaa" />
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="opacity-30 mb-6 animate-pulse-heart" style={{ animationDuration: '3s' }}>
          <PixelHeart size={80} color="#bbb" />
        </div>
        <h1 className="font-handwritten text-4xl text-ink-faded mb-4 animate-fade-in-up">
          This valentine has expired
        </h1>
        <p className="text-ink-faded max-w-md animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
          Love letters have a season. This one has passed, but the memories live on forever.
        </p>
        <a
          href="/create"
          className="mt-8 bg-pixel-pink text-white font-pixel text-[10px] px-6 py-3 rounded-lg hover:bg-pixel-red transition-colors shadow-md animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          Create Your Own
        </a>
      </div>
    </div>
  );
}
