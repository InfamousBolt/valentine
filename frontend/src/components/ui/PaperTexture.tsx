import type { ReactNode } from 'react';

interface PaperTextureProps {
  variant?: 'cream' | 'craft' | 'lined';
  className?: string;
  children: ReactNode;
}

const variants = {
  cream: 'bg-paper-cream',
  craft: 'bg-paper-craft',
  lined: 'bg-paper-lined',
};

export default function PaperTexture({ variant = 'cream', className = '', children }: PaperTextureProps) {
  return (
    <div className={`${variants[variant]} relative ${className}`}>
      {/* Subtle paper grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
