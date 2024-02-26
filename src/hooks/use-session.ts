import { useEffect, useState } from "react";

import { Session } from "@supabase/supabase-js";
import { getBrowserClient } from "@/lib/db/db-client";

function useSession() {
    const supabase = getBrowserClient();

    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        async function fetchSession() {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error("Failed to fetch session:", error);
            } else {
                setSession(data.session);
            }
        }
        fetchSession();
    }, []);

    return session;
}

export default useSession;
