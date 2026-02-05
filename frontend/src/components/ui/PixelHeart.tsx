interface PixelHeartProps {
  size?: number;
  color?: string;
  className?: string;
  filled?: boolean;
}

export default function PixelHeart({ size = 32, color = '#E63946', className = '', filled = true }: PixelHeartProps) {
  // 9x8 pixel heart grid
  const grid = [
    [0,1,1,0,0,0,1,1,0],
    [1,1,1,1,0,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
    [0,1,1,1,1,1,1,1,0],
    [0,0,1,1,1,1,1,0,0],
    [0,0,0,1,1,1,0,0,0],
    [0,0,0,0,1,0,0,0,0],
  ];

  return (
    <svg
      width={size}
      height={size * (8/9)}
      viewBox={`0 0 9 8`}
      className={className}
      style={{ imageRendering: 'pixelated' }}
    >
      {grid.map((row, y) =>
        row.map((cell, x) =>
          cell ? (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill={filled ? color : 'none'}
              stroke={filled ? 'none' : color}
              strokeWidth={0.15}
            />
          ) : null
        )
      )}
    </svg>
  );
}
