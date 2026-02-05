# 💌 Valentine's Day Website Generator — Technical Plan

## Project Overview

A web app where users create personalized, interactive Valentine's websites for their partners. Each site lives at a unique subdomain (`abc123.yourdomain.com`) and features a nostalgic scrapbook + pixel art aesthetic with playful micro-interactions.

**Core Experience:** Creator fills form → Generates unique link → Partner opens link → Interactive love letter experience → "Will you be my Valentine?" with runaway "No" button → Celebration

---

## Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend | React 18 + TypeScript + Vite | Fast dev, type safety, you know it well |
| Styling | Tailwind CSS + CSS animations | Rapid styling, custom animations for interactions |
| Backend | FastAPI (Python) | Learning it, fast to build, async support |
| Database | SQLite | Simple, no setup, data expires Feb 15 anyway |
| Storage | Base64 in DB | Single photo, keeps infra simple |
| Hosting | Vercel (FE) + Railway/Fly (BE) | Free tiers, easy deploys |
| Audio | Howler.js | Lightweight, handles 8-bit sound effects well |

---

## Data Model

### SQLite Schema

```sql
CREATE TABLE sites (
    id TEXT PRIMARY KEY,              -- nanoid (e.g., "x7k2m9p4")
    
    -- Required fields
    creator_name TEXT NOT NULL,
    partner_name TEXT NOT NULL,
    love_message TEXT NOT NULL,       -- Main love letter content
    
    -- Optional rich content
    photo_base64 TEXT,                -- Base64 encoded image
    photo_caption TEXT,
    how_we_met TEXT,
    favorite_memory TEXT,
    reasons TEXT,                     -- JSON array: ["reason1", "reason2", ...]
    song_url TEXT,                    -- Spotify/YouTube embed URL
    pet_name TEXT,                    -- What creator calls partner
    secret_message TEXT,              -- Hidden scratch reveal content
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    view_count INTEGER DEFAULT 0,
    accepted_at TIMESTAMP,            -- When partner clicked "Yes"
    
    -- Auto-cleanup
    expires_at TIMESTAMP DEFAULT '2025-02-15 23:59:59'
);

CREATE INDEX idx_expires ON sites(expires_at);
```

### Pydantic Models (FastAPI)

```python
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class SiteCreate(BaseModel):
    creator_name: str = Field(..., min_length=1, max_length=50)
    partner_name: str = Field(..., min_length=1, max_length=50)
    love_message: str = Field(..., min_length=1, max_length=2000)
    
    photo_base64: Optional[str] = None
    photo_caption: Optional[str] = Field(None, max_length=200)
    how_we_met: Optional[str] = Field(None, max_length=1000)
    favorite_memory: Optional[str] = Field(None, max_length=1000)
    reasons: Optional[List[str]] = Field(None, max_items=6)
    song_url: Optional[str] = None
    pet_name: Optional[str] = Field(None, max_length=30)
    secret_message: Optional[str] = Field(None, max_length=500)

class SiteResponse(BaseModel):
    id: str
    creator_name: str
    partner_name: str
    love_message: str
    photo_base64: Optional[str]
    photo_caption: Optional[str]
    how_we_met: Optional[str]
    favorite_memory: Optional[str]
    reasons: Optional[List[str]]
    song_url: Optional[str]
    pet_name: Optional[str]
    secret_message: Optional[str]
    view_count: int
    accepted: bool

class SiteCreated(BaseModel):
    id: str
    url: str
```

### TypeScript Types (Frontend)

```typescript
interface ValentineSite {
  id: string;
  
  // Required
  creatorName: string;
  partnerName: string;
  loveMessage: string;
  
  // Optional
  photoBase64?: string;
  photoCaption?: string;
  howWeMet?: string;
  favoriteMemory?: string;
  reasons?: string[];
  songUrl?: string;
  petName?: string;
  secretMessage?: string;
  
  // Meta
  viewCount: number;
  accepted: boolean;
}

interface CreateSitePayload {
  creatorName: string;
  partnerName: string;
  loveMessage: string;
  photoBase64?: string;
  photoCaption?: string;
  howWeMet?: string;
  favoriteMemory?: string;
  reasons?: string[];
  songUrl?: string;
  petName?: string;
  secretMessage?: string;
}
```

---

## API Endpoints

### FastAPI Routes

```
POST   /api/sites              Create new valentine site
GET    /api/sites/{id}         Get site data for rendering
POST   /api/sites/{id}/view    Increment view count (fire-and-forget)
POST   /api/sites/{id}/accept  Mark site as "accepted" (Yes clicked)
GET    /api/health             Health check
```

### Endpoint Details

#### `POST /api/sites`
- **Input:** `SiteCreate` payload
- **Process:** 
  - Generate nanoid (8 chars)
  - Validate photo size if present (max 2MB base64)
  - Parse and validate song URL (Spotify/YouTube only)
  - Insert into SQLite
- **Output:** `{ id: "x7k2m9p4", url: "https://x7k2m9p4.lovefor.you" }`

#### `GET /api/sites/{id}`
- **Input:** Site ID from URL
- **Process:** Fetch from DB, check expiry
- **Output:** Full `SiteResponse` or 404

#### `POST /api/sites/{id}/view`
- **Input:** Site ID
- **Process:** `UPDATE sites SET view_count = view_count + 1 WHERE id = ?`
- **Output:** `{ success: true }` (async, non-blocking)

#### `POST /api/sites/{id}/accept`
- **Input:** Site ID
- **Process:** `UPDATE sites SET accepted_at = NOW() WHERE id = ?`
- **Output:** `{ success: true }`

---

## Frontend Architecture

### Route Structure

```
/                    → Redirect to /create
/create              → CreateWizard (multi-step form)
/preview/{id}        → PreviewPage (creator sees before sharing)
/v/{id}              → ValentineViewer (recipient experience)
```

### Component Tree

```
src/
├── main.tsx
├── App.tsx                      # Router setup
├── api/
│   └── client.ts                # API calls (fetch wrapper)
├── pages/
│   ├── CreatePage.tsx           # Wizard container
│   ├── PreviewPage.tsx          # Creator preview
│   └── ViewerPage.tsx           # Recipient experience
├── components/
│   ├── create/
│   │   ├── CreateWizard.tsx     # Step management
│   │   ├── StepIndicator.tsx    # Pixel heart progress
│   │   ├── Step1Required.tsx    # Names + love message
│   │   ├── Step2Photo.tsx       # Photo upload + caption
│   │   ├── Step3Story.tsx       # How we met, favorite memory
│   │   ├── Step4Extras.tsx      # Reasons, song, pet name, secret
│   │   └── SuccessScreen.tsx    # Link + share buttons
│   ├── viewer/
│   │   ├── EnvelopeLanding.tsx  # Sealed envelope, tap to open
│   │   ├── ScrapbookContainer.tsx
│   │   ├── pages/
│   │   │   ├── TitlePage.tsx
│   │   │   ├── PhotoPage.tsx
│   │   │   ├── StoryPage.tsx
│   │   │   ├── ReasonsPage.tsx
│   │   │   ├── SongPage.tsx
│   │   │   └── AskPage.tsx      # The proposal + buttons
│   │   ├── CelebrationOverlay.tsx
│   │   └── MusicController.tsx
│   └── ui/
│       ├── PaperTexture.tsx     # Background wrapper
│       ├── PolaroidFrame.tsx    # Photo container
│       ├── PixelHeart.tsx       # Reusable pixel art heart
│       ├── HandwrittenText.tsx  # Font + typewriter effect
│       ├── FlipCard.tsx         # Tap to flip interaction
│       ├── ScratchReveal.tsx    # Canvas-based scratch off
│       ├── RunawayButton.tsx    # The "No" button that runs
│       ├── ConfettiExplosion.tsx
│       └── PixelCassette.tsx    # Song player UI
├── hooks/
│   ├── useTypewriter.ts         # Typewriter animation hook
│   ├── useScratch.ts            # Scratch canvas logic
│   └── useSound.ts              # Howler.js wrapper
├── assets/
│   ├── fonts/
│   │   ├── handwritten.woff2    # e.g., Caveat, Indie Flower
│   │   └── pixel.woff2          # e.g., Press Start 2P
│   ├── sounds/
│   │   ├── envelope-open.mp3
│   │   ├── page-turn.mp3
│   │   ├── card-flip.mp3
│   │   ├── scratch.mp3
│   │   ├── button-hover.mp3
│   │   ├── victory.mp3          # 8-bit celebration
│   │   └── heartbeat.mp3
│   ├── textures/
│   │   ├── paper.png
│   │   ├── craft-paper.png
│   │   └── notebook.png
│   └── sprites/
│       ├── pixel-heart.png
│       ├── pixel-cupid.png
│       ├── pixel-arrow.png
│       └── wax-seal.png
└── styles/
    ├── globals.css
    └── animations.css           # Keyframe definitions
```

---

## Recipient Experience Flow (Detailed)

### 1. Envelope Landing (`EnvelopeLanding.tsx`)

**Visual:**
- Full-screen paper texture background
- Centered envelope with pixel art wax seal (heart shape)
- Handwritten text: "To: {partnerName}" on envelope
- Subtle floating pixel hearts in background
- "Tap to open" hint with pulsing animation

**Interaction:**
- On tap/click → Seal "breaks" animation
- Envelope flap opens upward
- Letter slides out and expands to fill screen
- **Sound:** `envelope-open.mp3`

**Implementation:**
```tsx
const [isOpening, setIsOpening] = useState(false);
const [isOpened, setIsOpened] = useState(false);

// CSS classes toggle based on state
// Use CSS transforms for envelope flap rotation
// Use spring animation (framer-motion) for letter emergence
```

### 2. Scrapbook Container (`ScrapbookContainer.tsx`)

**Visual:**
- Vertical scroll container
- Each "page" is a full viewport height section
- Craft paper texture background
- Torn edge effects between sections
- Subtle tape/pin decorations in corners

**Scroll Behavior:**
- Snap scrolling between sections (CSS scroll-snap)
- Elements animate in as they enter viewport
- Progress indicator (pixel hearts) on side

### 3. Title Page (`TitlePage.tsx`)

**Visual:**
- Large handwritten title: "To My Dearest {partnerName}"
- Subtitle: "From {creatorName}" or "From your {petName}" if provided
- Pixel art cupid in corner
- Date stamp: "Valentine's Day 2025"
- Decorative pixel hearts border

**Animation:**
- Text fades in with slight upward movement
- Decorations pop in sequentially

### 4. Photo Page (`PhotoPage.tsx`) — *Conditional*

**Visual:**
- Polaroid frame (white border, slight shadow, tape on top)
- Photo inside with slight rotation (-3° to 3°)
- Caption below in handwritten font
- Small pixel hearts as decorations

**Animation:**
- Polaroid "drops" into place from above
- Slight bounce on land
- **Sound:** Soft thud or tape sound

### 5. Story Page (`StoryPage.tsx`) — *Conditional*

**Visual:**
- Notebook paper texture (lined)
- "How We Met" as header (if present)
- Typewriter text effect for the story
- Small doodles in margins (pixel hearts, arrows)
- "Our Favorite Memory" section below (if present)

**Animation:**
- Typewriter effect reveals text character by character
- User can tap to skip and reveal all
- **Sound:** Soft typewriter clicks

### 6. Reasons Page (`ReasonsPage.tsx`) — *Conditional*

**Visual:**
- Header: "Reasons I Love You"
- Grid of flip cards (2 columns on mobile, 3 on desktop)
- Card fronts: Pixel heart with number (1, 2, 3...)
- Card backs: The actual reason text
- Max 6 reasons

**Animation:**
- Cards are initially face-down
- Tap to flip (3D rotate transform)
- **Sound:** `card-flip.mp3`

**Implementation:**
```tsx
const [flipped, setFlipped] = useState<Set<number>>(new Set());

// CSS perspective + rotateY transform
// Preserve-3d for proper 3D effect
```

### 7. Song Page (`SongPage.tsx`) — *Conditional*

**Visual:**
- Pixel art cassette tape or vinyl record
- "Our Song" label
- Play/pause button integrated into design
- Embedded Spotify/YouTube player (hidden, controlled via API)
- Animated equalizer bars when playing

**Interaction:**
- Tap cassette/vinyl to play/pause
- Cassette reels spin when playing
- **Sound:** Tape deck click on play/pause

### 8. Secret Message Page (`ScratchReveal.tsx`) — *Conditional*

**Visual:**
- Card with scratchable silver/gold overlay
- Text underneath: "Scratch to reveal a secret message"
- Coin cursor on hover
- Scratch particles fall as you scratch

**Implementation:**
- Canvas-based scratch effect
- `globalCompositeOperation: 'destination-out'`
- Track percentage scratched, auto-reveal at 60%
- **Sound:** `scratch.mp3` (looped while scratching)

```tsx
// Canvas setup
const canvas = useRef<HTMLCanvasElement>(null);
const isScratching = useRef(false);

// Mouse/touch move handler
const scratch = (x: number, y: number) => {
  const ctx = canvas.current?.getContext('2d');
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fill();
};
```

### 9. The Ask Page (`AskPage.tsx`)

**Visual:**
- Large handwritten text: "{partnerName}, will you be my Valentine?"
- Two buttons: "Yes! 💕" and "No"
- Paper texture background
- Pixel hearts border

**The Runaway "No" Button:**

```tsx
const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
const [noScale, setNoScale] = useState(1);
const [attempts, setAttempts] = useState(0);

const handleNoHover = () => {
  // Calculate new random position within viewport bounds
  const maxX = window.innerWidth - 100;
  const maxY = window.innerHeight - 50;
  
  setNoPosition({
    x: Math.random() * maxX,
    y: Math.random() * maxY
  });
  
  setAttempts(prev => prev + 1);
  
  // After 3 attempts, button shrinks
  if (attempts > 3) {
    setNoScale(prev => Math.max(0.3, prev - 0.15));
  }
  
  // After 5 attempts, button text changes
  // "No" → "Maybe?" → "Fine..." → "OK OK" → disappears
  
  playSound('button-hover');
};

// Button styles
<button
  style={{
    position: attempts > 0 ? 'fixed' : 'relative',
    left: noPosition.x,
    top: noPosition.y,
    transform: `scale(${noScale})`,
    transition: 'all 0.2s ease-out'
  }}
  onMouseEnter={handleNoHover}
  onTouchStart={handleNoHover}
>
  {getNoButtonText(attempts)}
</button>
```

**"Yes" Button Behavior:**
- Slightly magnetic (moves toward cursor when close)
- Grows slightly on hover
- On click → Trigger celebration

### 10. Celebration Overlay (`CelebrationOverlay.tsx`)

**Visual:**
- Full-screen overlay
- Confetti explosion (mix of pixel hearts + paper confetti)
- Large text: "It's Official! 💕" or custom celebration message
- Fireworks/sparkle animations
- "Share this love story" button

**Animation:**
- **Sound:** `victory.mp3` (8-bit celebration fanfare)
- Confetti library: `canvas-confetti` or custom
- Text bounces in with spring animation

---

## Interactive Components — Implementation Details

### Typewriter Effect (`useTypewriter.ts`)

```typescript
import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
  text: string;
  speed?: number;        // ms per character
  startDelay?: number;
  onComplete?: () => void;
}

export function useTypewriter({ 
  text, 
  speed = 50, 
  startDelay = 0,
  onComplete 
}: UseTypewriterOptions) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsStarted(true);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [startDelay]);

  useEffect(() => {
    if (!isStarted) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, isStarted, onComplete]);

  const skip = () => {
    setDisplayedText(text);
    setIsComplete(true);
  };

  return { displayedText, isComplete, skip };
}
```

### Sound Manager (`useSound.ts`)

```typescript
import { Howl } from 'howler';
import { useCallback, useEffect, useRef } from 'react';

const sounds = {
  envelopeOpen: '/sounds/envelope-open.mp3',
  pageTurn: '/sounds/page-turn.mp3',
  cardFlip: '/sounds/card-flip.mp3',
  scratch: '/sounds/scratch.mp3',
  buttonHover: '/sounds/button-hover.mp3',
  victory: '/sounds/victory.mp3',
};

type SoundName = keyof typeof sounds;

export function useSound() {
  const howls = useRef<Map<SoundName, Howl>>(new Map());
  const muted = useRef(false);

  useEffect(() => {
    // Preload all sounds
    Object.entries(sounds).forEach(([name, src]) => {
      howls.current.set(name as SoundName, new Howl({ 
        src: [src],
        preload: true,
        volume: 0.5
      }));
    });

    return () => {
      howls.current.forEach(howl => howl.unload());
    };
  }, []);

  const play = useCallback((name: SoundName) => {
    if (muted.current) return;
    howls.current.get(name)?.play();
  }, []);

  const toggleMute = useCallback(() => {
    muted.current = !muted.current;
    return muted.current;
  }, []);

  return { play, toggleMute };
}
```

### Flip Card Component (`FlipCard.tsx`)

```tsx
import { useState } from 'react';
import { useSound } from '../hooks/useSound';

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}

export function FlipCard({ front, back, className }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { play } = useSound();

  const handleFlip = () => {
    if (!isFlipped) {
      play('cardFlip');
      setIsFlipped(true);
    }
  };

  return (
    <div 
      className={`flip-card ${className}`}
      onClick={handleFlip}
      style={{ perspective: '1000px' }}
    >
      <div 
        className="flip-card-inner"
        style={{
          transition: 'transform 0.6s',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'
        }}
      >
        <div className="flip-card-front" style={{ backfaceVisibility: 'hidden' }}>
          {front}
        </div>
        <div 
          className="flip-card-back" 
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        >
          {back}
        </div>
      </div>
    </div>
  );
}
```

---

## Visual Design Specifications

### Color Palette

```css
:root {
  /* Paper/Background */
  --paper-cream: #FDF6E3;
  --paper-craft: #E8D4B8;
  --paper-lined: #F5F5F5;
  
  /* Pixel Art Accents */
  --pixel-pink: #FF6B9D;
  --pixel-red: #E63946;
  --pixel-coral: #FF8A80;
  
  /* Text */
  --ink-dark: #2D3436;
  --ink-faded: #636E72;
  --handwritten: #4A4A4A;
  
  /* UI */
  --button-yes: #4CAF50;
  --button-no: #E57373;
  --tape-yellow: #FFF59D;
}
```

### Typography

```css
/* Handwritten - for love messages, titles */
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');

/* Pixel - for UI elements, numbers, accents */
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

/* Body - for form labels, instructions */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

.handwritten {
  font-family: 'Caveat', cursive;
}

.pixel {
  font-family: 'Press Start 2P', cursive;
  font-size: 0.75rem; /* Pixel fonts need smaller size */
}
```

### Textures & Assets Needed

1. **Paper Textures (create or find free)**
   - Cream paper (subtle grain)
   - Craft/kraft paper (brown, slightly rough)
   - Lined notebook paper

2. **Pixel Art (create in Aseprite or Piskel)**
   - Heart (16x16, 32x32 versions)
   - Cupid/angel
   - Arrow through heart
   - Wax seal
   - Cassette tape
   - Confetti pieces

3. **UI Elements**
   - Tape strips (transparent PNG)
   - Polaroid frame
   - Torn paper edges
   - Doodle elements (small hearts, stars, arrows)

4. **Sound Effects (find on freesound.org or create)**
   - Envelope opening (paper rustle)
   - Page turn
   - Card flip
   - Scratch sound (loopable)
   - 8-bit button hover beep
   - 8-bit victory fanfare

---

## Deployment & Infrastructure

### Domain & Subdomains

**Recommended:** Purchase a cute domain like:
- `lovefor.you`
- `bemyvalentine.love`
- `valentine.cards`
- `loveletters.to`

**Wildcard Subdomain Setup (Vercel):**

1. Add wildcard DNS record: `*.yourdomain.com → CNAME to cname.vercel-dns.com`
2. In `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/:path*",
      "has": [
        {
          "type": "host",
          "value": "(?<id>[a-z0-9]+)\\.yourdomain\\.com"
        }
      ],
      "destination": "/v/:id"
    }
  ]
}
```

### Backend Deployment (Railway)

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Environment Variables:**
```
DATABASE_URL=sqlite:///./valentine.db
CORS_ORIGINS=https://yourdomain.com,https://*.yourdomain.com
```

### Auto-Cleanup Cron

Set up a daily cron (Railway cron jobs or external) to delete expired sites:

```python
# cleanup.py
import sqlite3
from datetime import datetime

def cleanup_expired():
    conn = sqlite3.connect('valentine.db')
    cursor = conn.cursor()
    cursor.execute(
        "DELETE FROM sites WHERE expires_at < ?",
        (datetime.now().isoformat(),)
    )
    deleted = cursor.rowcount
    conn.commit()
    conn.close()
    print(f"Cleaned up {deleted} expired sites")

if __name__ == "__main__":
    cleanup_expired()
```

---

## Build Plan: 2.5 Days

### Day 1: Foundation + Creator Flow

| Time | Task | Deliverable |
|------|------|-------------|
| Morning (3h) | Project setup | Vite + React + TS scaffolded, Tailwind configured, FastAPI boilerplate, SQLite schema created |
| Midday (2h) | API endpoints | All 4 endpoints working (`POST /sites`, `GET /sites/:id`, `POST /view`, `POST /accept`) |
| Afternoon (3h) | Creator wizard UI | All 4 steps of form working, validation, state management |
| Evening (2h) | Success screen + link generation | Copy link working, basic share buttons, preview link |

**Day 1 Checkpoint:** Creator can fill form and get a working link. Link shows raw JSON data (no styling yet).

### Day 2: Recipient Experience (The Magic)

| Time | Task | Deliverable |
|------|------|-------------|
| Morning (3h) | Envelope landing + Scrapbook container | Envelope animation working, scroll snap container, paper textures applied |
| Midday (3h) | Content pages | Title, Photo, Story, Reasons pages rendering with basic styling |
| Afternoon (3h) | Core interactions | Typewriter effect, flip cards, runaway button all working |
| Evening (2h) | Celebration + Song player | Confetti explosion, victory sound, Spotify/YouTube embed |

**Day 2 Checkpoint:** Full recipient experience working end-to-end. May be rough around edges but functional.

### Day 3: Polish + Deploy

| Time | Task | Deliverable |
|------|------|-------------|
| Morning (3h) | Scratch reveal + Sound effects | Scratch canvas working, all sounds integrated and playing |
| Midday (2h) | Mobile responsiveness | Test on real devices, fix any layout issues, touch interactions verified |
| Afternoon (2h) | Visual polish | Final pixel art assets, animations tuned, loading states |
| Evening (2h) | Deploy + DNS | Vercel frontend live, Railway backend live, wildcard subdomain working |

**Day 3 Checkpoint:** Production-ready. Send to a friend to test.

---

## Post-Launch (Feb 8-14)

- Monitor error logs
- Watch for any viral spread
- Quick fixes only, no new features
- Share on social, HN, Product Hunt (optional)

---

## Future Enhancements (V2, post-Valentine's)

- Multiple templates/themes
- Custom domain support
- Creator analytics (view count, time spent, etc.)
- Music integration improvements (Spotify auth for full playback)
- Save to camera roll / PDF export
- Social sharing cards (OG image generation)
- "Reply" feature — partner can send one back

---

## Quick Reference Commands

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install fastapi uvicorn python-multipart aiosqlite nanoid
uvicorn main:app --reload

# Deploy
vercel --prod                    # Frontend
railway up                       # Backend
```

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Photo uploads too large | Enforce 2MB limit, compress on client side |
| Spam/abuse | Rate limit by IP (10 creates/hour), basic profanity filter optional |
| SQLite concurrency | Fine for this scale; if issues, switch to PostgreSQL |
| Sound not playing on mobile | Require user interaction first (tap envelope), defer audio init |
| Scratch effect laggy | Throttle canvas events, reduce brush size on mobile |

---

**You've got this, Keshav. Ship it! 🚀💕**
