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
      services: {
        Row: {
          id: string
          name_ar: string
          name_en: string
          description_ar: string
          description_en: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name_ar: string
          name_en: string
          description_ar: string
          description_en: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name_ar?: string
          name_en?: string
          description_ar?: string
          description_en?: string
          is_active?: boolean
          created_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          full_name: string
          phone: string
          car_make_model: string | null
          service_id: string | null
          preferred_date: string | null
          preferred_time: string | null
          message: string | null
          status: string
          follow_up_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          full_name: string
          phone: string
          car_make_model?: string | null
          service_id?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          message?: string | null
          status?: string
          follow_up_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          phone?: string
          car_make_model?: string | null
          service_id?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          message?: string | null
          status?: string
          follow_up_at?: string | null
          created_at?: string
        }
      }
      lead_notes: {
        Row: {
          id: string
          lead_id: string
          note: string
          created_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          lead_id: string
          note: string
          created_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          lead_id?: string
          note?: string
          created_by?: string | null
          created_at?: string
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
