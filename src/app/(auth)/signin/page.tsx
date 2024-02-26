import { SignInForm } from "@/components/forms/signin-form";

export default function LoginPage() {
    return (
        <div className="w-fit h-fit flex flex-col items-center gap-4">
            <h1 className="text-xl font-bold">Sign In</h1>
            <SignInForm />
        </div>
    );
}
