# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Valentine's Day Website Generator — a full-stack web app where users create personalized, interactive Valentine's websites. Each site gets a unique subdomain (e.g., `abc123.lovefor.you`) with a nostalgic scrapbook + pixel art aesthetic.

**Flow:** Creator fills form → unique link generated → partner opens link → interactive love letter experience with envelope opening, typewriter text, flip cards, scratch reveal → "Will you be my Valentine?" with runaway "No" button → confetti celebration.

The project is currently in the **planning phase**. The architecture is defined in `valentine-technical-plan.md` but no source code has been written yet.

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite, Tailwind CSS, Framer Motion, Howler.js, canvas-confetti
- **Backend:** FastAPI (Python 3.11), SQLite, aiosqlite, nanoid
- **Hosting:** Vercel (frontend, wildcard subdomains) + Railway/Fly.io (backend)

## Development Commands

### Frontend
```bash
cd frontend
npm install
npm run dev          # Vite dev server at localhost:5173
npm run build        # Production build
npm run preview      # Preview production build
```

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload    # Dev server at localhost:8000
```

### Deploy
```bash
vercel --prod        # Frontend to Vercel
railway up           # Backend to Railway
```

## Architecture

### API Endpoints
```
POST   /api/sites              Create new valentine site (returns { id, url })
GET    /api/sites/{id}         Get site data for rendering
POST   /api/sites/{id}/view    Increment view count (async, non-blocking)
POST   /api/sites/{id}/accept  Mark "Yes" clicked (sets accepted_at)
GET    /api/health             Health check
```

### Frontend Routes
```
/              → Redirect to /create
/create        → CreateWizard (4-step form: names+message, photo, story, extras)
/preview/{id}  → PreviewPage (creator sees before sharing)
/v/{id}        → ValentineViewer (recipient scrapbook experience)
```

### Key Component Groups

- **`components/create/`** — Multi-step wizard: Step1Required (names + love message), Step2Photo, Step3Story, Step4Extras (reasons, song, pet name, secret message), SuccessScreen
- **`components/viewer/`** — Recipient experience: EnvelopeLanding → ScrapbookContainer with snap-scroll pages (Title, Photo, Story, Reasons flip cards, Song cassette player, AskPage with runaway button) → CelebrationOverlay
- **`components/ui/`** — Reusable: PaperTexture, PolaroidFrame, PixelHeart, FlipCard (3D CSS transform), ScratchReveal (canvas-based), RunawayButton, HandwrittenText (typewriter effect)
- **`hooks/`** — useTypewriter (char-by-char reveal), useScratch (canvas scratch logic), useSound (Howler.js wrapper)

### Data Model

Sites table uses nanoid (8 chars) as primary key. Required fields: creator_name, partner_name, love_message. Optional: photo_base64 (max 2MB), photo_caption, how_we_met, favorite_memory, reasons (JSON array, max 6), song_url (Spotify/YouTube), pet_name, secret_message. All data expires Feb 15 via `expires_at` column.

### Design System

- **Fonts:** Caveat (handwritten/love letters), Press Start 2P (pixel UI elements), Inter (form labels)
- **Colors:** paper-cream `#FDF6E3`, pixel-pink `#FF6B9D`, pixel-red `#E63946`, ink-dark `#2D3436`
- **Textures:** cream paper, craft paper, lined notebook backgrounds
- **Sound effects:** envelope-open, page-turn, card-flip, scratch, button-hover, victory (8-bit fanfare)

### Key Interaction Patterns

- **RunawayButton:** On hover/touch, moves to random viewport position. After 3 attempts shrinks. Text changes: "No" → "Maybe?" → "Fine..." → "OK OK" → disappears. "Yes" button is slightly magnetic.
- **ScratchReveal:** Canvas with `globalCompositeOperation: 'destination-out'`. Auto-reveals at 60% scratched. Coin cursor on hover.
- **FlipCard:** CSS `perspective: 1000px` + `rotateY(180deg)` with `preserve-3d`. One-way flip (front shows pixel heart + number, back shows reason text).
- **Typewriter:** Character-by-character with configurable speed, tap to skip.

### Subdomain Routing

Wildcard DNS points `*.domain.com` to Vercel. `vercel.json` rewrites subdomain IDs to `/v/{id}` route.
