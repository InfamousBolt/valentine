import PixelHeart from '../ui/PixelHeart';

interface StepIndicatorProps {
  current: number;
  total: number;
}

const stepLabels = ['Details', 'Photo', 'Story', 'Extras'];

export default function StepIndicator({ current, total }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-1 md:gap-2 mb-6 flex-wrap">
      {Array.from({ length: total }, (_, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === current;
        const isDone = stepNum < current;

        return (
          <div key={i} className="flex items-center gap-1 md:gap-2">
            <div
              className={`flex items-center gap-1.5 px-2 md:px-3 py-1.5 border-2 transition-all ${
                isActive
                  ? 'bg-neon-magenta/10 border-neon-magenta text-neon-magenta shadow-[0_0_12px_rgba(255,0,255,0.3)]'
                  : isDone
                    ? 'bg-pixel-red/10 border-pixel-red/40 text-pixel-red'
                    : 'bg-transparent border-gray-700 text-gray-600'
              }`}
            >
              <PixelHeart
                size={14}
                color={isActive ? '#FF00FF' : isDone ? '#E63946' : '#444'}
                filled={isDone || isActive}
              />
              <span className="font-pixel text-[7px] md:text-[8px]">
                {stepLabels[i]}
              </span>
            </div>
            {i < total - 1 && (
              <div className={`w-3 md:w-6 h-[2px] ${isDone ? 'bg-pixel-red' : 'bg-gray-700'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
