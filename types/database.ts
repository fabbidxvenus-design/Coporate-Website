// ============================================================
// Coporate_Website — Database Types
// Generated from: supabase/migrations/001_initial_schema.sql
// ============================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          display_name: string | null
          role: 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          display_name?: string | null
          role?: 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          display_name?: string | null
          role?: 'admin'
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey'
            columns: ['id']
            isOneToOne: 'one'
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      jobs: {
        Row: {
          id: string
          slug: string
          title: string
          department: string | null
          location: string | null
          employment_type: 'full-time' | 'part-time' | 'contract' | 'internship' | null
          salary_min: number | null
          salary_max: number | null
          currency: string
          summary: string | null
          description: string
          requirements: string | null
          benefits: string | null
          skills: string[]
          status: 'draft' | 'review' | 'published' | 'closed' | 'archived'
          published_at: string | null
          closed_at: string | null
          created_by: string | null
          updated_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          department?: string | null
          location?: string | null
          employment_type?: 'full-time' | 'part-time' | 'contract' | 'internship' | null
          salary_min?: number | null
          salary_max?: number | null
          currency?: string
          summary?: string | null
          description?: string
          requirements?: string | null
          benefits?: string | null
          skills?: string[]
          status?: 'draft' | 'review' | 'published' | 'closed' | 'archived'
          published_at?: string | null
          closed_at?: string | null
          created_by?: string | null
          updated_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          department?: string | null
          location?: string | null
          employment_type?: 'full-time' | 'part-time' | 'contract' | 'internship' | null
          salary_min?: number | null
          salary_max?: number | null
          currency?: string
          summary?: string | null
          description?: string
          requirements?: string | null
          benefits?: string | null
          skills?: string[]
          status?: 'draft' | 'review' | 'published' | 'closed' | 'archived'
          published_at?: string | null
          closed_at?: string | null
          created_by?: string | null
          updated_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'jobs_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'jobs_updated_by_fkey'
            columns: ['updated_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      job_status_history: {
        Row: {
          id: string
          job_id: string
          status: 'draft' | 'review' | 'published' | 'closed' | 'archived'
          changed_by: string | null
          changed_at: string
          note: string | null
        }
        Insert: {
          id?: string
          job_id: string
          status: 'draft' | 'review' | 'published' | 'closed' | 'archived'
          changed_by?: string | null
          changed_at?: string
          note?: string | null
        }
        Update: {
          id?: string
          job_id?: string
          status?: 'draft' | 'review' | 'published' | 'closed' | 'archived'
          changed_by?: string | null
          changed_at?: string
          note?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'job_status_history_job_id_fkey'
            columns: ['job_id']
            isOneToOne: false
            referencedRelation: 'jobs'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'job_status_history_changed_by_fkey'
            columns: ['changed_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      news_articles: {
        Row: {
          id: string
          slug: string
          title: string
          excerpt: string | null
          body: string
          cover_image_url: string | null
          category: string | null
          tags: string[]
          status: 'draft' | 'review' | 'published' | 'archived'
          author_id: string | null
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          excerpt?: string | null
          body?: string
          cover_image_url?: string | null
          category?: string | null
          tags?: string[]
          status?: 'draft' | 'review' | 'published' | 'archived'
          author_id?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          excerpt?: string | null
          body?: string
          cover_image_url?: string | null
          category?: string | null
          tags?: string[]
          status?: 'draft' | 'review' | 'published' | 'archived'
          author_id?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'news_articles_author_id_fkey'
            columns: ['author_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      applications: {
        Row: {
          id: string
          job_id: string | null
          full_name: string
          email: string
          phone: string
          portfolio_url: string | null
          message: string | null
          cv_file_path: string
          cv_file_name: string
          cv_file_size: number
          cv_mime_type: string
          source: string
          status: 'new' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired'
          submitted_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          job_id?: string | null
          full_name: string
          email: string
          phone: string
          portfolio_url?: string | null
          message?: string | null
          cv_file_path: string
          cv_file_name: string
          cv_file_size: number
          cv_mime_type?: string
          source?: string
          status?: 'new' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired'
          submitted_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          job_id?: string | null
          full_name?: string
          email?: string
          phone?: string
          portfolio_url?: string | null
          message?: string | null
          cv_file_path?: string
          cv_file_name?: string
          cv_file_size?: number
          cv_mime_type?: string
          source?: string
          status?: 'new' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired'
          submitted_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'applications_job_id_fkey'
            columns: ['job_id']
            isOneToOne: false
            referencedRelation: 'jobs'
            referencedColumns: ['id']
          }
        ]
      }
      site_settings: {
        Row: {
          key: string
          value: Json
          updated_by: string | null
          updated_at: string
        }
        Insert: {
          key: string
          value?: Json
          updated_by?: string | null
          updated_at?: string
        }
        Update: {
          key?: string
          value?: Json
          updated_by?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'site_settings_updated_by_fkey'
            columns: ['updated_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      media_assets: {
        Row: {
          id: string
          bucket: string
          path: string
          alt_text: string | null
          content_type: string | null
          size: number | null
          created_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          bucket: string
          path: string
          alt_text?: string | null
          content_type?: string | null
          size?: number | null
          created_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          bucket?: string
          path?: string
          alt_text?: string | null
          content_type?: string | null
          size?: number | null
          created_by?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'media_assets_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      handle_updated_at: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      handle_job_create: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Simplified helper types for common operations
export type Tables<
  TableName extends keyof Database['public']['Tables']
> = Database['public']['Tables'][TableName]

export type TablesInsert<
  TableName extends keyof Database['public']['Tables']
> = Database['public']['Tables'][TableName]['Insert']

export type TablesUpdate<
  TableName extends keyof Database['public']['Tables']
> = Database['public']['Tables'][TableName]['Update']

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = never