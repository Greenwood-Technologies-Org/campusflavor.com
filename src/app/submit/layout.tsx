import "../globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`w-screen min-h-screen ${inter.className} bg-secondary-500 flex flex-col custom-scrollbar overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}