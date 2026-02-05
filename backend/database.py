import aiosqlite
import os

DATABASE_PATH = os.getenv("DATABASE_PATH", "valentine.db")

async def get_db():
    db = await aiosqlite.connect(DATABASE_PATH)
    db.row_factory = aiosqlite.Row
    try:
        yield db
    finally:
        await db.close()

async def init_db():
    async with aiosqlite.connect(DATABASE_PATH) as db:
        await db.execute("""
            CREATE TABLE IF NOT EXISTS sites (
                id TEXT PRIMARY KEY,
                creator_name TEXT NOT NULL,
                partner_name TEXT NOT NULL,
                love_message TEXT NOT NULL,
                photo_base64 TEXT,
                photo_caption TEXT,
                how_we_met TEXT,
                favorite_memory TEXT,
                reasons TEXT,
                song_url TEXT,
                pet_name TEXT,
                secret_message TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                view_count INTEGER DEFAULT 0,
                accepted_at TIMESTAMP,
                expires_at TIMESTAMP DEFAULT '2026-02-15 23:59:59'
            )
        """)
        await db.execute("CREATE INDEX IF NOT EXISTS idx_expires ON sites(expires_at)")
        await db.commit()
