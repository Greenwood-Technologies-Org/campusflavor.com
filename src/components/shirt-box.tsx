// ShirtBox.tsx or wherever your ShirtBox component is defined
"use client";
import Image from "next/image";
import React, { useState, useEffect, forwardRef, useRef } from "react";
import LikeButton from "./ui/like_button";
import getDbClient from "@/lib/db/db-client";
import ShareButton from "./ui/share_botton";

function timeAgo(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const daysAgo = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (daysAgo == 0) {
        return "today";
    } else if (daysAgo == 1) {
        return "1 day ago";
    } else {
        return `${daysAgo} days ago`;
    }
}

export type ShirtBoxProps = {
    imageUrl: string;
    username: string;
    postedDate: string;
    submissionId: string;
    isHighlightedInitially?: boolean;
};

async function getInitialVoteCount(submission_id: string) {
    const supabase = getDbClient();
    const { data, error } = await supabase.rpc<any, any>(
        "get_submission_count",
        { _submission_id: submission_id }
    );

    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    return data;
}

async function getVotedForUser(user_id: string, submission_id: string) {
    const supabase = getDbClient();
    const { data, error } = await supabase.rpc<any, any>(
        "check_user_submission_exists",
        { _user_id: user_id, _submission_id: submission_id }
    );

    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    return data;
}

const ShirtBox = forwardRef<HTMLDivElement, ShirtBoxProps>(
    (
        {
            imageUrl,
            username,
            postedDate,
            submissionId,
            isHighlightedInitially = false,
            ...props
        },
        ref
    ) => {
        const [likeStatus, setLikeStatus] = useState({
            initialCount: 0,
            isInitiallyLiked: false,
        });
        const [isHighlighted, setIsHighlighted] = useState(
            isHighlightedInitially
        );

        const internalRef = useRef<HTMLDivElement>(null); // Internal ref for scrolling

        let user_id = "6cce32da-7bf7-42f9-a487-25cf27b52cf4";
        useEffect(() => {
            const fetchLikeStatus = async () => {
                let initialCount = await getInitialVoteCount(submissionId);
                let isInitiallyLiked = await getVotedForUser(
                    user_id,
                    submissionId
                );

                setLikeStatus({
                    initialCount: initialCount,
                    isInitiallyLiked: isInitiallyLiked,
                });
            };

            fetchLikeStatus();
        }, [submissionId]);

        useEffect(() => {
            if (isHighlightedInitially) {
                setTimeout(() => setIsHighlighted(false), 2000); // Remove highlight after 2 seconds
            }
        }, [isHighlightedInitially]);
        return (
            <div
                ref={internalRef}
                {...props}
                style={{
                    border: "1px solid #ccc",
                    padding: "1em", // use em units that scale with zoom
                    borderRadius: "8px",
                    width: "100%", // use 100% width for fluid responsiveness
                    maxWidth: "300px", // limit the maximum width to 300px
                    margin: "0.5em", // use em units for margins
                    textAlign: "center",
                    backgroundColor: isHighlighted ? "#ffffe0" : "#fff",
                    boxShadow: isHighlighted
                        ? "0 2px 6px rgba(255, 165, 0, 0.7)"
                        : "0 2px 4px rgba(0, 0, 0, 0.1)",
                    transition:
                        "background-color 0.3s ease, box-shadow 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flexGrow: 1,
                    flexShrink: 1,
                    flexBasis: "auto",
                }}
            >
                <img
                    src={imageUrl}
                    alt="Shirt"
                    style={{
                        maxWidth: "100%",
                        height: "auto",
                        marginBottom: "16px",
                        borderRadius: "8px",
                    }}
                />
                <div style={{ color: "#333" }}>
                    <p style={{ fontWeight: "bold", margin: "0 0 4px 0" }}>
                        @{username}
                    </p>
                    <p style={{ color: "#666", margin: 0 }}>
                        {timeAgo(postedDate)}
                    </p>
                </div>
                <ShareButton
                    submissionId={submissionId}
                    onShare={() => {
                        internalRef.current?.scrollIntoView({
                            behavior: "smooth",
                            block: "center", // Attempt to center the element in the viewport
                            inline: "nearest", // For horizontal scrolling, if necessary
                        });
                    }}
                />
                <LikeButton
                    initialCount={likeStatus.initialCount}
                    isInitiallyLiked={likeStatus.isInitiallyLiked}
                    submissionId={submissionId}
                    user_id={user_id}
                />
            </div>
        );
    }
);

ShirtBox.displayName = "ShirtBox";
export default ShirtBox;
