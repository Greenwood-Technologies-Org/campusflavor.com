"use client";

import React, { Suspense, useEffect, useState } from "react";
import {
    SubmissionObject,
    VotingStatus,
    VotingStatusResult,
} from "@/lib/types";

import { Banner } from "@/components/banner";
import GalleryWrapper from "@/components/dboard/gallerywrapper";
import getDbClient from "@/lib/db/db-client";
import { rotatingBannerItems } from "@/lib/constants";

import CustomLoader from "@/components/CustomLoader";
import { fetchCurrentTime } from "@/lib/utils";

async function getURLsForSchool(school_affiliation: string) {
    const supabase = getDbClient();
    const { data, error } = await supabase.rpc<any, any>(
        "get_competition_submission_information",
        { school_affil: school_affiliation }
    );

    if (error) {
        throw new Error(error.message);
    }

    return data.map((item: any) => ({
        url_link: item.url_link,
        username: item.username,
        posted_date: item.posted_date,
        submission_id: item.submission_id,
        rank: item.rank,
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
): Promise<VotingStatusResult> {
    const supabase = getDbClient();
    const { data, error } = await supabase.rpc("get_competition_dates", {
        school_affil: school_affiliation,
    });

    if (error) {
        throw new Error(error.message);
    }

    const dataObject = extractCompetitionDates(data);
    const submissionStart = new Date(dataObject.submissionStart);
    const submissionEnd = new Date(dataObject.submissionEnd);
    const votingStart = new Date(dataObject.votingStart);
    const votingEnd = new Date(dataObject.votingEnd);

    const currentDate = new Date();
    const currentTime = (await fetchCurrentTime()).getTime();

    if (currentDate < submissionStart) {
        // Before submission period.
        return {
            votingStatus: VotingStatus.NotStarted,
            countdownTimestamp: submissionStart.getTime() - currentTime,
        };
    } else if (currentDate >= submissionStart && currentDate <= submissionEnd) {
        // During submission period.
        return {
            votingStatus: VotingStatus.Prevoting,
            countdownTimestamp: submissionEnd.getTime() - currentTime,
        };
    } else if (currentDate > submissionEnd && currentDate < votingStart) {
        // After submission period, before voting.
        return {
            votingStatus: VotingStatus.Intermission,
            countdownTimestamp: votingStart.getTime() - currentTime,
        };
    } else if (currentDate >= votingStart && currentDate <= votingEnd) {
        // During voting period.
        return {
            votingStatus: VotingStatus.Voting,
            countdownTimestamp: votingEnd.getTime() - currentTime,
        };
    } else if (currentDate > votingEnd) {
        // After voting period.
        // Assuming the cycle might restart or there's a next event to count down to, adjust accordingly.
        // If there's no next event, you might want to handle this differently.
        return {
            votingStatus: VotingStatus.Finished,
            countdownTimestamp: null, // or provide the timestamp for when the next cycle/event is expected to start, if known.
        };
    }
    return {
        votingStatus: VotingStatus.Finished,
        countdownTimestamp: null, // or provide the timestamp for when the next cycle/event is expected to start, if known.
    };
}

function Page() {
    const [submissions, setSubmissions] = useState<SubmissionObject[]>([]);

    const [votingInfo, setVotingInfo] = useState<VotingStatusResult>({
        votingStatus: VotingStatus.NotStarted, // Default voting status
        countdownTimestamp: -1, // Default timestamp
    });
    const school_affiliation = "Case Western Reserve University";

    useEffect(() => {
        getURLsForSchool(school_affiliation)
            .then(setSubmissions)
            .catch(console.error);
    }, [school_affiliation]);

    useEffect(() => {
        determineVotingStatusByDate().then(setVotingInfo).catch(console.error);
    }, []);

    const [isArbitraryLoading, setIsArbitraryLoading] = useState(true);
    useEffect(() => {
        const randomTime = Math.random() * 1000 + 2000; // This will generate a number between 2000 and 3000

        const timer = setTimeout(() => {
            setIsArbitraryLoading(false);
        }, randomTime);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {isArbitraryLoading ? (
                <div className="fixed top-0 left-0 z-50 flex justify-center items-center w-full h-full bg-white">
                    <CustomLoader src="/logos/128x128.svg" />
                </div>
            ) : null}

            <div className="w-full flex flex-col flex-grow items-center">
                <Banner
                    rotatingBannerItems={rotatingBannerItems}
                    votingStatusParam={votingInfo}
                />
                <Suspense fallback={<div>Loading...</div>}>
                    <GalleryWrapper
                        gallery={submissions}
                        votingStatusParam={votingInfo}
                    />
                </Suspense>
            </div>
        </div>
    );
}

export default Page;
