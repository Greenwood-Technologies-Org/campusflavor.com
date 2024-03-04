"use client";

import React, { useEffect, useState } from "react";
import { SubmissionObject, VotingStatus } from "../../lib/types";
import { usePathname, useSearchParams } from "next/navigation";

import ShirtBox from "./shirt-box";

interface GalleryPageProps {
    gallery: SubmissionObject[];
    votingStatusParam: VotingStatus;
}

function determineVotingStatusByDate(): VotingStatus {
    // const currentDate = new Date();
    // const prevotingEndDate = new Date("2024-03-05"); // Example date for when prevoting ends
    // const votingEndDate = new Date("2024-04-02"); // Example date for when voting ends

    // if (currentDate <= prevotingEndDate) {
    //     return VotingStatus.Prevoting;
    // } else if (currentDate <= votingEndDate) {
    //     return VotingStatus.Voting;
    // } else {
    //     return VotingStatus.Finished;
    // }

    return VotingStatus.Voting;
}

const GalleryPage: React.FC<GalleryPageProps> = ({
    gallery,
    votingStatusParam,
}) => {
    const [searchParams] = useSearchParams();
    const [urlSubmissionId, setUrlSubmissionId] = useState<string | null>(null);
    const [votingStatus, setVotingStatus] =
        useState<VotingStatus>(votingStatusParam);

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

    useEffect(() => {
        const statusFromApi: VotingStatus = determineVotingStatusByDate(); // This should just be a function that checks the date and returns a votingStatus depending on the result

        if (statusFromApi === VotingStatus.NotStarted) {
            // Handle prevoting logic here
            setVotingStatus(VotingStatus.NotStarted);
        } else if (statusFromApi === VotingStatus.Prevoting) {
            // Handle prevoting logic here
            setVotingStatus(VotingStatus.Prevoting);
        } else if (statusFromApi === VotingStatus.Intermission) {
            // Handle voting logic here
            setVotingStatus(VotingStatus.Intermission);
        } else if (statusFromApi === VotingStatus.Voting) {
            // Handle voting logic here
            setVotingStatus(VotingStatus.Voting);
        } else if (votingStatus === VotingStatus.Finished) {
            // Handle finished logic here
            setVotingStatus(VotingStatus.Finished);
        }
        console.log(votingStatus);
    }, [votingStatus]);

    return (
        <div
            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4"
        >
            {gallery.map((item) => (
                <ShirtBox
                    key={item.submission_id}
                    imageUrl={item.url_link}
                    username={item.username}
                    postedDate={item.posted_date}
                    submissionId={item.submission_id}
                    isHighlighted={urlSubmissionId === item.submission_id}
                    votingStatus={votingStatus}
                />
            ))}
        </div>
    );
};

export default GalleryPage;
