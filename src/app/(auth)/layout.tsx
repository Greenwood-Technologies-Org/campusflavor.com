import { Suspense } from "react";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="w-full h-screen flex flex-col items-center justify-center bg-secondary-500">
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </main>
    );
}
