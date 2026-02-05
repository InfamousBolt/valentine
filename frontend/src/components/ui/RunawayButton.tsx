import { useState, useCallback } from 'react';

interface RunawayButtonProps {
  onGiveUp?: () => void;
  className?: string;
}

const buttonTexts = ['No', 'Maybe?', 'Fine...', 'OK OK'];

export default function RunawayButton({ onGiveUp, className = '' }: RunawayButtonProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);
  const [scale, setScale] = useState(1);

  const handleHover = useCallback(() => {
    // Small random offset from original position — never causes scroll
    const range = 120;
    setOffset({
      x: (Math.random() - 0.5) * range * 2,
      y: (Math.random() - 0.5) * range,
    });

    setAttempts((prev) => {
      const next = prev + 1;
      if (next > 3) {
        setScale((s) => Math.max(0.3, s - 0.15));
      }
      if (next >= buttonTexts.length) {
        setTimeout(() => onGiveUp?.(), 300);
      }
      return next;
    });
  }, [onGiveUp]);

  if (attempts >= buttonTexts.length) return null;

  const text = buttonTexts[Math.min(attempts, buttonTexts.length - 1)];

  return (
    <button
      className={`bg-button-no text-white font-pixel text-xs px-6 py-3 rounded-lg transition-all duration-200 hover:bg-red-400 shadow-md ${className}`}
      style={{
        position: 'relative',
        left: offset.x,
        top: offset.y,
        transform: `scale(${scale})`,
        zIndex: 50,
      }}
      onMouseEnter={handleHover}
      onTouchStart={(e) => {
        e.preventDefault();
        handleHover();
      }}
    >
      {text}
    </button>
  );
}
