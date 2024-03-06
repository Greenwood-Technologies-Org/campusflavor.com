"use client";

import React, { HTMLAttributes, useState } from "react";

import { cn } from "@/lib/utils";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { Icons } from "./icons";

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
    isLoading: boolean;
}

const SessionData = React.forwardRef<HTMLDivElement, SessionDataProps>(
    ({ className, isLoading, session, ...props }, ref) => {
        const router = useRouter();
        const hasSession = !!session;
        const [signedOut, setSignedOut] = useState(false);

        if (!hasSession || signedOut) {
            return (
                <div className={cn(className)} ref={ref} {...props}>
                    <div className="flex flex-row items-center justify-center gap-2">
                        <button
                            className="flex flex-row items-center justify-center gap-2"
                            onClick={() => router.push("/signin")}
                        >
                            <div className="flex flex-col">
                                <p className="text-lg font-bold text-center rounded-md py-1 px-1 text-primary-500 bg-secondary-500 hover:bg-primary-500 hover:text-secondary-500">
                                    Sign In
                                </p>
                            </div>
                        </button>
                        <div className="border-r-2 border-primary-500 min-h-4 h-full" />
                        <button
                            className="flex flex-row items-center justify-center gap-2"
                            onClick={() => router.push("/signup")}
                        >
                            <div className="flex flex-col">
                                <p className="text-lg font-bold text-center rounded-md py-1 px-1 text-primary-500 bg-secondary-500 hover:bg-primary-500 hover:text-secondary-500">
                                    Sign Up
                                </p>
                            </div>
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className={cn(className)} ref={ref} {...props}>
                <div className="flex flex-row items-center justify-center gap-2">
                    <div className="flex flex-col w-fit h-fit items-start justify-start">
                        {isLoading && (
                            <Icons.spinner
                                className="mr-2 size-8 animate-spin"
                                aria-hidden="true"
                            />
                        )}
                        <p className="text-lg font-bold -mb-2">
                            {session.user.user_metadata.username}
                        </p>
                        <p className="text-sm font-normal">
                            {session.user.email}
                        </p>
                    </div>
                    <div className="border-r-2 border-primary-500 min-h-4 h-full" />
                    <button
                        className="text-lg font-bold text-center rounded-md py-1 px-1 text-primary-500 bg-secondary-500 hover:bg-primary-500 hover:text-secondary-500"
                        onClick={() => {
                            router.push("/signout");
                            setSignedOut(true);
                        }}
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
