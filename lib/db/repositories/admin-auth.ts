import { AdminSession, AdminUser } from '../types';
import { isMockDataMode } from '../../config/data-source';
import { generateId, hashPassword } from '../seed';
import { sql } from '../connection';

const mockAdminUser: AdminUser = {
  id: 'mock-admin-user',
  email: 'admin@fabbi.vn',
  name: 'Mock Admin',
  password_hash: 'mock-password',
  role: 'admin',
  created_at: '2026-05-25T00:00:00.000Z',
  updated_at: '2026-05-25T00:00:00.000Z',
};

function createMockSession(userId: string, token: string): AdminSession {
  const now = new Date();
  return {
    id: `mock-session-${token}`,
    user_id: userId,
    token,
    token_hash: hashToken(token),
    ip_address: null,
    user_agent: null,
    expires_at: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: now.toISOString(),
  };
}

function hashToken(token: string): string {
  const encoder = new TextEncoder();
  const data = encoder.encode(token + 'session-salt');
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data[i];
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

export const authRepository = {
  getSession: async (token: string): Promise<AdminSession | null> => {
    if (isMockDataMode()) return createMockSession(mockAdminUser.id, token);

    const tokenHash = hashToken(token);
    const [session] = await sql`
      SELECT * FROM admin_sessions
      WHERE token_hash = ${tokenHash} AND expires_at > NOW() AND expires_at IS NOT NULL
    `;

    if (!session) return null;
    return session as any as AdminSession;
  },

  validateCredentials: async (email: string, password: string): Promise<AdminUser | null> => {
    if (isMockDataMode()) {
      if (email === mockAdminUser.email && password === 'admin123') return mockAdminUser;
      return null;
    }

    const [user] = await sql`SELECT * FROM admin_users WHERE email = ${email}`;
    if (!user) return null;

    const inputHash = hashPassword(password);
    if (inputHash !== user.password_hash) return null;

    return user as any as AdminUser;
  },

  createSession: async (userId: string, token: string, ipAddress?: string, userAgent?: string): Promise<AdminSession> => {
    if (isMockDataMode()) return createMockSession(userId, token);

    const id = generateId();
    const tokenHash = hashToken(token);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await sql`
      INSERT INTO admin_sessions (id, user_id, token, token_hash, ip_address, user_agent, expires_at)
      VALUES (${id}, ${userId}, ${token}, ${tokenHash}, ${ipAddress || null}, ${userAgent || null}, ${expiresAt})
    `;

    return {
      id,
      user_id: userId,
      token,
      token_hash: tokenHash,
      ip_address: ipAddress || null,
      user_agent: userAgent || null,
      expires_at: expiresAt.toISOString(),
      created_at: new Date().toISOString()
    };
  },

  deleteSession: async (token: string): Promise<void> => {
    if (isMockDataMode()) return;
    const tokenHash = hashToken(token);
    await sql`DELETE FROM admin_sessions WHERE token_hash = ${tokenHash}`;
  },

  cleanupExpiredSessions: async (): Promise<number> => {
    if (isMockDataMode()) return 0;
    const result = await sql`
      DELETE FROM admin_sessions WHERE expires_at < NOW()
    `;
    return result.count;
  }
};
