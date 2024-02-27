import { SupabaseClient, createClient } from "@supabase/supabase-js";

import { createBrowserClient } from "@supabase/ssr";

export function getDbClient(): SupabaseClient {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) {
        throw new Error("`NEXT_PUBLIC_SUPABASE_URL` undefined.");
    }

    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseKey) {
        throw new Error("`NEXT_PUBLIC_SUPABASE_ANON_KEY` undefined.");
    }

    return createClient(supabaseUrl, supabaseKey);
}

export function getBrowserClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) {
        throw new Error("`NEXT_PUBLIC_SUPABASE_URL` undefined.");
    }

    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseKey) {
        throw new Error("`NEXT_PUBLIC_SUPABASE_ANON_KEY` undefined.");
    }

    return createBrowserClient(supabaseUrl, supabaseKey);
}

export default getDbClient;
