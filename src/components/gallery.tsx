"use client";

import React, { useState, useEffect } from "react";
import ShirtBox from "./shirt-box";
import { SubmissionObject } from "../lib/types";
import { usePathname, useSearchParams } from "next/navigation";

interface GalleryPageProps {
    gallery: SubmissionObject[];
}

const GalleryPage: React.FC<GalleryPageProps> = ({ gallery }) => {
    const [searchParams] = useSearchParams();
    const [urlSubmissionId, setUrlSubmissionId] = useState<string | null>(null);

    useEffect(() => {
        try {
            console.log(searchParams);
            if (Array.isArray(searchParams) && searchParams.length === 2) {
                const paramKey = searchParams[0];
                const paramValue = searchParams[1];
                if (paramKey === "submissionId") {
                    setUrlSubmissionId(paramValue);
                }
            }
        } catch (error) {
            console.error("Error processing search parameters:", error);
            // Set to null or handle accordingly
            setUrlSubmissionId(null);
        }
    }, [searchParams]);

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
            }}
        >
            {gallery.map((item) => (
                <ShirtBox
                    key={item.submission_id}
                    imageUrl={item.url_link}
                    username={item.username}
                    postedDate={item.posted_date}
                    submissionId={item.submission_id}
                    isHighlightedInitially={
                        urlSubmissionId === item.submission_id
                    }
                />
            ))}
        </div>
    );
};

export default GalleryPage;
