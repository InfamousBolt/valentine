import { useState, useEffect } from 'react';
import PixelHeart from './PixelHeart';

interface ScrollIndicatorProps {
  className?: string;
}

export default function ScrollIndicator({ className = '' }: ScrollIndicatorProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 transition-opacity duration-1000 ${
        visible ? 'opacity-70' : 'opacity-0'
      } pointer-events-none ${className}`}
    >
      <p className="font-pixel text-[7px] text-ink-faded">scroll down</p>
      <div className="animate-bounce-gentle">
        <PixelHeart size={12} color="#FF6B9D" />
      </div>
      <svg
        width="16"
        height="10"
        viewBox="0 0 16 10"
        className="text-ink-faded animate-bounce-gentle"
        style={{ animationDelay: '0.15s' }}
      >
        <path
          d="M2 2L8 8L14 2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
