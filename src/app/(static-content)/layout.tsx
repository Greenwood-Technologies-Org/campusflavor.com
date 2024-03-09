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
            {children}
            <Footer />
        </main>
    );
}
