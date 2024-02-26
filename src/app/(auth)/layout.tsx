export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <body>
            <main className="w-full h-screen flex flex-col items-center justify-center fixed z-10 bg-secondary-500">
                {children}
            </main>
        </body>
    );
}
