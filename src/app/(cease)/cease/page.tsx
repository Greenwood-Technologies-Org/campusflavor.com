"use client";

import Link from "next/link";

export default function CeaseAndDesist() {
    return (
        <div className="p-4 flex flex-col items-center justify-center">
            <p className="text-xl">
                On hold pending conversation with the University…
                <br />
                <span className="text-sm text-gray-400">
                    Please check regularly for updates.
                </span>
                <br />
                <br />
                Have a question or just want to connect?
                <br />
                <Link
                    className="text-blue-500 underline"
                    href="mailto:contact@campusflavor.com"
                >
                    contact@campusflavor.com
                </Link>
            </p>
        </div>
    );
}
