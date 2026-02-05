import { useRef, useState, useEffect, useCallback } from 'react';

interface ScratchRevealProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
  coverColor?: string;
  revealThreshold?: number;
  onReveal?: () => void;
  className?: string;
}

export default function ScratchReveal({
  children,
  width = 300,
  height = 200,
  coverColor = '#C0C0C0',
  revealThreshold = 60,
  onReveal,
  className = '',
}: ScratchRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isScratching = useRef(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = coverColor;
    ctx.fillRect(0, 0, width, height);

    // Add "Scratch me!" text
    ctx.fillStyle = '#888';
    ctx.font = '16px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch me!', width / 2, height / 2);
  }, [width, height, coverColor]);

  const getPosition = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = width / rect.width;
    const scaleY = height / rect.height;

    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const scratch = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  const checkReveal = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, width, height);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++;
    }
    const percent = (transparent / (width * height)) * 100;

    if (percent >= revealThreshold) {
      setRevealed(true);
      onReveal?.();
    }
  }, [width, height, revealThreshold, onReveal, revealed]);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    isScratching.current = true;
    const pos = getPosition(e);
    scratch(pos.x, pos.y);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isScratching.current) return;
    e.preventDefault();
    const pos = getPosition(e);
    scratch(pos.x, pos.y);
  };

  const handleEnd = () => {
    isScratching.current = false;
    checkReveal();
  };

  return (
    <div className={`relative inline-block ${className}`} style={{ width, height }}>
      <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
        {children}
      </div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${revealed ? 'opacity-0 pointer-events-none' : ''}`}
        style={{ cursor: revealed ? 'default' : 'grab', touchAction: 'none' }}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      />
    </div>
  );
}
