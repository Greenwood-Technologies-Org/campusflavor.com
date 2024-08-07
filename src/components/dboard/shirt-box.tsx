// ShirtBox.tsx or wherever your ShirtBox component is defined
"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";

import { Icons } from "../icons";
import Image from "next/image";
import LikeButton from "./like_button";
import ShareButton from "./share_botton";
import { VotingStatus } from "@/lib/types";
import getDbClient from "@/lib/db/db-client";
import { useSearchParams } from "next/navigation";
import useSession from "@/hooks/use-session";

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
    rank,
}: {
    username: string;
    postedDate: string;
    submissionId: string;
    likeStatus: { initialCount: number; isInitiallyLiked: boolean };
    votingStatus: VotingStatus;
    user_id: string;
    internalRef: React.RefObject<HTMLDivElement>;
    rank: number;
}) {
    return (
        <div className="flex justify-between items-center mx-4 mt-4">
            <p className="text-gray-800 text-xl">@{username}</p>

            {(votingStatus === VotingStatus.Voting ||
                votingStatus === VotingStatus.Finished) && (
                <span className="text-sm font-semibold bg-gray-300 text-gray-800 py-1 px-2 rounded-full">
                    #{rank}
                </span>
            )}
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
                    votingStatus={votingStatus}
                />
            </div>
        </div>
    );
}

export type ShirtBoxProps = {
    imageUrl: string;
    username: string;
    postedDate: string;
    submissionId: string;
    isHighlighted?: boolean;
    votingStatus: VotingStatus;
    rank: number;
    borderColor: string;
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
            rank,
            borderColor,
            ...props
        },
        ref
    ) => {
        const [imageLoaded, setImageLoaded] = useState(false); // New state to track image loading

        const [likeStatus, setLikeStatus] = useState({
            initialCount: 0,
            isInitiallyLiked: false,
        });

        const session = useSession();

        const internalRef = useRef<HTMLDivElement>(null); // Internal ref for scrolling

        let user_id = session.session?.user.id || "";

        const searchParams = useSearchParams();
        const submissionidParams = searchParams.get("submissionId");

        useEffect(() => {
            if (submissionidParams == submissionId && imageLoaded) {
                internalRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                });
            }
        }, [submissionidParams, submissionId, imageLoaded]);
        useEffect(() => {
            const fetchLikeStatus = async () => {
                let initialCount = await getInitialVoteCount(submissionId);

                if (user_id !== "") {
                    let isInitiallyLiked = await getVotedForUser(
                        user_id,
                        submissionId
                    );

                    setLikeStatus({
                        initialCount: initialCount,
                        isInitiallyLiked: isInitiallyLiked,
                    });
                } else {
                    setLikeStatus({
                        initialCount: initialCount,
                        isInitiallyLiked: false,
                    });
                }
            };

            fetchLikeStatus();
        }, [submissionId, user_id]);

        return (
            <div
                ref={internalRef}
                {...props}
                className={`border-2 ${
                    isHighlighted ? "border-[#5A61FF]" : borderColor
                } p-4 rounded-lg w-full text-center`}
            >
                <Image
                    src={imageUrl}
                    alt="Mockup Image"
                    className="w-full h-auto aspect-square object-cover rounded-lg"
                    onError={() => {
                        <Icons.noImage />;
                    }}
                    width={1080}
                    height={720}
                    onLoadingComplete={() => setImageLoaded(true)} // Use the onLoadingComplete callback to set imageLoaded to true
                ></Image>
                {ShirtBoxBottom({
                    username,
                    postedDate,
                    submissionId,
                    likeStatus,
                    votingStatus,
                    user_id,
                    internalRef,
                    rank,
                })}
            </div>
        );
    }
);

ShirtBox.displayName = "ShirtBox";
export default ShirtBox;
