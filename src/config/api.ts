
import { supabase } from '@/integrations/supabase/client';

/**
 * Centralized API configuration
 */
export const API_CONFIG = {
  supabase: {
    url: 'https://ctqttomppgkjbjkckise.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0cXR0b21wcGdramJqa2NraXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0Mjg1MzMsImV4cCI6MjA2MDAwNDUzM30.q15G4xYUtQqi7kdlha0C31LaIlYWBqPbIit-e9wq48Q'
  }
} as const;

/**
 * Get the Supabase client instance
 * Use this instead of accessing supabase directly in components
 */
export const getSupabaseClient = () => supabase;

/**
 * Validate that API endpoints are properly configured
 */
export const validateApiConfig = () => {
  if (!API_CONFIG.supabase.url || !API_CONFIG.supabase.anonKey) {
    throw new Error('Supabase configuration is incomplete');
  }
  
  console.log('✅ API configuration validated');
  return true;
};
