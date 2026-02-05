import type { ReactNode } from 'react';

interface PolaroidFrameProps {
  rotation?: number;
  caption?: string;
  children: ReactNode;
  className?: string;
}

export default function PolaroidFrame({ rotation = 0, caption, children, className = '' }: PolaroidFrameProps) {
  return (
    <div
      className={`inline-block bg-white p-3 pb-12 shadow-lg relative ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Tape decoration */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-tape-yellow/70 rotate-[-2deg] z-10" />

      {/* Photo container */}
      <div className="w-full aspect-square overflow-hidden bg-paper-lined">
        {children}
      </div>

      {/* Caption */}
      {caption && (
        <p className="font-handwritten text-lg text-center mt-2 text-handwritten absolute bottom-2 left-0 right-0 px-3 truncate">
          {caption}
        </p>
      )}
    </div>
  );
}
