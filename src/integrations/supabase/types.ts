export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author: string
          content: string | null
          created_at: string
          excerpt: string
          featured_image: string | null
          id: string
          published_date: string
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author?: string
          content?: string | null
          created_at?: string
          excerpt: string
          featured_image?: string | null
          id?: string
          published_date?: string
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          content?: string | null
          created_at?: string
          excerpt?: string
          featured_image?: string | null
          id?: string
          published_date?: string
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
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
      editable_content: {
        Row: {
          content_html: string
          content_json: Json
          content_key: string
          created_at: string
          created_by: string | null
          id: string
          last_edited_by: string | null
          page_path: string
          section_name: string
          updated_at: string
        }
        Insert: {
          content_html?: string
          content_json?: Json
          content_key: string
          created_at?: string
          created_by?: string | null
          id?: string
          last_edited_by?: string | null
          page_path?: string
          section_name?: string
          updated_at?: string
        }
        Update: {
          content_html?: string
          content_json?: Json
          content_key?: string
          created_at?: string
          created_by?: string | null
          id?: string
          last_edited_by?: string | null
          page_path?: string
          section_name?: string
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
      page_metadata: {
        Row: {
          created_at: string
          featured_image: string | null
          id: string
          path: string
          seo_description: string
          seo_title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          featured_image?: string | null
          id?: string
          path: string
          seo_description: string
          seo_title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          featured_image?: string | null
          id?: string
          path?: string
          seo_description?: string
          seo_title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      project_content: {
        Row: {
          content_key: string
          content_value: string | null
          created_at: string
          id: string
          project_id: string
          updated_at: string
        }
        Insert: {
          content_key: string
          content_value?: string | null
          created_at?: string
          id?: string
          project_id: string
          updated_at?: string
        }
        Update: {
          content_key?: string
          content_value?: string | null
          created_at?: string
          id?: string
          project_id?: string
          updated_at?: string
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
      security_audit_log: {
        Row: {
          details: Json | null
          id: string
          operation: string
          table_name: string
          timestamp: string
          user_id: string | null
        }
        Insert: {
          details?: Json | null
          id?: string
          operation: string
          table_name: string
          timestamp?: string
          user_id?: string | null
        }
        Update: {
          details?: Json | null
          id?: string
          operation?: string
          table_name?: string
          timestamp?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
