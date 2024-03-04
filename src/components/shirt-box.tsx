// ShirtBox.tsx or wherever your ShirtBox component is defined
"use client";
import Image from "next/image";
import React, { useState, useEffect, forwardRef, useRef } from "react";
import LikeButton from "./ui/like_button";
import getDbClient from "@/lib/db/db-client";
import ShareButton from "./ui/share_botton";
import { VotingStatus } from "@/lib/types";

function timeAgo(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const daysAgo = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (daysAgo <= 0) {
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
    votingStatus: VotingStatus;
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

// Define the getShirtBoxBottom function
function getShirtBoxBottom({
    username,
    postedDate,
    submissionId,
    likeStatus,
    votingStatus,
    user_id,
    internalRef,
}: {
    username: string;
    postedDate: string;
    submissionId: string;
    likeStatus: { initialCount: number; isInitiallyLiked: boolean };
    votingStatus: VotingStatus;
    user_id: string;
    internalRef: React.RefObject<HTMLDivElement>;
}) {
    return (
        <div>
            <div className="text-gray-800">
                <p className="font-bold m-0 mb-1">@{username}</p>
                <p className="text-gray-600 m-0">{timeAgo(postedDate)}</p>
            </div>
            <ShareButton
                submissionId={submissionId}
                onShare={() => {
                    internalRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                        inline: "nearest",
                    });
                }}
            />
            {votingStatus === VotingStatus.Voting && (
                <LikeButton
                    initialCount={likeStatus.initialCount}
                    isInitiallyLiked={likeStatus.isInitiallyLiked}
                    submissionId={submissionId}
                    user_id={user_id}
                />
            )}
        </div>
    );
}

function getShirtBox({
    internalRef,
    props,
    imageUrl,
    username,
    postedDate,
    submissionId,
    isHighlighted,
    likeStatus,
    votingStatus,
    user_id,
}: {
    internalRef: React.RefObject<HTMLDivElement>;
    props: any;
    imageUrl: string;
    username: string;
    postedDate: string;
    submissionId: string;
    isHighlighted: boolean;
    likeStatus: { initialCount: number; isInitiallyLiked: boolean };
    votingStatus: VotingStatus;
    user_id: string;
}) {
    return (
        <div
            ref={internalRef}
            {...props}
            className={`border-2 border-gray-300 p-4 rounded-lg w-full max-w-xs my-2 text-center ${isHighlighted ? 'bg-yellow-50' : 'bg-white'}`}
        >
            <img
                src={imageUrl}
                alt="Shirt"
                className="max-w-full h-auto mb-4 rounded-lg"
            />
            {getShirtBoxBottom({ username, postedDate, submissionId, likeStatus, votingStatus, user_id, internalRef })}
        </div>
    );
}


const ShirtBox = forwardRef<HTMLDivElement, ShirtBoxProps>(
    (
        {
            imageUrl,
            username,
            postedDate,
            submissionId,
            isHighlightedInitially = false,
            votingStatus,
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


        return getShirtBox({
            internalRef: internalRef,
            props: props,
            imageUrl: imageUrl,
            username: username,
            postedDate: postedDate,
            submissionId: submissionId,
            isHighlighted: isHighlighted,
            likeStatus: likeStatus,
            votingStatus: votingStatus,
            user_id: user_id,
        });
    }
);

ShirtBox.displayName = "ShirtBox";
export default ShirtBox;
