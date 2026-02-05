import { useRef, useState, useLayoutEffect } from 'react';
import PixelHeart from '../../ui/PixelHeart';
import ScratchReveal from '../../ui/ScratchReveal';

interface SecretMessagePageProps {
  message: string;
}

export default function SecretMessagePage({ message }: SecretMessagePageProps) {
  const measureRef = useRef<HTMLDivElement>(null);
  const [boxHeight, setBoxHeight] = useState(200);
  const boxWidth = 320;

  useLayoutEffect(() => {
    if (measureRef.current) {
      const measured = measureRef.current.scrollHeight + 48;
      setBoxHeight(Math.max(200, measured));
    }
  }, [message]);

  return (
    <div className="w-full max-w-lg mx-auto px-6 py-12 flex flex-col items-center">
      {/* Hidden element to measure text height */}
      <div
        ref={measureRef}
        className="font-handwritten text-base md:text-lg leading-relaxed text-center"
        style={{ width: boxWidth - 48, position: 'absolute', visibility: 'hidden' }}
        aria-hidden="true"
      >
        {message}
      </div>

      <div className="flex items-center gap-2 mb-2 animate-fade-in-up">
        <PixelHeart size={14} color="#E63946" />
        <h2 className="font-handwritten text-3xl text-ink-dark">
          A Secret Message
        </h2>
        <PixelHeart size={14} color="#E63946" />
      </div>
      <p className="font-pixel text-[8px] text-ink-faded mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        Use your finger or mouse to scratch
      </p>

      <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <ScratchReveal
          width={boxWidth}
          height={boxHeight}
          coverColor="#C0C0C0"
          className="rounded-xl shadow-lg overflow-hidden"
        >
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pixel-pink/10 to-pixel-red/10 p-6">
            <p className="font-handwritten text-base md:text-lg text-pixel-red text-center leading-relaxed">
              {message}
            </p>
          </div>
        </ScratchReveal>
      </div>
    </div>
  );
}
