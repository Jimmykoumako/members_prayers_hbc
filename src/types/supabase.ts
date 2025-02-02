export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      members: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string | null
          phone: string | null
          address: string | null
          birthday: string | null
          join_date: string
          role: 'admin' | 'manager' | 'member'
          ministry: string[] | null
          family_members: string[] | null
          emergency_contact: Json | null
          attendance_status: 'active' | 'inactive' | 'visitor'
          baptism_date: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id: string
          first_name: string
          last_name: string
          email?: string | null
          phone?: string | null
          address?: string | null
          birthday?: string | null
          join_date?: string
          role?: 'admin' | 'manager' | 'member'
          ministry?: string[] | null
          family_members?: string[] | null
          emergency_contact?: Json | null
          attendance_status?: 'active' | 'inactive' | 'visitor'
          baptism_date?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string | null
          phone?: string | null
          address?: string | null
          birthday?: string | null
          join_date?: string
          role?: 'admin' | 'manager' | 'member'
          ministry?: string[] | null
          family_members?: string[] | null
          emergency_contact?: Json | null
          attendance_status?: 'active' | 'inactive' | 'visitor'
          baptism_date?: string | null
          notes?: string | null
          created_at?: string
        }
      }
      prayer_requests: {
        Row: {
          id: string
          title: string
          description: string | null
          category: 'health' | 'family' | 'spiritual' | 'financial' | 'other'
          is_permanent: boolean
          status: 'active' | 'in_progress' | 'answered'
          member_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          category?: 'health' | 'family' | 'spiritual' | 'financial' | 'other'
          is_permanent?: boolean
          status?: 'active' | 'in_progress' | 'answered'
          member_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          category?: 'health' | 'family' | 'spiritual' | 'financial' | 'other'
          is_permanent?: boolean
          status?: 'active' | 'in_progress' | 'answered'
          member_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}