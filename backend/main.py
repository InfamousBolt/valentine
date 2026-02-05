import json
import os
from collections import defaultdict
from contextlib import asynccontextmanager
from time import time

from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from nanoid import generate

import aiosqlite
from database import init_db, get_db, DATABASE_PATH
from models import SiteCreate, SiteResponse, SiteCreated

DOMAIN = os.getenv("DOMAIN", "localhost:5173")
RATE_LIMIT = int(os.getenv("RATE_LIMIT", "10"))  # creates per hour per IP

# Simple in-memory rate limiter
rate_limit_store: dict[str, list[float]] = defaultdict(list)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(title="Valentine API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:5173").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def check_rate_limit(ip: str):
    now = time()
    hour_ago = now - 3600
    # Clean old entries
    rate_limit_store[ip] = [t for t in rate_limit_store[ip] if t > hour_ago]
    if len(rate_limit_store[ip]) >= RATE_LIMIT:
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Try again later.")
    rate_limit_store[ip].append(now)


@app.post("/api/sites", response_model=SiteCreated)
async def create_site(
    site: SiteCreate,
    request: Request,
    db: aiosqlite.Connection = Depends(get_db),
):
    client_ip = request.client.host if request.client else "unknown"
    check_rate_limit(client_ip)

    site_id = generate(size=8)
    reasons_json = json.dumps(site.reasons) if site.reasons else None

    await db.execute(
        """INSERT INTO sites (
            id, creator_name, partner_name, love_message,
            photo_base64, photo_caption, how_we_met, favorite_memory,
            reasons, song_url, pet_name, secret_message
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        (
            site_id,
            site.creator_name,
            site.partner_name,
            site.love_message,
            site.photo_base64,
            site.photo_caption,
            site.how_we_met,
            site.favorite_memory,
            reasons_json,
            site.song_url,
            site.pet_name,
            site.secret_message,
        ),
    )
    await db.commit()

    scheme = "https" if "localhost" not in DOMAIN else "http"
    url = f"{scheme}://{DOMAIN}/v/{site_id}"

    return SiteCreated(id=site_id, url=url)


@app.get("/api/sites/{site_id}", response_model=SiteResponse)
async def get_site(site_id: str, db: aiosqlite.Connection = Depends(get_db)):
    cursor = await db.execute("SELECT * FROM sites WHERE id = ?", (site_id,))
    row = await cursor.fetchone()

    if not row:
        raise HTTPException(status_code=404, detail="Site not found")

    row_dict = dict(row)

    # Check expiry
    if row_dict.get("expires_at"):
        from datetime import datetime
        expires = datetime.fromisoformat(row_dict["expires_at"])
        if datetime.now() > expires:
            raise HTTPException(status_code=410, detail="This valentine has expired")

    reasons = None
    if row_dict["reasons"]:
        reasons = json.loads(row_dict["reasons"])

    return SiteResponse(
        id=row_dict["id"],
        creator_name=row_dict["creator_name"],
        partner_name=row_dict["partner_name"],
        love_message=row_dict["love_message"],
        photo_base64=row_dict["photo_base64"],
        photo_caption=row_dict["photo_caption"],
        how_we_met=row_dict["how_we_met"],
        favorite_memory=row_dict["favorite_memory"],
        reasons=reasons,
        song_url=row_dict["song_url"],
        pet_name=row_dict["pet_name"],
        secret_message=row_dict["secret_message"],
        view_count=row_dict["view_count"],
        accepted=row_dict["accepted_at"] is not None,
    )


@app.post("/api/sites/{site_id}/view")
async def record_view(site_id: str, db: aiosqlite.Connection = Depends(get_db)):
    cursor = await db.execute(
        "UPDATE sites SET view_count = view_count + 1 WHERE id = ?", (site_id,)
    )
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Site not found")
    await db.commit()
    return {"success": True}


@app.post("/api/sites/{site_id}/accept")
async def accept_site(site_id: str, db: aiosqlite.Connection = Depends(get_db)):
    cursor = await db.execute(
        "UPDATE sites SET accepted_at = CURRENT_TIMESTAMP WHERE id = ? AND accepted_at IS NULL",
        (site_id,),
    )
    if cursor.rowcount == 0:
        # Check if site exists
        check = await db.execute("SELECT id FROM sites WHERE id = ?", (site_id,))
        if not await check.fetchone():
            raise HTTPException(status_code=404, detail="Site not found")
    await db.commit()
    return {"success": True}


@app.get("/api/health")
async def health_check():
    return {"status": "ok", "database": os.path.exists(DATABASE_PATH)}
