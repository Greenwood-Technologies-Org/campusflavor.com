"use client";

import { useRouter, useSearchParams } from "next/navigation";

import React from "react";
import getDbClient from "@/lib/db/db-client";
import { useMutation } from "react-query";

export default function VerifyEmailPage() {
    const params = useSearchParams();
    const router = useRouter();
    const email = params.get("email");
    const resend = params.get("resend");

    const mutation = useMutation(
        async (variables: { resend: boolean; email: string | null }) => {
            if (variables.resend && variables.email) {
                const client = getDbClient();
                await client.auth.resend({
                    type: "signup",
                    email: variables.email,
                });
                router.push(`/signup/verify-email?email=${email}`);
            }
        },
        { retry: false }
    );

    React.useEffect(() => {
        mutation.mutate({ resend: resend === "true", email });
    }, [resend, email, mutation]);

    return (
        <div className="w-fit h-fit flex flex-col items-center gap-4 px-4">
            <h1 className="text-xl font-bold">Check your Inbox</h1>
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-lg text-center">
                    We sent an email to{" "}
                    <span className="text-blue-500">{email}</span>, with a
                    verification link.
                </h2>
                <br />
                <h2 className="text-lg text-center">
                    Please open it to verify your account.
                </h2>
            </div>
        </div>
    );
}
