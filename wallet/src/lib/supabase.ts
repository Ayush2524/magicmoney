// Supabase client for the browser wallet app.
//
// Uses the anon/public API key, which is safe to ship client-side: access
// to data is controlled by Postgres Row Level Security (RLS) policies on
// the Supabase project, not by keeping this key secret.

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables'
    )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
