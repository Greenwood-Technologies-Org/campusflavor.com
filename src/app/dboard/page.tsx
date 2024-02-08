// src/app/dboard/page.tsx
import React from "react";
import getDbClient from "@/lib/db/db-client";
import { Banner } from "@/components/banner";
import { SubmissionObject } from "../../lib/types"; // Adjust the import path as needed
import GalleryPage from "@/components/gallery";
import { rotatingBannerItems } from "@/lib/constants";

async function getURLsForSchool(school_affiliation: string) {
    const supabase = getDbClient();

    const { data, error } = await supabase.rpc<any, any>(
        "get_competition_submission_information",
        {
            school_affil: school_affiliation,
        }
    );

    if (error) {
        throw new Error(error.message);
    }

    // Forced to do this because Supabase not repsecting my Aliasing ):<
    return data.map((item: any) => ({
        url_link: item.url_link,
        username: item.username,
        posted_date: item.time, // Correcting the property name here from time
    }));
}

export default async function Page() {
    const school_affiliation = "Case Western Reserve University";
    // Ensure that the response from getURLsForSchool is of the correct type
    const submissions: SubmissionObject[] = await getURLsForSchool(
        school_affiliation
    );

    // const submissions: SubmissionObject[] = rows.map(row => ({
    //     url_link: row.url_link,
    //     username: row.username,
    //     posted_date: row.posted_date // Make sure this matches the alias in the function
    //   }));

    // console.log("Bruh");
    // console.log(submissions);
    // console.log("Bruh");
    // Extract the url_link for the Banner component
    const bannerItems = submissions.map((submission) => submission.url_link);

    return (
        <main className="w-full flex flex-col flex-grow items-center">
            <Banner rotatingBannerItems={rotatingBannerItems} />
            <GalleryPage gallery={submissions} />{" "}
            {/* Pass the entire submissions array */}
        </main>
    );
}
