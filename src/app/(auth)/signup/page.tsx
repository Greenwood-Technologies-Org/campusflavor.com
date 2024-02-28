"use client";

import { Button } from "@/components/ui/button";
import { SignUpForm } from "@/components/forms/signup-form";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    return (
        <div className="w-fit h-fit flex flex-col items-center gap-4">
            <h1 className="text-xl font-bold">Create an account</h1>
            <SignUpForm />
            <div className="flex items-center w-full">
                <div className="border-b-2 border-gray-400 flex-grow" />
                <span className="px-2 py-0.5">or</span>
                <div className="border-b-2 border-gray-400 flex-grow" />
            </div>
            <Button className="w-full" onClick={() => router.push("/signin")}>
                Sign In
                <span className="sr-only">Sign in</span>
            </Button>
        </div>
    );
}
