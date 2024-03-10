"use client";

import "./globals.css";

import { QueryClient, QueryClientProvider } from "react-query";

import Metrics from "@/metrics/index";

import { Inter } from "next/font/google";
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
                className={`${inter.className}`}
            >
                <QueryClientProvider client={client}>
                    {children}
                </QueryClientProvider>
                <Metrics />
            </body>
        </html>
    );
}
