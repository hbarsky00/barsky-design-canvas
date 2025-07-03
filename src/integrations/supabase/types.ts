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
      dev_mode_changes: {
        Row: {
          change_key: string
          change_type: string
          change_value: Json
          created_at: string
          id: string
          project_id: string
          updated_at: string
        }
        Insert: {
          change_key: string
          change_type: string
          change_value: Json
          created_at?: string
          id?: string
          project_id: string
          updated_at?: string
        }
        Update: {
          change_key?: string
          change_type?: string
          change_value?: Json
          created_at?: string
          id?: string
          project_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      lead_interactions: {
        Row: {
          completed_at: string | null
          content: string | null
          created_at: string
          id: string
          interaction_type: string
          lead_id: string
          scheduled_at: string | null
          subject: string | null
        }
        Insert: {
          completed_at?: string | null
          content?: string | null
          created_at?: string
          id?: string
          interaction_type: string
          lead_id: string
          scheduled_at?: string | null
          subject?: string | null
        }
        Update: {
          completed_at?: string | null
          content?: string | null
          created_at?: string
          id?: string
          interaction_type?: string
          lead_id?: string
          scheduled_at?: string | null
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_interactions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          budget_range: string | null
          company: string | null
          contacted_at: string | null
          created_at: string
          email: string
          id: string
          lead_source: string | null
          lead_status: string | null
          name: string
          notes: string | null
          phone: string | null
          priority_score: number | null
          project_description: string | null
          project_type: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          budget_range?: string | null
          company?: string | null
          contacted_at?: string | null
          created_at?: string
          email: string
          id?: string
          lead_source?: string | null
          lead_status?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          priority_score?: number | null
          project_description?: string | null
          project_type?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          budget_range?: string | null
          company?: string | null
          contacted_at?: string | null
          created_at?: string
          email?: string
          id?: string
          lead_source?: string | null
          lead_status?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          priority_score?: number | null
          project_description?: string | null
          project_type?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      published_projects: {
        Row: {
          content_blocks: Json
          id: string
          image_replacements: Json
          project_id: string
          published_at: string
          text_content: Json
          updated_at: string
        }
        Insert: {
          content_blocks?: Json
          id?: string
          image_replacements?: Json
          project_id: string
          published_at?: string
          text_content?: Json
          updated_at?: string
        }
        Update: {
          content_blocks?: Json
          id?: string
          image_replacements?: Json
          project_id?: string
          published_at?: string
          text_content?: Json
          updated_at?: string
        }
        Relationships: []
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
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
