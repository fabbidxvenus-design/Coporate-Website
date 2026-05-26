// Strapi response wrapper types
export interface StrapiResponse<T> {
  data: T;
  meta?: Record<string, unknown>;
}

export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Strapi entity shape
export interface StrapiEntity<T> {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

// ---------------------------------------------------------------------------
// Job
// ---------------------------------------------------------------------------

export interface StrapiJob {
  documentId: string;
  title: string;
  slug: string;
  locale: string;
  category: string | null;
  location: string | null;
  employmentType: string | null;
  salaryRange: string | null;
  skills: string[];
  description: string;
  requirements: string;
  benefits: string;
  status: 'draft' | 'review' | 'published' | 'closed' | 'archived';
  publishedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Article / News
// ---------------------------------------------------------------------------

export interface StrapiArticle {
  documentId: string;
  title: string;
  slug: string;
  locale: string;
  excerpt: string | null;
  body: string | null;
  coverImage: StrapiMedia | null;
  category: string | null;
  tags: string[];
  author: string | null;
  status: 'draft' | 'published';
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Application
// ---------------------------------------------------------------------------

export interface StrapiApplication {
  documentId: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  message: string | null;
  portfolioUrl: string | null;
  cvFile: StrapiMedia | null;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  job: StrapiEntity<StrapiJob> | null;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Site Setting
// ---------------------------------------------------------------------------

export interface StrapiSiteSetting {
  documentId: string;
  locale: string;
  siteTitle: string;
  contactEmail: string;
  socialLinks: Record<string, string>;
  footerContent: string | null;
}

// ---------------------------------------------------------------------------
// About Page
// ---------------------------------------------------------------------------

export interface StrapiAboutPage {
  documentId: string;
  locale: string;
  title: string;
  intro: string | null;
  stats: Array<{ label: string; value: string }>;
  activity: string | null;
  values: Array<{ icon: string; title: string; description: string }>;
  teamMembers: Array<{ name: string; role: string; imageUrl: string | null }>;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Media
// ---------------------------------------------------------------------------

export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  url: string;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: Record<string, StrapiMediaFormat> | null;
}

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
  size: number;
}