import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface TypingSession {
  id?: string;
  session_name: string;
  typed_text: string;
  word_count: number;
  character_count: number;
  duration_seconds: number;
  created_at?: string;
  updated_at?: string;
}

export interface UserPreferences {
  id?: string;
  sensitivity: number;
  hover_delay: number;
  autocorrect_enabled: boolean;
  autocomplete_enabled: boolean;
  created_at?: string;
  updated_at?: string;
}
