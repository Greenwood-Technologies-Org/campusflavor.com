"use client";

import React, { useEffect, useState } from "react";
import {
    SubmissionObject,
    VotingStatus,
    VotingStatusResult,
} from "../../lib/types";
import { usePathname, useSearchParams } from "next/navigation";

import ShirtBox from "./shirt-box";

function getBorderColorByRank(rank: number, votingStage: VotingStatus): string {
    let borderColor = "border-gray-300";
    if (
        votingStage !== VotingStatus.Finished &&
        votingStage !== VotingStatus.Voting
    ) {
        return borderColor;
    }
    if (rank == 1) {
        borderColor = "border-custom-gold"; // Gold color
    } else if (rank == 2) {
        borderColor = "border-gray-800"; // Silver color
    } else if (rank == 3) {
        borderColor = "border-custom-bronze"; // Bronze color
    }
    return borderColor;
}

interface GalleryPageProps {
    gallery: SubmissionObject[];
    votingStatusParam: VotingStatusResult;
}
const GalleryPage: React.FC<GalleryPageProps> = ({
    gallery,
    votingStatusParam,
}) => {
    const [searchParams] = useSearchParams();
    const [urlSubmissionId, setUrlSubmissionId] = useState<string | null>(null);
    const [votingStatus, setVotingStatus] =
        useState<VotingStatusResult>(votingStatusParam);

    useEffect(() => {
        try {
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

    useEffect(() => {
        const statusFromApi: VotingStatus = votingStatusParam.votingStatus;

        if (statusFromApi === VotingStatus.NotStarted) {
            setVotingStatus({
                votingStatus: VotingStatus.NotStarted,
                countdownTimestamp: votingStatusParam.countdownTimestamp, // Assuming you have a timestamp here
            });
        } else if (statusFromApi === VotingStatus.Prevoting) {
            // If you need to keep the previous timestamp or set a new one
            setVotingStatus({
                votingStatus: VotingStatus.Prevoting,
                countdownTimestamp: votingStatusParam.countdownTimestamp, // Set appropriate timestamp here
            });
        } else if (statusFromApi === VotingStatus.Intermission) {
            setVotingStatus({
                votingStatus: VotingStatus.Intermission,
                countdownTimestamp: votingStatusParam.countdownTimestamp, // Set appropriate timestamp here
            });
        } else if (statusFromApi === VotingStatus.Voting) {
            setVotingStatus({
                votingStatus: VotingStatus.Voting,
                countdownTimestamp: votingStatusParam.countdownTimestamp, // Set appropriate timestamp here
            });
        } else if (statusFromApi === VotingStatus.Finished) {
            setVotingStatus({
                votingStatus: VotingStatus.Finished,
                countdownTimestamp: votingStatusParam.countdownTimestamp, // Set appropriate timestamp here
            });
        }
    }, [votingStatusParam]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {gallery.map((item) => (
                <ShirtBox
                    key={item.submission_id}
                    imageUrl={item.url_link}
                    username={item.username}
                    postedDate={item.posted_date}
                    submissionId={item.submission_id}
                    isHighlighted={urlSubmissionId === item.submission_id}
                    votingStatus={votingStatus.votingStatus}
                    rank={item.rank}
                    borderColor={getBorderColorByRank(
                        item.rank,
                        votingStatus.votingStatus
                    )}
                />
            ))}
        </div>
    );
};

export default GalleryPage;
