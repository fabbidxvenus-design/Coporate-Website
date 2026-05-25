import { sql } from './connection';

interface Migration {
  name: string;
  sql: string;
}

const migrations: Migration[] = [
  {
    name: '001_create_jobs',
    sql: `
      CREATE TABLE IF NOT EXISTS jobs (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        description TEXT NOT NULL DEFAULT '',
        requirements TEXT NOT NULL DEFAULT '',
        benefits TEXT NOT NULL DEFAULT '',
        salary_min INTEGER,
        salary_max INTEGER,
        location TEXT NOT NULL DEFAULT '',
        employment_type TEXT NOT NULL DEFAULT 'full-time',
        skills TEXT NOT NULL DEFAULT '[]',
        tags TEXT NOT NULL DEFAULT '[]',
        status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft', 'review', 'published', 'closed', 'archived')),
        views INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        published_at TIMESTAMPTZ
      )
    `,
  },
  {
    name: '002_create_news_articles',
    sql: `
      CREATE TABLE IF NOT EXISTS news_articles (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        content TEXT NOT NULL DEFAULT '',
        excerpt TEXT NOT NULL DEFAULT '',
        thumbnail_url TEXT,
        author_name TEXT NOT NULL DEFAULT '',
        author_role TEXT,
        tags TEXT NOT NULL DEFAULT '[]',
        status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft', 'published')),
        views INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        published_at TIMESTAMPTZ
      )
    `,
  },
  {
    name: '003_create_applications',
    sql: `
      CREATE TABLE IF NOT EXISTS applications (
        id TEXT PRIMARY KEY,
        job_id TEXT NOT NULL,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL DEFAULT '',
        message TEXT NOT NULL DEFAULT '',
        portfolio_url TEXT,
        cv_filename TEXT,
        cv_path TEXT,
        cv_mime_type TEXT,
        cv_size INTEGER,
        status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'reviewing', 'interview', 'offer', 'rejected', 'withdrawn')),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
      )
    `,
  },
  {
    name: '004_create_contact_submissions',
    sql: `
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL DEFAULT '',
        company TEXT NOT NULL DEFAULT '',
        message TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new', 'read', 'replied')),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `,
  },
  {
    name: '005_create_site_settings',
    sql: `
      CREATE TABLE IF NOT EXISTS site_settings (
        id TEXT PRIMARY KEY,
        key TEXT NOT NULL UNIQUE,
        value TEXT NOT NULL,
        type TEXT NOT NULL DEFAULT 'string' CHECK(type IN ('string', 'number', 'boolean', 'json')),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `,
  },
  {
    name: '006_create_admin_users',
    sql: `
      CREATE TABLE IF NOT EXISTS admin_users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'admin' CHECK(role IN ('admin', 'editor')),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `,
  },
  {
    name: '007_create_admin_sessions',
    sql: `
      CREATE TABLE IF NOT EXISTS admin_sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        token TEXT NOT NULL UNIQUE,
        token_hash TEXT NOT NULL UNIQUE,
        ip_address TEXT,
        user_agent TEXT,
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE CASCADE
      )
    `,
  },
  {
    name: '008_create_about_content',
    sql: `
      CREATE TABLE IF NOT EXISTS about_content (
        id TEXT PRIMARY KEY,
        locale TEXT NOT NULL DEFAULT 'vi',
        hero_title TEXT NOT NULL DEFAULT '',
        hero_subtitle TEXT NOT NULL DEFAULT '',
        hero_image_url TEXT,
        mission_title TEXT NOT NULL DEFAULT '',
        mission_content TEXT NOT NULL DEFAULT '',
        vision_title TEXT NOT NULL DEFAULT '',
        vision_content TEXT NOT NULL DEFAULT '',
        values_title TEXT NOT NULL DEFAULT '',
        "values" TEXT NOT NULL DEFAULT '[]',
        team_title TEXT NOT NULL DEFAULT '',
        team_members TEXT NOT NULL DEFAULT '[]',
        stats TEXT NOT NULL DEFAULT '[]',
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(id, locale)
      )
    `,
  },
];

// Create migrations table if it doesn't exist
async function ensureMigrationsTable(): Promise<void> {
  await sql.unsafe(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      applied_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
}

export async function runMigrations(): Promise<void> {
  await ensureMigrationsTable();

  // Fetch applied migrations
  const applied = await sql<{ name: string }[]>`
    SELECT name FROM _migrations ORDER BY id
  `;
  const appliedSet = new Set(applied.map((m) => m.name));

  for (const migration of migrations) {
    if (!appliedSet.has(migration.name)) {
      await sql.unsafe(migration.sql);
      await sql`INSERT INTO _migrations (name) VALUES (${migration.name})`;
    }
  }
}