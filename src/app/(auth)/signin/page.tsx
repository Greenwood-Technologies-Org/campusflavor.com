"use client";

import Link from "next/link";
import { SignInForm } from "@/components/forms/signin-form";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
    const params = useSearchParams();
    const fsi = params.get("fsi");

    return (
        <div className="w-fit h-fit flex flex-col items-center gap-4">
            <h1 className="text-xl font-bold">Sign In</h1>
            {fsi && (
                <div className="flex flex-col text-center">
                    <h2>Email Verified Succesfully.</h2>
                    <h2>Please Sign In.</h2>
                </div>
            )}
            {!fsi && (
                <div>
                    <div className="w-full h-fit flex flex-col md:flex-row text-gray-500">
                        <p>Sign in to Campus Flavor or&nbsp;</p>
                        <div className="flex flex-row items-center justify-center">
                            <Link
                                className="text-blue-500 underline"
                                href="/signup"
                            >
                                create an account
                            </Link>
                            <p>.</p>
                        </div>
                    </div>
                </div>
            )}
            <SignInForm />
            <div className="w-full h-fit flex flex-row text-gray-500 items-center justify-center">
                <Link
                    className="text-blue-500 underline"
                    href="/reset-password"
                >
                    Reset password?
                </Link>
            </div>
        </div>
    );
}
