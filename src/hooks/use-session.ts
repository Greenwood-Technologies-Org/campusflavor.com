import { useEffect, useState } from "react";

import { Session } from "@supabase/supabase-js";
import { getBrowserClient } from "@/lib/db/db-client";

function useSession() {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const supabase = getBrowserClient();

    useEffect(() => {
        async function fetchSession() {
            setIsLoading(true);
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error("Failed to fetch session:", error);
            } else {
                setSession(data.session);
            }
            setIsLoading(false);
        }
        fetchSession();
    }, [supabase.auth]);

    supabase.auth.onAuthStateChange((event, session) => {
        if (event == "SIGNED_IN" && !session) setSession(session);
        else if (event == "SIGNED_IN" && session) setSession(null);
    });

    return { isLoading, session };
}

export default useSession;
