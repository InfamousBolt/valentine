import { useTypewriter } from '../../hooks/useTypewriter';

interface HandwrittenTextProps {
  text: string;
  typewriter?: boolean;
  speed?: number;
  className?: string;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'span' | 'div';
  onComplete?: () => void;
  onSkip?: () => void;
}

export default function HandwrittenText({
  text,
  typewriter = false,
  speed = 50,
  className = '',
  as: Tag = 'p',
  onComplete,
  onSkip,
}: HandwrittenTextProps) {
  const { displayedText, isComplete, skip } = useTypewriter({
    text,
    speed: typewriter ? speed : 0,
    onComplete,
  });

  const handleClick = () => {
    if (typewriter && !isComplete) {
      skip();
      onSkip?.();
    }
  };

  return (
    <Tag
      className={`font-handwritten ${className}`}
      onClick={handleClick}
      style={typewriter && !isComplete ? { cursor: 'pointer' } : undefined}
    >
      {typewriter ? displayedText : text}
      {typewriter && !isComplete && (
        <span className="animate-cursor inline-block w-[2px] h-[1em] bg-ink-dark ml-[2px] align-text-bottom" />
      )}
    </Tag>
  );
}
