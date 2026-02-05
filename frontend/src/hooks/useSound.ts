import { useCallback, useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';

const soundPaths: Record<string, string> = {
  envelopeOpen: '/sounds/envelope-open.mp3',
  pageTurn: '/sounds/page-turn.mp3',
  cardFlip: '/sounds/card-flip.mp3',
  scratch: '/sounds/scratch.mp3',
  buttonHover: '/sounds/button-hover.mp3',
  victory: '/sounds/victory.mp3',
  heartbeat: '/sounds/heartbeat.mp3',
};

export type SoundName = keyof typeof soundPaths;

export function useSound() {
  const howls = useRef<Map<string, Howl>>(new Map());
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    Object.entries(soundPaths).forEach(([name, src]) => {
      howls.current.set(name, new Howl({
        src: [src],
        preload: true,
        volume: 0.5,
      }));
    });

    return () => {
      howls.current.forEach((howl) => howl.unload());
    };
  }, []);

  const play = useCallback((name: SoundName) => {
    if (muted) return;
    howls.current.get(name)?.play();
  }, [muted]);

  const toggleMute = useCallback(() => {
    setMuted((m) => !m);
  }, []);

  return { play, muted, toggleMute };
}
