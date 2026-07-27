CREATE TABLE IF NOT EXISTS rsvps (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  party_size INTEGER NOT NULL CHECK (party_size BETWEEN 1 AND 20),
  phone TEXT NOT NULL UNIQUE,
  confirmed INTEGER NOT NULL DEFAULT 1 CHECK (confirmed IN (0, 1)),
  invitation_token TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rsvps_confirmed ON rsvps (confirmed);
CREATE INDEX IF NOT EXISTS idx_rsvps_updated_at ON rsvps (updated_at DESC);

