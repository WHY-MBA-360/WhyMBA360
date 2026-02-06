import sqlite3
from datetime import datetime
from typing import Dict, Any

DB_PATH = "leads.db"

def get_conn():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("""
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      phone TEXT,
      score INTEGER DEFAULT 0,
      stage TEXT DEFAULT 'New',
      created_at TEXT
    )
    """)
    conn.commit()
    conn.close()

def create_lead(data: Dict[str, Any]) -> Dict[str, Any]:
    conn = get_conn()
    cur = conn.cursor()
    created_at = datetime.utcnow().isoformat()
    cur.execute(
        "INSERT INTO leads (name, email, phone, score, stage, created_at) VALUES (?, ?, ?, ?, ?, ?)",
        (data.get("name"), data.get("email"), data.get("phone"), data.get("score", 0), data.get("stage", "New"), created_at)
    )
    conn.commit()
    lead_id = cur.lastrowid
    conn.close()
    return {"id": lead_id, "created_at": created_at, **data}

def list_leads(limit: int = 100):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("SELECT id, name, email, phone, score, stage, created_at FROM leads ORDER BY created_at DESC LIMIT ?", (limit,))
    rows = cur.fetchall()
    conn.close()
    return [dict(r) for r in rows]
