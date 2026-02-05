import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import PixelCassette from '../../ui/PixelCassette';

interface SongPageProps {
  songUrl: string;
}

function parseEmbedUrl(url: string): { type: 'spotify' | 'youtube' | null; embedUrl: string | null } {
  // Spotify
  const spotifyMatch = url.match(/open\.spotify\.com\/track\/([a-zA-Z0-9]+)/);
  if (spotifyMatch) {
    return {
      type: 'spotify',
      embedUrl: `https://open.spotify.com/embed/track/${spotifyMatch[1]}?utm_source=generator&theme=0`,
    };
  }

  // YouTube
  let videoId: string | null = null;
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
  if (ytMatch) videoId = ytMatch[1];

  const ytMusicMatch = url.match(/music\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
  if (ytMusicMatch) videoId = ytMusicMatch[1];

  if (videoId) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=0&enablejsapi=1`,
    };
  }

  return { type: null, embedUrl: null };
}

export default function SongPage({ songUrl }: SongPageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { type, embedUrl } = useMemo(() => parseEmbedUrl(songUrl), [songUrl]);
  const playerRef = useRef<any>(null);

  // Load YouTube IFrame API and bind player events
  useEffect(() => {
    if (type !== 'youtube') return;

    const initPlayer = () => {
      if (playerRef.current) return;
      playerRef.current = new (window as any).YT.Player('yt-song-player', {
        events: {
          onStateChange: (event: any) => {
            const YT = (window as any).YT;
            if (event.data === YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (
              event.data === YT.PlayerState.PAUSED ||
              event.data === YT.PlayerState.ENDED
            ) {
              setIsPlaying(false);
            }
          },
        },
      });
    };

    if ((window as any).YT?.Player) {
      initPlayer();
    } else {
      const prev = (window as any).onYouTubeIframeAPIReady;
      (window as any).onYouTubeIframeAPIReady = () => {
        prev?.();
        initPlayer();
      };
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(script);
      }
    }

    return () => {
      playerRef.current = null;
    };
  }, [type]);

  const handleToggle = useCallback(() => {
    if (type === 'youtube' && playerRef.current?.playVideo) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    } else {
      setIsPlaying(prev => !prev);
    }
  }, [type, isPlaying]);

  if (!embedUrl) return null;

  return (
    <div className="w-full max-w-lg mx-auto px-6 py-12 flex flex-col items-center">
      <h2 className="font-handwritten text-3xl text-ink-dark mb-8 animate-fade-in-up">
        Our Song
      </h2>

      <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <PixelCassette
          isPlaying={isPlaying}
          onToggle={handleToggle}
          label="Our Song"
        />
      </div>

      {/* Embedded player */}
      <div className="mt-8 w-full max-w-sm animate-fade-in-up rounded-lg overflow-hidden shadow-md" style={{ animationDelay: '0.4s' }}>
        {type === 'spotify' ? (
          <iframe
            src={embedUrl}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-lg"
          />
        ) : (
          <iframe
            id="yt-song-player"
            src={embedUrl}
            width="100%"
            height="200"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
        )}
      </div>
    </div>
  );
}
