import { describe, it, expect, vi } from 'vitest'
import { execSync } from 'child_process'
import path from 'path'

describe('TIP-022 Red Gate: No SQLite Runtime Residue', () => {
  it('should have NO runtime imports of better-sqlite3', () => {
    const root = path.resolve(process.cwd())
    try {
      const result = execSync(
        `git grep -l "better-sqlite3" -- "lib/**/*.ts" "lib/**/*.tsx" "app/**/*.ts" "app/**/*.tsx" "scripts/**/*.ts" "scripts/**/*.mjs"`,
        { cwd: root, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
      )
      const files = result.trim().split('\n').filter(Boolean)
      // Red Gate: this MUST fail because lib/db/connection.ts and lib/db/types.ts import better-sqlite3
      expect(files).toHaveLength(0)
    } catch {
      // git grep returns exit code 1 when no files found — which is the PASS condition
      // But we expect FAILURE because better-sqlite3 IS imported
      expect(true).toBe(false)
    }
  })

  it('should have NO runtime INSERT OR IGNORE/REPLACE in active code', () => {
    const root = path.resolve(process.cwd())
    try {
      const result = execSync(
        `git grep -E "INSERT OR IGNORE|INSERT OR REPLACE" -- "lib/**/*.ts" "lib/**/*.mjs" "scripts/**/*.mjs"`,
        { cwd: root, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
      )
      const matches = result.trim().split('\n').filter(Boolean)
      // Red Gate: this MUST fail because lib/db/seed.ts uses INSERT OR IGNORE
      expect(matches).toHaveLength(0)
    } catch {
      expect(true).toBe(false)
    }
  })

  it('should have NO .data/sqlite.db references in active code', () => {
    const root = path.resolve(process.cwd())
    try {
      const result = execSync(
        `git grep -l "\\.data/sqlite\\.db" -- "lib/**/*.ts" "lib/**/*.tsx" "app/**/*.ts" "app/**/*.tsx" "scripts/**/*.ts"`,
        { cwd: root, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
      )
      const files = result.trim().split('\n').filter(Boolean)
      // Red Gate: this MUST fail because lib/db/connection.ts references .data/sqlite.db
      expect(files).toHaveLength(0)
    } catch {
      expect(true).toBe(false)
    }
  })
})