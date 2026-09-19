/**
 * Supabase client placeholder.
 *
 * The app runs fully on demo data when credentials are absent, so the team can
 * plug Supabase in without touching any UI code:
 *   1. npm install @supabase/supabase-js
 *   2. fill NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
 *   3. uncomment createClient below
 *   4. swap the mock branches inside src/lib/services/*
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

// import { createClient } from "@supabase/supabase-js";
// export const supabase = isSupabaseConfigured
//   ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
//   : null;
export const supabase = null;
