"use client";

import { SignInForm } from "@/components/forms/signin-form";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function LoginPage() {
    const params = useSearchParams();
    const fsi = params.get("fsi");

    return (
        <div className="w-fit h-fit flex flex-col items-center gap-4">
            <h1 className="text-xl font-bold">Sign In</h1>
            <Suspense>
                {fsi && (
                    <div className="flex flex-col text-center">
                        <h2>Email Verified Succesfully.</h2>
                        <h2>Please Sign In.</h2>
                    </div>
                )}
            </Suspense>
            <SignInForm />
        </div>
    );
}
