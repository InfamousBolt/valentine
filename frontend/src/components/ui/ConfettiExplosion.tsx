import { useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiExplosionProps {
  active?: boolean;
}

export default function ConfettiExplosion({ active = true }: ConfettiExplosionProps) {
  const fireConfetti = useCallback(() => {
    // Heart-shaped confetti
    const heart = confetti.shapeFromPath({
      path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
    });

    // First burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      shapes: [heart, 'circle'],
      colors: ['#FF6B9D', '#E63946', '#FF8A80', '#FFF59D', '#FF69B4'],
    });

    // Delayed side bursts
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        shapes: [heart, 'circle'],
        colors: ['#FF6B9D', '#E63946', '#FF8A80'],
      });
    }, 200);

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        shapes: [heart, 'circle'],
        colors: ['#FF6B9D', '#E63946', '#FF8A80'],
      });
    }, 400);
  }, []);

  useEffect(() => {
    if (active) {
      fireConfetti();
      // Extra burst after a moment
      const timer = setTimeout(fireConfetti, 1500);
      return () => clearTimeout(timer);
    }
  }, [active, fireConfetti]);

  return null;
}
