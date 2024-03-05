// ShirtBox.tsx or wherever your ShirtBox component is defined
"use client";
import Image from "next/image";
import React, { useState, useEffect, forwardRef, useRef } from "react";
import LikeButton from "./like_button";
import getDbClient from "@/lib/db/db-client";
import ShareButton from "./share_botton";
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

function ShirtBoxBottom({
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
    if (votingStatus === VotingStatus.NotStarted || votingStatus === VotingStatus.Prevoting || votingStatus === VotingStatus.Intermission) {
        return (
            <div className="flex justify-between items-center mx-4 mt-4">
                <p className="text-gray-800 text-xl">@{username}</p>
                <p className="text-gray-600 text-xs">{timeAgo(postedDate)}</p>
            </div>
        );
    } else if (votingStatus === VotingStatus.Voting || votingStatus === VotingStatus.Finished) {
        return (
            <div className="flex justify-between items-center mx-4 mt-4">
                <p className="text-gray-800 text-xl">@{username}</p>
                <div className="flex space-x-2 items-center">
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
                    <LikeButton
                        initialCount={likeStatus.initialCount}
                        isInitiallyLiked={likeStatus.isInitiallyLiked}
                        submissionId={submissionId}
                        user_id={user_id}
                        enableClick={votingStatus === VotingStatus.Voting}
                    />
                </div>
            </div>
        );
    } else {
        console.log('Unknown voting status.');
    }
}

export type ShirtBoxProps = {
    imageUrl: string;
    username: string;
    postedDate: string;
    submissionId: string;
    isHighlighted?: boolean;
    votingStatus: VotingStatus;
};

const ShirtBox = forwardRef<HTMLDivElement, ShirtBoxProps>(
    (
        {
            imageUrl,
            username,
            postedDate,
            submissionId,
            isHighlighted,
            votingStatus,
            ...props
        },
        ref
    ) => {
        const [likeStatus, setLikeStatus] = useState({
            initialCount: 0,
            isInitiallyLiked: false,
        });

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

        const [imgSrc, setImgSrc] = useState(imageUrl);
        const fallbackImage = '/icons/no-image.svg';


        return (
            <div
                ref={internalRef}
                {...props}
                className={`border-2 ${isHighlighted ? 'border-[#5A61FF]' : 'border-gray-300'} p-4 rounded-lg w-full text-center`}
            >
                <img
                    src={imgSrc}
                    alt="Mockup Image"
                    className="w-full h-auto aspect-square object-cover rounded-lg"
                    onError={(e) => e.currentTarget.src = fallbackImage}
                />
                {ShirtBoxBottom({ username, postedDate, submissionId, likeStatus, votingStatus, user_id, internalRef })}
            </div>
        );
    }
);

ShirtBox.displayName = "ShirtBox";
export default ShirtBox;
