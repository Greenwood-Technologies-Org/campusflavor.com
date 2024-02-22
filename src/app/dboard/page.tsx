"use client";

import React, { useEffect, useState } from "react";

import { Banner } from "@/components/banner";
import GalleryPage from "@/components/gallery";
import { SubmissionObject } from "../../lib/types";
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
    }));
}

function Page() {
    const [submissions, setSubmissions] = useState<SubmissionObject[]>([]);
    const school_affiliation = "Case Western Reserve University";

    useEffect(() => {
        getURLsForSchool(school_affiliation)
            .then(setSubmissions)
            .catch(console.error);
    }, [school_affiliation]); // Dependency array controls when the effect runs

    // Since submissions is always an array, no need to check for null before mapping
    const bannerItems = submissions.map((submission) => submission.url_link);

    return (
        <main className="w-full flex flex-col flex-grow items-center">
            <Banner rotatingBannerItems={rotatingBannerItems} />
            <GalleryPage gallery={submissions} />
        </main>
    );
}

export default Page;
