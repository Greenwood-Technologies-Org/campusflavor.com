"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function VerifyEmailPage() {
    const params = useSearchParams();
    const email = params.get("email");

    return (
        <Suspense>
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
        </Suspense>
    );
}
