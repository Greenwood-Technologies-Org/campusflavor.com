"use client";

import Link from "next/link";

export default function CeaseAndDesist() {
    return (
        <div className="p-2 md:w-1/2 md:h-3/5 flex flex-col">
            <p className="text-lg">
                Hello,
                <br />
                <br />
                We got a{" "}
                <Link
                    className="text-blue-500 underline"
                    href={"/documents/cease-and-desist-letter.pdf"}
                >
                    cease and desist
                </Link>{" "}
                letter from the school.
                <br />
                <br />
                We are trying to talk it out with them. The outcome is
                uncertain.
                <br />
                <br />
                We thank everyone who submitted designs, shared this with their
                friends, or just thought this was a funny attempt at improving
                our spirit.
                <br />
                <br />
                Regards,
                <br />
                The Campus Flavor Team.
            </p>
        </div>
    );
}
