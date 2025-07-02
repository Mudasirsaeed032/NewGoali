import { createClient } from '@supabase/supabase-js';
// Your Supabase URL and anonymous key from Supabase dashboard
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);