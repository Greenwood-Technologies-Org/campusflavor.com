import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function StaticContentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <Navbar />
            <div className="flex flex-col items-center py-4">{children}</div>
            <Footer />
        </main>
    );
}
