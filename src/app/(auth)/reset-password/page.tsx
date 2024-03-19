"use client";

import Link from "next/link";
import { ResetPasswordRequestForm } from "@/components/forms/reset-password-request-form";
import { SignInForm } from "@/components/forms/signin-form";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordRequestPage() {
    const params = useSearchParams();
    const fsi = params.get("fsi");

    return (
        <div className="w-fit h-fit flex flex-col items-center gap-4">
            <h1 className="text-xl font-bold">Reset your password</h1>
            <div className="px-4">
                <ResetPasswordRequestForm />
            </div>
        </div>
    );
}
