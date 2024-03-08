"use client";

import React, { useEffect, useState } from "react";
import { SubmissionObject, VotingStatusResult } from "../../lib/types";
import { useSearchParams } from "next/navigation";

import GalleryPage from "./gallery"; // Make sure this path is correct based on your project structure

const moveSubmissionIdToFront = (
    submissions: SubmissionObject[],
    submissionId: string
) => {
    const index = submissions.findIndex(
        (submission) => submission.submission_id === submissionId
    );
    if (index > 0) {
        const [itemToMove] = submissions.splice(index, 1);
        submissions.unshift(itemToMove);
    }
};

const GalleryWrapper = ({
    gallery: initialGallery,
    votingStatusParam,
}: {
    gallery: SubmissionObject[];
    votingStatusParam: VotingStatusResult;
}) => {
    const [searchParams] = useSearchParams();
    const [processedGallery, setProcessedGallery] =
        useState<SubmissionObject[]>(initialGallery);

    useEffect(() => {
        // Process the gallery based on searchParams every time either the gallery or searchParams change
        let updatedGallery = [...initialGallery]; // Clone the initialGallery to avoid directly mutating props
        if (Array.isArray(searchParams) && searchParams.length === 2) {
            const [paramKey, paramValue] = searchParams;
            if (paramKey === "submissionId" && paramValue) {
                moveSubmissionIdToFront(updatedGallery, paramValue);
            }
        }
        setProcessedGallery(updatedGallery); // Update the state with the processed gallery
    }, [initialGallery]); // React to changes in initialGallery or searchParams

    // if (initialGallery.length == 0) {
    //     return (
    //         <div className="flex justify-center items-center">
    //             <div className="w-10 h-10 border-4 border-gray-300 rounded-full animate-spin"></div>
    //         </div>
    //     );
    // }

    return (
        <GalleryPage
            gallery={processedGallery}
            votingStatusParam={votingStatusParam}
        />
    );
};

export default GalleryWrapper;
