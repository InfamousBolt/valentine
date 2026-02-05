interface MusicControllerProps {
  muted: boolean;
  onToggle: () => void;
}

export default function MusicController({ muted, onToggle }: MusicControllerProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-4 right-4 z-50 bg-white/80 backdrop-blur-sm w-10 h-10 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors"
      aria-label={muted ? 'Unmute' : 'Mute'}
    >
      <span className="font-pixel text-[10px]">
        {muted ? '🔇' : '🔊'}
      </span>
    </button>
  );
}
