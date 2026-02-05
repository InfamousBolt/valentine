import { useRef, useState, useCallback } from 'react';

interface UseScratchOptions {
  width: number;
  height: number;
  brushSize?: number;
  revealThreshold?: number;
  onReveal?: () => void;
}

export function useScratch({
  width,
  height,
  brushSize = 20,
  revealThreshold = 60,
  onReveal,
}: UseScratchOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isScratching = useRef(false);
  const [percentScratched, setPercentScratched] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const scratch = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();
  }, [brushSize, revealed]);

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
    setPercentScratched(percent);

    if (percent >= revealThreshold) {
      setRevealed(true);
      onReveal?.();
    }
  }, [width, height, revealThreshold, onReveal, revealed]);

  const startScratching = () => { isScratching.current = true; };
  const stopScratching = () => {
    isScratching.current = false;
    checkReveal();
  };

  return {
    canvasRef,
    isScratching,
    scratch,
    startScratching,
    stopScratching,
    percentScratched,
    revealed,
  };
}
