"use client";

import getDbClient from "@/lib/db/db-client";
import { useMutation } from "react-query";
import { useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
    const params = useSearchParams();
    const email = params.get("email");
    const resend = params.get("resend");

    const mutation = useMutation(async (email: string) => {
        const client = getDbClient();
        await client.auth.resend({ type: "signup", email });
    });

    if (resend !== "false" && email) {
        mutation.mutate(email);
    }

    return (
        <div className="w-fit h-fit flex flex-col items-center gap-4">
            <h1 className="text-xl font-bold">
                Please verify your email address
            </h1>
            <div>
                <h2 className="text-lg">
                    We sent an email to{" "}
                    <span className="text-blue-700">{email}</span>, with a
                    verification link.
                </h2>
                <h2 className="text-lg">
                    Please click it to verify your email address.
                </h2>
            </div>
        </div>
    );
}
