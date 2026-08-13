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
    PostgrestVersion: "14.15"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      blogs: {
        Row: {
          author_id: string | null
          category: string | null
          content: string
          content_ar: string | null
          created_at: string | null
          display_order: number | null
          excerpt: string | null
          excerpt_ar: string | null
          featured_image: string | null
          id: string
          published: boolean | null
          published_at: string | null
          region: string | null
          slug: string
          tags: Json | null
          tags_ar: Json | null
          title: string
          title_ar: string | null
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          content: string
          content_ar?: string | null
          created_at?: string | null
          display_order?: number | null
          excerpt?: string | null
          excerpt_ar?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          region?: string | null
          slug: string
          tags?: Json | null
          tags_ar?: Json | null
          title: string
          title_ar?: string | null
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          category?: string | null
          content?: string
          content_ar?: string | null
          created_at?: string | null
          display_order?: number | null
          excerpt?: string | null
          excerpt_ar?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          region?: string | null
          slug?: string
          tags?: Json | null
          tags_ar?: Json | null
          title?: string
          title_ar?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          replied_at: string | null
          reply: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          replied_at?: string | null
          reply?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          replied_at?: string | null
          reply?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      maintenance_settings: {
        Row: {
          id: string
          is_active: boolean
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          id?: string
          is_active?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          id?: string
          is_active?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      partners: {
        Row: {
          created_at: string | null
          description: string
          description_ar: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          logo_url: string | null
          name: string
          name_ar: string | null
          subtitle: string | null
          subtitle_ar: string | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          description_ar?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name: string
          name_ar?: string | null
          subtitle?: string | null
          subtitle_ar?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          description_ar?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name?: string
          name_ar?: string | null
          subtitle?: string | null
          subtitle_ar?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          area_class: string | null
          area_population: string | null
          area_sex_ratio_female: string | null
          area_sex_ratio_male: string | null
          area_sqm: number | null
          bathrooms: number | null
          bedrooms: number | null
          benefit: string | null
          benefit_ar: string | null
          blocks: number | null
          clear_height: string | null
          completion_date: string | null
          construction_status: string | null
          created_at: string | null
          created_by: string | null
          delivery_date: string | null
          description: string | null
          description_ar: string | null
          display_order: number | null
          district: string | null
          down_payment_percentage: string | null
          features: Json | null
          floor_plans: Json | null
          floors: number | null
          furnished: boolean | null
          gated_community: boolean | null
          id: string
          images: Json | null
          installments_count: number | null
          investment_return_1y: string | null
          investment_return_3y: string | null
          investment_return_5y: string | null
          is_featured: boolean | null
          latitude: number | null
          layout: string | null
          location: string
          long_description: string | null
          long_description_ar: string | null
          longitude: number | null
          map_embed_url: string | null
          map_link_url: string | null
          nearby_places: Json | null
          payment_plans: Json | null
          plot_ratio: string | null
          price: number
          property_id: string | null
          property_type: string
          region: string
          rental_yield: string | null
          slug: string | null
          status: string | null
          title: string
          title_ar: string | null
          title_deed: string | null
          transaction_type: string
          updated_at: string | null
          video_url: string | null
          why_this_property: string | null
          why_this_property_ar: string | null
          year_built: number | null
        }
        Insert: {
          area_class?: string | null
          area_population?: string | null
          area_sex_ratio_female?: string | null
          area_sex_ratio_male?: string | null
          area_sqm?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          benefit?: string | null
          benefit_ar?: string | null
          blocks?: number | null
          clear_height?: string | null
          completion_date?: string | null
          construction_status?: string | null
          created_at?: string | null
          created_by?: string | null
          delivery_date?: string | null
          description?: string | null
          description_ar?: string | null
          display_order?: number | null
          district?: string | null
          down_payment_percentage?: string | null
          features?: Json | null
          floor_plans?: Json | null
          floors?: number | null
          furnished?: boolean | null
          gated_community?: boolean | null
          id?: string
          images?: Json | null
          installments_count?: number | null
          investment_return_1y?: string | null
          investment_return_3y?: string | null
          investment_return_5y?: string | null
          is_featured?: boolean | null
          latitude?: number | null
          layout?: string | null
          location: string
          long_description?: string | null
          long_description_ar?: string | null
          longitude?: number | null
          map_embed_url?: string | null
          map_link_url?: string | null
          nearby_places?: Json | null
          payment_plans?: Json | null
          plot_ratio?: string | null
          price: number
          property_id?: string | null
          property_type: string
          region: string
          rental_yield?: string | null
          slug?: string | null
          status?: string | null
          title: string
          title_ar?: string | null
          title_deed?: string | null
          transaction_type: string
          updated_at?: string | null
          video_url?: string | null
          why_this_property?: string | null
          why_this_property_ar?: string | null
          year_built?: number | null
        }
        Update: {
          area_class?: string | null
          area_population?: string | null
          area_sex_ratio_female?: string | null
          area_sex_ratio_male?: string | null
          area_sqm?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          benefit?: string | null
          benefit_ar?: string | null
          blocks?: number | null
          clear_height?: string | null
          completion_date?: string | null
          construction_status?: string | null
          created_at?: string | null
          created_by?: string | null
          delivery_date?: string | null
          description?: string | null
          description_ar?: string | null
          display_order?: number | null
          district?: string | null
          down_payment_percentage?: string | null
          features?: Json | null
          floor_plans?: Json | null
          floors?: number | null
          furnished?: boolean | null
          gated_community?: boolean | null
          id?: string
          images?: Json | null
          installments_count?: number | null
          investment_return_1y?: string | null
          investment_return_3y?: string | null
          investment_return_5y?: string | null
          is_featured?: boolean | null
          latitude?: number | null
          layout?: string | null
          location?: string
          long_description?: string | null
          long_description_ar?: string | null
          longitude?: number | null
          map_embed_url?: string | null
          map_link_url?: string | null
          nearby_places?: Json | null
          payment_plans?: Json | null
          plot_ratio?: string | null
          price?: number
          property_id?: string | null
          property_type?: string
          region?: string
          rental_yield?: string | null
          slug?: string | null
          status?: string | null
          title?: string
          title_ar?: string | null
          title_deed?: string | null
          transaction_type?: string
          updated_at?: string | null
          video_url?: string | null
          why_this_property?: string | null
          why_this_property_ar?: string | null
          year_built?: number | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string | null
          bio_ar: string | null
          created_at: string | null
          display_order: number | null
          email: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          linkedin_url: string | null
          name: string
          name_ar: string | null
          phone: string | null
          role: string
          role_ar: string | null
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          bio_ar?: string | null
          created_at?: string | null
          display_order?: number | null
          email?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          linkedin_url?: string | null
          name: string
          name_ar?: string | null
          phone?: string | null
          role: string
          role_ar?: string | null
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          bio_ar?: string | null
          created_at?: string | null
          display_order?: number | null
          email?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          linkedin_url?: string | null
          name?: string
          name_ar?: string | null
          phone?: string | null
          role?: string
          role_ar?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          created_at: string | null
          display_order: number | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          rating: number
          role: string
          role_ar: string | null
          text: string
          text_ar: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          rating?: number
          role: string
          role_ar?: string | null
          text: string
          text_ar?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          rating?: number
          role?: string
          role_ar?: string | null
          text?: string
          text_ar?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
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
      generate_slug: { Args: { title: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
