"use client";

import "./globals.css";

import { QueryClient, QueryClientProvider } from "react-query";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [client] = React.useState(new QueryClient());

    return (
        <html lang="en">
            <body
                className={`w-screen min-h-screen ${inter.className} bg-secondary-500 flex flex-col custom-scrollbar overflow-x-hidden`}
            >
                <QueryClientProvider client={client}>
                    {children}
                </QueryClientProvider>
            </body>
        </html>
    );
}
