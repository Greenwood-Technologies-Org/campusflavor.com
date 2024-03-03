import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="w-full h-screen flex flex-col items-center justify-start">
            <header className="absolute w-full h-fit p-4">
                <Link href="/competitions">
                    <div className="flex items-center">
                        <Image
                            src="/logos/logo_main_no_bg.svg"
                            alt="Campus Flavor Logo"
                            height={60}
                            width={150}
                            priority
                        />
                    </div>
                </Link>
            </header>
            <div className="w-full h-full flex flex-col items-center justify-center">
                <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </div>
        </main>
    );
}
