import { useState, useEffect, useRef } from 'react';

interface FileTransferDialogProps {
  partnerName: string;
  onComplete: () => void;
}

export default function FileTransferDialog({ partnerName, onComplete }: FileTransferDialogProps) {
  const [progress, setProgress] = useState(0);
  const [fileIndex, setFileIndex] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const fileName = 'love_letter.zip';
  const totalSize = 14.2; // MB
  const transferredSize = +(totalSize * (progress / 100)).toFixed(2);

  const transferRates = ['69 KB/sec', '143 KB/sec', '420 KB/sec', '214 KB/sec', '333 KB/sec'];
  const rateIndex = Math.floor(progress / 20) % transferRates.length;

  const done = progress >= 100;

  const estimatedTimeLeft = done
    ? '0 sec'
    : progress > 80
      ? '~1 sec'
      : progress > 50
        ? '~3 sec'
        : progress > 20
          ? '~5 sec'
          : '~8 sec';

  // Simulate progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Variable speed - slow around 40-60%, fast at start/end
        const speed = prev > 35 && prev < 65 ? 0.4 + Math.random() * 0.6 : 1.2 + Math.random() * 1.8;
        return Math.min(prev + speed, 100);
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  // Cycle file animation index
  useEffect(() => {
    if (done) return;
    const interval = setInterval(() => {
      setFileIndex((prev) => (prev + 1) % 4);
    }, 300);
    return () => clearInterval(interval);
  }, [done]);

  // Handle completion — ref avoids stale-closure / cleanup issues
  useEffect(() => {
    if (!done) return;
    const timer = setTimeout(() => onCompleteRef.current(), 800);
    return () => clearTimeout(timer);
  }, [done]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Window */}
      <div
        className="w-full max-w-[420px] select-none"
        style={{
          background: '#C0C0C0',
          border: '2px solid',
          borderColor: '#FFFFFF #808080 #808080 #FFFFFF',
          boxShadow: '1px 1px 0 0 #000',
          fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", Tahoma, Geneva, sans-serif',
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between px-[3px] py-[2px]"
          style={{
            background: 'linear-gradient(90deg, #000080 0%, #1084d0 100%)',
          }}
        >
          <span className="text-white text-[11px] font-bold truncate px-1" style={{ fontFamily: 'inherit' }}>
            {Math.floor(progress)}% of {fileName} Completed
          </span>
          <div className="flex gap-[2px] shrink-0">
            <button
              className="w-[16px] h-[14px] text-[10px] leading-none flex items-center justify-center"
              style={{
                background: '#C0C0C0',
                border: '1px solid',
                borderColor: '#FFFFFF #808080 #808080 #FFFFFF',
                fontFamily: 'inherit',
              }}
            >
              _
            </button>
            <button
              className="w-[16px] h-[14px] text-[10px] leading-none flex items-center justify-center"
              style={{
                background: '#C0C0C0',
                border: '1px solid',
                borderColor: '#FFFFFF #808080 #808080 #FFFFFF',
                fontFamily: 'inherit',
              }}
            >
              x
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3" style={{ fontSize: '11px' }}>
          {/* File flying animation */}
          <div className="flex items-center justify-center gap-4 py-3">
            {/* Source - Love letter / heart */}
            <div className="w-10 h-10 flex items-center justify-center">
              <HeartIcon />
            </div>

            {/* Flying files */}
            <div className="relative w-24 h-8 overflow-hidden">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute top-0"
                  style={{
                    left: `${((fileIndex + i) % 4) * 25}%`,
                    opacity: ((fileIndex + i) % 4) === 3 ? 0.3 : 0.7 + ((fileIndex + i) % 4) * 0.1,
                    transform: `translateY(${Math.sin(((fileIndex + i) % 4) * 1.2) * 6}px)`,
                    transition: 'left 0.25s linear, opacity 0.25s, transform 0.25s',
                  }}
                >
                  <FileIcon />
                </div>
              ))}
            </div>

            {/* Destination - Folder */}
            <div className="w-10 h-10 flex items-center justify-center">
              <FolderIcon />
            </div>
          </div>

          {/* Info text */}
          <div className="space-y-1">
            <p style={{ fontFamily: 'inherit' }}>Downloading love from the internet...</p>
            <p style={{ fontFamily: 'inherit' }}>
              {fileName} from cupid.{partnerName.toLowerCase().replace(/\s+/g, '')}.love
            </p>
          </div>

          {/* Progress bar */}
          <div>
            <div
              className="h-[18px] w-full"
              style={{
                border: '1px solid',
                borderColor: '#808080 #FFFFFF #FFFFFF #808080',
                padding: '2px',
                background: '#C0C0C0',
              }}
            >
              <div className="h-full relative overflow-hidden" style={{ width: `${Math.min(progress, 100)}%` }}>
                {/* Segmented blue blocks like Win95 */}
                <div className="h-full flex gap-[1px]">
                  {Array.from({ length: Math.ceil(progress / 3.5) }, (_, i) => (
                    <div
                      key={i}
                      className="h-full shrink-0"
                      style={{
                        width: '8px',
                        background: '#000080',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-[2px]" style={{ fontFamily: 'inherit' }}>
            <span>Estimated time left:</span>
            <span>{done ? 'Done!' : estimatedTimeLeft} ({transferredSize} MB of {totalSize} MB copied)</span>
            <span>Transfer rate:</span>
            <span>{done ? '---' : transferRates[rateIndex]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Pixel art icons ── */

function HeartIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Globe-like icon from the 90s but as a heart */}
      <rect x="8" y="4" width="4" height="4" fill="#E63946" />
      <rect x="12" y="4" width="4" height="4" fill="#E63946" />
      <rect x="16" y="4" width="4" height="4" fill="#E63946" />
      <rect x="20" y="4" width="4" height="4" fill="#E63946" />
      <rect x="4" y="8" width="4" height="4" fill="#E63946" />
      <rect x="8" y="8" width="4" height="4" fill="#FF6B9D" />
      <rect x="12" y="8" width="4" height="4" fill="#FF6B9D" />
      <rect x="16" y="8" width="4" height="4" fill="#E63946" />
      <rect x="20" y="8" width="4" height="4" fill="#FF6B9D" />
      <rect x="24" y="8" width="4" height="4" fill="#E63946" />
      <rect x="4" y="12" width="4" height="4" fill="#E63946" />
      <rect x="8" y="12" width="4" height="4" fill="#FF6B9D" />
      <rect x="12" y="12" width="4" height="4" fill="#E63946" />
      <rect x="16" y="12" width="4" height="4" fill="#E63946" />
      <rect x="20" y="12" width="4" height="4" fill="#E63946" />
      <rect x="24" y="12" width="4" height="4" fill="#E63946" />
      <rect x="8" y="16" width="4" height="4" fill="#E63946" />
      <rect x="12" y="16" width="4" height="4" fill="#E63946" />
      <rect x="16" y="16" width="4" height="4" fill="#E63946" />
      <rect x="20" y="16" width="4" height="4" fill="#E63946" />
      <rect x="12" y="20" width="4" height="4" fill="#E63946" />
      <rect x="16" y="20" width="4" height="4" fill="#E63946" />
      <rect x="16" y="24" width="4" height="4" fill="#E63946" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1H12L17 6V19H1V1Z" fill="#FFFFF0" stroke="#808080" strokeWidth="1" />
      <path d="M12 1L12 6H17" stroke="#808080" strokeWidth="1" fill="#C0C0C0" />
      <line x1="4" y1="9" x2="14" y2="9" stroke="#808080" strokeWidth="0.5" />
      <line x1="4" y1="11" x2="14" y2="11" stroke="#808080" strokeWidth="0.5" />
      <line x1="4" y1="13" x2="10" y2="13" stroke="#808080" strokeWidth="0.5" />
      {/* Small heart on the document */}
      <rect x="6" y="5" width="2" height="1" fill="#E63946" />
      <rect x="9" y="5" width="2" height="1" fill="#E63946" />
      <rect x="5" y="6" width="2" height="1" fill="#E63946" />
      <rect x="8" y="6" width="2" height="1" fill="#E63946" />
      <rect x="10" y="6" width="2" height="1" fill="#E63946" />
      <rect x="7" y="7" width="3" height="1" fill="#E63946" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Folder tab */}
      <path d="M2 6H14L16 2H2V6Z" fill="#FFC107" stroke="#996515" strokeWidth="0.5" />
      {/* Folder body */}
      <rect x="1" y="6" width="34" height="20" rx="1" fill="#FFD54F" stroke="#996515" strokeWidth="1" />
      {/* Folder front face */}
      <rect x="1" y="10" width="34" height="16" rx="1" fill="#FFCA28" stroke="#996515" strokeWidth="0.5" />
    </svg>
  );
}
