import { SupabaseClient, createClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null = null;

export function getDbClient(): SupabaseClient {
    if (cachedClient) return cachedClient;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) {
        throw new Error("`NEXT_PUBLIC_SUPABASE_URL` undefined.");
    }

    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseKey) {
        throw new Error("`NEXT_PUBLIC_SUPABASE_ANON_KEY` undefined.");
    }

    const client = createClient(supabaseUrl, supabaseKey);
    cachedClient = client;

    return client;
}

export default getDbClient;
