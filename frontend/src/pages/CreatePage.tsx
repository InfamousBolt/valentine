import { useMemo, useState } from 'react';
import CreateWizard from '../components/create/CreateWizard';
import DiscoBall from '../components/ui/DiscoBall';
import PixelHeart from '../components/ui/PixelHeart';

export default function CreatePage() {
  const [visitorCount] = useState(() => Math.floor(Math.random() * 9000) + 1000);

  const stars = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        x: ((i * 37 + 13) % 97) + 1,
        y: ((i * 53 + 7) % 97) + 1,
        size: 1 + (i % 3),
        delay: (i * 0.4) % 5,
        duration: 2 + (i % 4),
      })),
    [],
  );

  const floatingHearts = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        x: ((i * 23 + 5) % 90) + 5,
        size: 16 + (i % 4) * 8,
        delay: i * 1.5,
        duration: 8 + (i % 5) * 2,
      })),
    [],
  );

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a1a 0%, #0d0520 50%, #0a0a1a 100%)',
      }}
    >
      {/* Stars */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-twinkle pointer-events-none"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {/* Floating pixel hearts */}
      {floatingHearts.map((heart, i) => (
        <div
          key={`heart-${i}`}
          className="absolute animate-float-up pointer-events-none"
          style={{
            left: `${heart.x}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          <PixelHeart size={heart.size} color="#E63946" />
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Marquee banner */}
        <div className="bg-black/60 border-b-2 border-neon-magenta/40 py-2 overflow-hidden backdrop-blur-sm shrink-0">
          <div className="animate-marquee whitespace-nowrap">
            <span className="font-pixel text-[10px] text-neon-magenta">
              ♥ ~*~ VALENTINE'S DAY WEBSITE GENERATOR ~*~ ♥
              {'        '}
              Make something special for your someone special
              {'        '}
              ♥ ~*~ POWERED BY LOVE AND PIXELS ~*~ ♥
            </span>
          </div>
        </div>

        {/* Disco Ball */}
        <div className="flex justify-center pt-2 shrink-0">
          <DiscoBall size={70} />
        </div>

        {/* Page title */}
        <h1 className="font-pixel text-sm md:text-xl text-center text-pixel-pink neon-glow-pink mb-3 animate-neon-flicker px-4 shrink-0">
          CREATE YOUR VALENTINE
        </h1>

        {/* XP Window - takes up remaining space */}
        <div className="flex-1 px-3 md:px-6 pb-4 flex flex-col w-full max-w-5xl mx-auto min-h-0">
          <div className="flex-1 flex flex-col shadow-[0_0_40px_rgba(0,88,234,0.15)] rounded-lg overflow-hidden min-h-0">
            {/* Title bar */}
            <div
              className="px-2 py-1.5 flex items-center justify-between shrink-0"
              style={{
                background:
                  'linear-gradient(180deg, #0997ff 0%, #0560d0 10%, #0058e6 50%, #0350c0 90%, #003fa0 100%)',
                borderTop: '1px solid #4da0ff',
              }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <PixelHeart size={12} color="#FF6B9D" />
                <span className="font-pixel text-[9px] text-white truncate">
                  Valentine Creator 2000
                </span>
              </div>
              <div className="flex gap-[3px] shrink-0">
                <div className="w-[22px] h-[22px] bg-gradient-to-b from-[#ddd] to-[#aaa] border border-white/60 border-b-[#666] border-r-[#666] rounded-sm flex items-center justify-center text-[11px] font-bold leading-none text-gray-700">
                  _
                </div>
                <div className="w-[22px] h-[22px] bg-gradient-to-b from-[#ddd] to-[#aaa] border border-white/60 border-b-[#666] border-r-[#666] rounded-sm flex items-center justify-center text-[11px] font-bold leading-none text-gray-700">
                  □
                </div>
                <div className="w-[22px] h-[22px] bg-gradient-to-b from-[#e88] to-[#c44] border border-[#faa]/60 border-b-[#822] border-r-[#822] rounded-sm flex items-center justify-center text-[11px] font-bold leading-none text-white">
                  ×
                </div>
              </div>
            </div>

            {/* Menu bar */}
            <div
              className="px-2 py-1 flex items-center gap-4 shrink-0 border-b border-gray-700/50"
              style={{ background: '#1a1a2e' }}
            >
              <span className="font-pixel text-[8px] text-gray-400 hover:text-neon-magenta cursor-default">
                File
              </span>
              <span className="font-pixel text-[8px] text-gray-400 hover:text-neon-magenta cursor-default">
                Edit
              </span>
              <span className="font-pixel text-[8px] text-gray-400 hover:text-neon-magenta cursor-default">
                View
              </span>
              <span className="font-pixel text-[8px] text-gray-400 hover:text-neon-magenta cursor-default">
                Help
              </span>
            </div>

            {/* Window body */}
            <div
              className="flex-1 p-4 md:p-8 overflow-y-auto min-h-0"
              style={{
                background: 'linear-gradient(180deg, #0d0d1a 0%, #111128 100%)',
                borderLeft: '2px solid #444',
                borderRight: '2px solid #222',
                borderBottom: '2px solid #222',
              }}
            >
              <CreateWizard />
            </div>

            {/* Status bar */}
            <div
              className="px-3 py-1 flex items-center justify-between shrink-0 border-t border-gray-700"
              style={{ background: '#1a1a2e' }}
            >
              <span className="font-pixel text-[7px] text-gray-500">
                ♥ Ready
              </span>
              <span className="font-pixel text-[7px] text-gray-500">
                lovefor.you
              </span>
            </div>
          </div>
        </div>

        {/* Visitor counter */}
        <div className="text-center py-3 shrink-0">
          <div
            className="inline-block bg-black/80 border-2 border-gray-600 px-4 py-1.5"
            style={{ borderStyle: 'inset' }}
          >
            <span className="font-pixel text-[9px] text-neon-green neon-glow-green">
              YOU ARE VISITOR #{String(visitorCount).padStart(6, '0')}
            </span>
          </div>
        </div>

        {/* Bottom decorative hearts row */}
        <div className="flex justify-center gap-2 pb-2 shrink-0">
          {Array.from({ length: 7 }, (_, i) => (
            <PixelHeart
              key={i}
              size={16}
              color="#E63946"
              className="animate-pulse-heart"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
