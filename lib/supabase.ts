import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Supabase now issues `sb_secret_…` keys; retain the legacy variable for
// compatibility with the assignment brief and existing deployments.
const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
export const supabase = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
export const hasSupabase = Boolean(supabase);
