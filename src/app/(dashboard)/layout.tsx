import Navbar from "@/components/navbar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="w-full h-screen flex flex-col items-center justify-center bg-secondary-500">
            <Navbar />
            {children}
        </main>
    );
}
