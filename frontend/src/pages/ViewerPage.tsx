import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getSite, recordView } from '../api/client';
import type { ValentineSite } from '../types/valentine';
import FileTransferDialog from '../components/viewer/FileTransferDialog';
import EnvelopeLanding from '../components/viewer/EnvelopeLanding';
import ScrapbookContainer from '../components/viewer/ScrapbookContainer';
import CelebrationOverlay from '../components/viewer/CelebrationOverlay';
import LoadingScreen from '../components/ui/LoadingScreen';
import ExpiredPage from '../components/viewer/ExpiredPage';
import DiscoBall from '../components/ui/DiscoBall';
import PixelHeart from '../components/ui/PixelHeart';

interface ViewerPageProps {
  isPreview?: boolean;
}

export default function ViewerPage({ isPreview = false }: ViewerPageProps) {
  const { id } = useParams<{ id: string }>();
  const [site, setSite] = useState<ValentineSite | null>(null);
  const [phase, setPhase] = useState<'loading' | 'downloading' | 'envelope' | 'scrapbook' | 'expired' | 'error'>('loading');
  const [showCelebration, setShowCelebration] = useState(false);

  const stars = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        x: ((i * 37 + 13) % 97) + 1,
        y: ((i * 53 + 7) % 97) + 1,
        size: 1 + (i % 3),
        delay: (i * 0.4) % 5,
        duration: 2 + (i % 4),
      })),
    [],
  );

  const floatingHearts = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        x: ((i * 23 + 5) % 90) + 5,
        size: 16 + (i % 4) * 8,
        delay: i * 1.5,
        duration: 8 + (i % 5) * 2,
      })),
    [],
  );

  useEffect(() => {
    if (!id) return;
    const keyFragment = window.location.hash.substring(1);
    if (!keyFragment) {
      setPhase('error');
      return;
    }
    getSite(id, keyFragment)
      .then((data) => {
        setSite(data);
        setPhase('downloading');
        if (!isPreview) recordView(id);
      })
      .catch((err) => {
        if (err.message === 'expired') {
          setPhase('expired');
        } else {
          setPhase('error');
        }
      });
  }, [id, isPreview]);

  if (phase === 'loading') return <LoadingScreen />;
  if (phase === 'expired') return <ExpiredPage />;
  if (phase === 'error') return (
    <div className="min-h-screen bg-paper-cream flex flex-col items-center justify-center px-4 text-center gap-4">
      <div className="opacity-50 animate-pulse-heart">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <path d="M32 56L8 32C2 26 2 16 8 10C14 4 24 4 30 10L32 12L34 10C40 4 50 4 56 10C62 16 62 26 56 32L32 56Z" stroke="#ccc" strokeWidth="3" fill="none" strokeDasharray="4 4" />
        </svg>
      </div>
      <h1 className="font-handwritten text-3xl text-ink-faded">Valentine not found</h1>
      <p className="text-ink-faded text-sm max-w-xs">
        This love letter seems to have gotten lost. It may have been removed or the link might be incorrect.
      </p>
      <a
        href="/create"
        className="mt-4 bg-pixel-pink text-white font-pixel text-[10px] px-6 py-3 rounded-lg hover:bg-pixel-red transition-colors shadow-md"
      >
        Create Your Own
      </a>
    </div>
  );
  if (!site) return null;

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a1a 0%, #0d0520 50%, #0a0a1a 100%)',
      }}
    >
      {/* Stars */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-twinkle pointer-events-none"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {/* Floating pixel hearts */}
      {floatingHearts.map((heart, i) => (
        <div
          key={`heart-${i}`}
          className="absolute animate-float-up pointer-events-none"
          style={{
            left: `${heart.x}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          <PixelHeart size={heart.size} color="#E63946" />
        </div>
      ))}

      {/* Disco ball */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <DiscoBall size={70} />
      </div>

      {/* Phase content */}
      <div className="relative z-20 min-h-screen">
        {phase === 'downloading' && (
          <FileTransferDialog
            partnerName={site.petName || site.partnerName}
            onComplete={() => setPhase('envelope')}
          />
        )}
        {phase === 'envelope' && (
          <EnvelopeLanding
            partnerName={site.petName || site.partnerName}
            onOpen={() => setPhase('scrapbook')}
          />
        )}
        {phase === 'scrapbook' && (
          <ScrapbookContainer
            site={site}
            onAccept={() => setShowCelebration(true)}
          />
        )}
        {showCelebration && (
          <CelebrationOverlay
            partnerName={site.petName || site.partnerName}
            siteId={site.id}
          />
        )}
      </div>
    </div>
  );
}
