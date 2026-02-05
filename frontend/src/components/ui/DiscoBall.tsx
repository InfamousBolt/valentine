import { useMemo } from 'react';

interface DiscoBallProps {
  size?: number;
}

export default function DiscoBall({ size = 100 }: DiscoBallProps) {
  const tiles = useMemo(() => {
    const rows = 8;
    const cols = 10;
    return Array.from({ length: rows * cols }, (_, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      return {
        row,
        col,
        hue: (row * 45 + col * 36) % 360,
        lightness: 50 + ((row + col) % 3) * 15,
        twinkleDelay: (row * 0.2 + col * 0.15).toFixed(2),
        twinkleDuration: 2 + ((row + col) % 3),
      };
    });
  }, []);

  const tileW = 100 / 10;
  const tileH = 100 / 8;

  return (
    <div className="flex flex-col items-center">
      <div className="w-[2px] h-10 bg-gradient-to-b from-transparent via-gray-400 to-gray-300" />
      <div
        className="rounded-full relative overflow-hidden"
        style={{
          width: size,
          height: size,
          background: 'radial-gradient(circle at 35% 30%, #e0e0e0 0%, #a0a0a0 30%, #606060 70%, #303030 100%)',
          boxShadow: `
            0 0 ${size / 3}px rgba(255,255,255,0.2),
            0 0 ${size}px rgba(255,105,180,0.15),
            0 ${size / 10}px ${size / 5}px rgba(0,0,0,0.4)
          `,
          animation: 'discoRotate 10s linear infinite',
          transformStyle: 'preserve-3d',
        }}
      >
        {tiles.map(({ row, col, hue, lightness, twinkleDelay, twinkleDuration }) => (
          <div
            key={`${row}-${col}`}
            className="absolute"
            style={{
              width: `${tileW}%`,
              height: `${tileH}%`,
              left: `${col * tileW}%`,
              top: `${row * tileH}%`,
              background: `hsla(${hue}, 60%, ${lightness}%, 0.4)`,
              border: '0.5px solid rgba(255,255,255,0.15)',
              animation: `starTwinkle ${twinkleDuration}s ease-in-out ${twinkleDelay}s infinite`,
            }}
          />
        ))}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.5) 0%, transparent 40%)',
          }}
        />
      </div>
      {/* Light cone below the ball */}
      <div
        className="pointer-events-none animate-disco-colors"
        style={{
          width: 0,
          height: 0,
          borderLeft: `${size / 2}px solid transparent`,
          borderRight: `${size / 2}px solid transparent`,
          borderTop: `${size * 1.5}px solid rgba(255,105,180,0.04)`,
          filter: 'blur(8px)',
        }}
      />
    </div>
  );
}
