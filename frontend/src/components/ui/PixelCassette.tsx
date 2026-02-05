interface PixelCassetteProps {
  isPlaying?: boolean;
  onToggle?: () => void;
  label?: string;
  className?: string;
}

export default function PixelCassette({ isPlaying = false, onToggle, label = 'Our Song', className = '' }: PixelCassetteProps) {
  return (
    <div
      className={`cursor-pointer select-none ${className}`}
      onClick={onToggle}
    >
      {/* Cassette body */}
      <div className="bg-ink-dark rounded-lg p-4 w-64 shadow-xl relative">
        {/* Label area */}
        <div className="bg-paper-cream rounded-sm p-2 mb-3 text-center">
          <p className="font-pixel text-[8px] text-ink-dark">{label}</p>
        </div>

        {/* Tape window */}
        <div className="bg-paper-craft/30 rounded-sm p-3 flex items-center justify-center gap-6">
          {/* Left reel */}
          <div
            className={`w-10 h-10 rounded-full border-4 border-paper-craft/50 flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}
          >
            <div className="w-3 h-3 bg-ink-dark rounded-full" />
          </div>

          {/* Tape line */}
          <div className="flex-1 h-[2px] bg-paper-craft/30" />

          {/* Right reel */}
          <div
            className={`w-10 h-10 rounded-full border-4 border-paper-craft/50 flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}
          >
            <div className="w-3 h-3 bg-ink-dark rounded-full" />
          </div>
        </div>

        {/* Play indicator */}
        <div className="text-center mt-3">
          <span className="font-pixel text-[8px] text-pixel-pink">
            {isPlaying ? '>> PLAYING' : '|| PAUSED'}
          </span>
        </div>

        {/* Screw holes */}
        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-paper-craft/20" />
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-paper-craft/20" />
        <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-paper-craft/20" />
        <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-paper-craft/20" />
      </div>
    </div>
  );
}
