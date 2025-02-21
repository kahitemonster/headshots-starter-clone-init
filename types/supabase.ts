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
      credits: {
        Row: {
          created_at: string
          credits: number
          images: number
          id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          credits?: number
          images?: number
          id?: number
          user_id: string
        }
        Update: {
          created_at?: string
          credits?: number
          images?: number
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "credits_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      images: {
        Row: {
          created_at: string
          id: number
          modelId: number
          uri: string
        }
        Insert: {
          created_at?: string
          id?: number
          modelId: number
          uri: string
        }
        Update: {
          created_at?: string
          id?: number
          modelId?: number
          uri?: string
        }
        Relationships: [
          {
            foreignKeyName: "images_modelId_fkey"
            columns: ["modelId"]
            referencedRelation: "models"
            referencedColumns: ["id"]
          }
        ]
      }
      models: {
        Row: {
          created_at: string
          id: number
          modelId: string | null
          name: string | null
          status: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          modelId?: string | null
          name?: string | null
          status?: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          modelId?: string | null
          name?: string | null
          status?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "models_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      samples: {
        Row: {
          created_at: string
          id: number
          modelId: number
          uri: string
        }
        Insert: {
          created_at?: string
          id?: number
          modelId: number
          uri: string
        }
        Update: {
          created_at?: string
          id?: number
          modelId?: number
          uri?: string
        }
        Relationships: [
          {
            foreignKeyName: "samples_modelId_fkey"
            columns: ["modelId"]
            referencedRelation: "models"
            referencedColumns: ["id"]
          }
        ]
      }
      payments: {
        Row: {
          id: number
          created_at: string
          user_id: string
          customer_id: string
          plan_id: number
        }
        Insert: {
          id?: number
          created_at?: string
          user_id?: string
          customer_id?: string
          plan_id?: number
        }
        Update: {
          id?: number
          created_at?: string
          user_id?: string
          customer_id?: string
          plan_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      invoices: {
        Row: {
          id: number
          created_at: string
          user_id: string
          invoice_url: string
        }
        Insert: {
          id?: number
          created_at?: string
          user_id?: string
          invoice_url?: string
        }
        Update: {
          id?: number
          created_at?: string
          user_id?: string
          invoice_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
  // auth: {
  //   Tables: {
  //     users: {
  //       Row: {
  //         id: string
  //         instance_id: string
  //         aud: string
  //         role: string
  //         email: string
  //         encrypted_password: string
  //         email_confirmed_at: string
  //         invited_at: string
  //         confirmation_token: string
  //         confirmation_sent_at: string
  //         recovery_token: string
  //         recovery_sent_at: string
  //         email_change_token_new: string
  //         email_change: string
  //         email_change_sent_at: string
  //         last_sign_in_at: string
  //         raw_app_meta_data: JSON
  //         raw_user_meta_data: JSON
  //         is_super_admin: boolean
  //         created_at: string
  //         updated_at: string
  //         phone: string
  //         phone_confirmed_at: string
  //         phone_change: string
  //         phone_change_token: string
  //         phone_change_sent_at: string
  //         confirmed_at: string
  //         email_change_token_current: string
  //         email_change_confirm_status: string
  //         banned_until: string
  //         reauthentication_token: string
  //         reauthentication_sent_at: string
  //         is_sso_user: boolean
  //         deleted_at: string
  //         customer_id: string
  //       }
  //       Insert: {
  //         id?: string
  //         instance_id?: string
  //         aud?: string
  //         role?: string
  //         email?: string
  //         encrypted_password?: string
  //         email_confirmed_at?: string
  //         invited_at?: string
  //         confirmation_token?: string
  //         confirmation_sent_at?: string
  //         recovery_token?: string
  //         recovery_sent_at?: string
  //         email_change_token_new?: string
  //         email_change?: string
  //         email_change_sent_at?: string
  //         last_sign_in_at?: string
  //         raw_app_meta_data?: JSON
  //         raw_user_meta_data?: JSON
  //         is_super_admin?: boolean
  //         created_at?: string
  //         updated_at?: string
  //         phone?: string
  //         phone_confirmed_at?: string
  //         phone_change?: string
  //         phone_change_token?: string
  //         phone_change_sent_at?: string
  //         confirmed_at?: string
  //         email_change_token_current?: string
  //         email_change_confirm_status?: string
  //         banned_until?: string
  //         reauthentication_token?: string
  //         reauthentication_sent_at?: string
  //         is_sso_user?: boolean
  //         deleted_at?: string
  //         customer_id?: string
  //       }
  //       Update: {
  //         id?: string
  //         instance_id?: string
  //         aud?: string
  //         role?: string
  //         email?: string
  //         encrypted_password?: string
  //         email_confirmed_at?: string
  //         invited_at?: string
  //         confirmation_token?: string
  //         confirmation_sent_at?: string
  //         recovery_token?: string
  //         recovery_sent_at?: string
  //         email_change_token_new?: string
  //         email_change?: string
  //         email_change_sent_at?: string
  //         last_sign_in_at?: string
  //         raw_app_meta_data?: JSON
  //         raw_user_meta_data?: JSON
  //         is_super_admin?: boolean
  //         created_at?: string
  //         updated_at?: string
  //         phone?: string
  //         phone_confirmed_at?: string
  //         phone_change?: string
  //         phone_change_token?: string
  //         phone_change_sent_at?: string
  //         confirmed_at?: string
  //         email_change_token_current?: string
  //         email_change_confirm_status?: string
  //         banned_until?: string
  //         reauthentication_token?: string
  //         reauthentication_sent_at?: string
  //         is_sso_user?: boolean
  //         deleted_at?: string
  //         customer_id?: string
  //       }
  //     }
  //   }
  // }
}
