import { useEffect, useState } from "react";

import { Session } from "@supabase/supabase-js";
import { getBrowserClient } from "@/lib/db/db-client";

interface UserSession {
    session: Session | null;
    username: string | null;
    apiCalls: number | null;
}

function useSession(): UserSession | null {
    const supabase = getBrowserClient();

    const [session, setSession] = useState<UserSession | null>(null);

    useEffect(() => {
        async function fetchSession() {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error("Failed to fetch session:", error);
            } else {
                const { data: userData, error: userError } = await supabase
                    .from("users")
                    .select("username, api_calls")
                    .eq("id", data.session?.user.id);

                if (userData) {
                    const { username, api_calls: apiCalls } = userData[0];
                    setSession({ session: data.session, username, apiCalls });
                } else {
                    setSession({
                        session: data.session,
                        username: null,
                        apiCalls: null,
                    });
                }
            }
        }
        fetchSession();
    }, [supabase.auth]);

    supabase.auth.onAuthStateChange(async (event, session) => {
        if (session) {
            const { data: userData, error: userError } = await supabase
                .from("users")
                .select("username, api_calls")
                .eq("id", session.user.id);

            if (userData) {
                const { username, api_calls: apiCalls } = userData[0];
                setSession({ session: session, username, apiCalls });
            } else {
                setSession({
                    session: session,
                    username: null,
                    apiCalls: null,
                });
            }
        } else {
            setSession(null);
        }
    });

    return session;
}

export { useSession, type UserSession };
