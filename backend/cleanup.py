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
