import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

console.log('Supabase URL:', supabaseUrl) // For debugging

if (!supabaseUrl) {
  throw new Error('Supabase URL is missing or invalid')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)