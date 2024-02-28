"use client";

import React, { HTMLAttributes } from "react";

import { Icons } from "./icons";
import { cn } from "@/lib/utils";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

type EmailParts = {
    username?: string;
    provider?: string;
};

function getEmailParts(email: string | undefined): EmailParts {
    if (!email) {
        return {};
    }

    const [username, provider] = email.split("@");
    return { username, provider };
}

interface SessionDataProps extends HTMLAttributes<HTMLDivElement> {
    session: Session | null;
}

const SessionData = React.forwardRef<HTMLDivElement, SessionDataProps>(
    ({ className, session, ...props }, ref) => {
        const router = useRouter();
        const hasSession = !!session;

        if (!hasSession) {
            return (
                <div className={cn(className)} ref={ref} {...props}>
                    <div className="flex flex-row items-center justify-center gap-2">
                        <button
                            className="flex flex-row items-center justify-center gap-2"
                            onClick={() => router.push("/signin")}
                        >
                            <div className="flex flex-col">
                                <p className="text-xl font-bold">Sign In</p>
                            </div>
                        </button>
                        <div className="border-r-2 border-primary-500 min-h-4 h-full" />
                        <button
                            className="flex flex-row items-center justify-center gap-2"
                            onClick={() => router.push("/signin")}
                        >
                            <div className="flex flex-col">
                                <p className="text-xl font-bold">Sign Up</p>
                            </div>
                        </button>
                    </div>
                </div>
            );
        }

        const { username, provider } = getEmailParts(session.user.email);

        return (
            <div className={cn(className)} ref={ref} {...props}>
                <div className="flex flex-row items-center justify-center gap-2">
                    <div className="flex flex-col w-fit h-fit items-start justify-start">
                        <p className="text-lg font-bold -mb-2">{username}</p>
                        <p className="text-sm font-normal">
                            {session.user.email}
                        </p>
                    </div>
                    <div className="border-r-2 border-primary-500 min-h-4 h-full" />
                    <button
                        className="text-lg font-bold"
                        onClick={() => router.push("/signout")}
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        );
    }
);
SessionData.displayName = "SessionData";

export { SessionData, type SessionDataProps };
