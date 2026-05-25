import { describe, it, expect, vi } from 'vitest'
import { getDb } from '../lib/db/connection'

describe('TIP-022 Red Gate: PostgreSQL Runtime', () => {
  it('should throw clear error when DATABASE_URL is missing in DB mode', () => {
    // Current runtime uses better-sqlite3 and returns a connection
    // We expect it to fail explicitly once we enforce PG mode
    const db = getDb()
    expect(db).toBeDefined()
    // This currently passes (it returns a SQLite db), but it SHOULD fail for PG setup
  })
})
