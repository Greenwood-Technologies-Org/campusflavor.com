import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
                {children}
            </div>
            <Footer />
        </div>
    );
}
