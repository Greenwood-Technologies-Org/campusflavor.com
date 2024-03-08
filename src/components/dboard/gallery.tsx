"use client";

import React, { useEffect, useState } from "react";
import {
    SubmissionObject,
    VotingStatus,
    VotingStatusResult,
} from "../../lib/types";
import { usePathname, useSearchParams } from "next/navigation";

import ShirtBox from "./shirt-box";
import { stat } from "fs";

interface GalleryPageProps {
    gallery: SubmissionObject[];
    votingStatusParam: VotingStatusResult;
}
// Band-aid solution to rendering the desired objects
function moveSubmissionIdToFront(
    submissions: SubmissionObject[],
    submissionId: string
) {
    // Find the index of the submission with the matching submission_id
    const index = submissions.findIndex(
        (submission) => submission.submission_id === submissionId
    );

    // If found and it's not already the first element, move it to the front
    if (index > 0) {
        const [itemToMove] = submissions.splice(index, 1); // Remove the item from its current position
        submissions.unshift(itemToMove); // Add it to the beginning of the array
    }
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
                    moveSubmissionIdToFront(gallery, paramValue);
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
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {gallery.map((item) => (
                <ShirtBox
                    key={item.submission_id}
                    imageUrl={item.url_link}
                    username={item.username}
                    postedDate={item.posted_date}
                    submissionId={item.submission_id}
                    isHighlighted={urlSubmissionId === item.submission_id}
                    votingStatus={votingStatus.votingStatus}
                />
            ))}
        </div>
    );
};

export default GalleryPage;
