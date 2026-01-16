import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    'https://tuwgxswlmyqtigjrtoqx.supabase.co', 
    'sb_publishable_b746J0olo0-ooLzUt3HbMg_Wtc4VoTH')