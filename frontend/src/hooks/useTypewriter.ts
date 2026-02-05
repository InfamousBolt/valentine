import { useState, useEffect, useCallback, useRef } from 'react';

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  startDelay?: number;
  onComplete?: () => void;
}

export function useTypewriter({
  text,
  speed = 50,
  startDelay = 0,
  onComplete,
}: UseTypewriterOptions) {
  const [displayedText, setDisplayedText] = useState(speed === 0 ? text : '');
  const [isComplete, setIsComplete] = useState(speed === 0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (speed === 0) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    let index = 0;
    let interval: ReturnType<typeof setInterval>;

    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          onCompleteRef.current?.();
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  const skip = useCallback(() => {
    setDisplayedText(text);
    setIsComplete(true);
    onCompleteRef.current?.();
  }, [text]);

  return { displayedText, isComplete, skip };
}
