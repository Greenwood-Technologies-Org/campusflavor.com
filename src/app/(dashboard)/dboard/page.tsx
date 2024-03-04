"use client";

import React, { Suspense, useEffect, useState } from "react";
import { SubmissionObject, VotingStatus } from "@/lib/types";

import { Banner } from "@/components/banner";
import GalleryPage from "@/components/gallery";
import getDbClient from "@/lib/db/db-client";
import { rotatingBannerItems } from "@/lib/constants";

async function getURLsForSchool(school_affiliation: string) {
    const supabase = getDbClient();
    const { data, error } = await supabase.rpc<any, any>(
        "get_competition_submission_information",
        { school_affil: school_affiliation }
    );

    if (error) {
        throw new Error(error.message);
    }

    console.log(data);

    return data.map((item: any) => ({
        url_link: item.url_link,
        username: item.username,
        posted_date: item.posted_date,
        submission_id: item.submission_id,
    }));
}

function extractCompetitionDates(datesArray: any[]) {
    // Check if the array is of length 1
    if (datesArray.length == 0) {
        throw new Error("Input array must be greater than 0");
    }

    // Extract the object from the array
    const competitionInfo = datesArray[0];

    // Destructure the needed properties from the object
    const {
        submission_start: submissionStart,
        submission_end: submissionEnd,
        voting_start: votingStart,
        voting_end: votingEnd,
    } = competitionInfo;

    // Return the extracted information
    return {
        submissionStart,
        submissionEnd,
        votingStart,
        votingEnd,
    };
}

async function determineVotingStatusByDate(
    school_affiliation = "Case Western Reserve University"
) {
    const supabase = getDbClient();
    const { data, error } = await supabase.rpc<any, any>(
        "get_competition_dates",
        { school_affil: school_affiliation }
    );

    if (error) {
        throw new Error(error.message);
    }

    const dataObject = extractCompetitionDates(data);
    const submissionStart = new Date(dataObject.submissionStart);
    const submissionEnd = new Date(dataObject.submissionEnd);
    const votingStart = new Date(dataObject.votingStart);
    const votingEnd = new Date(dataObject.votingEnd);

    const currentDate = new Date();

    if (currentDate < submissionStart) {
        // If the current date is before the submission period has started.
        return VotingStatus.NotStarted;
    } else if (currentDate >= submissionStart && currentDate <= submissionEnd) {
        // If the current date is between the start and end of the submission period.
        return VotingStatus.Prevoting;
    } else if (currentDate > submissionEnd && currentDate < votingStart) {
        // If the current date is after the submission period but before voting starts.
        return VotingStatus.Intermission; // Assuming there's a period between submission end and voting start.
    } else if (currentDate >= votingStart && currentDate <= votingEnd) {
        // If the current date is between the start and end of the voting period.
        return VotingStatus.Voting;
    } else if (currentDate > votingEnd) {
        // If the current date is after the voting period.
        return VotingStatus.Finished;
    }
    return VotingStatus.NotStarted;
}

function Page() {
    const [submissions, setSubmissions] = useState<SubmissionObject[]>([]);
    const [votingStatus, setVotingStatus] = useState<VotingStatus>(
        VotingStatus.Prevoting
    );
    const school_affiliation = "Case Western Reserve University";

    useEffect(() => {
        getURLsForSchool(school_affiliation)
            .then(setSubmissions)
            .catch(console.error);
    }, [school_affiliation]);

    useEffect(() => {
        determineVotingStatusByDate()
            .then(setVotingStatus)
            .catch(console.error);
    }, []);

    const bannerItems = submissions.map((submission) => submission.url_link);

    return (
        <main className="w-full flex flex-col flex-grow items-center">
            <Banner
                rotatingBannerItems={rotatingBannerItems}
                votingStatusParam={votingStatus}
            />
            <Suspense fallback={<div>Loading...</div>}>
                <GalleryPage
                    gallery={submissions}
                    votingStatusParam={votingStatus}
                />
            </Suspense>
        </main>
    );
}

export default Page;
