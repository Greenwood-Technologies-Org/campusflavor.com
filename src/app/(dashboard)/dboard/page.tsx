"use client";

import React, { useEffect, useState, Suspense } from "react";

import { Banner } from "@/components/banner";
import GalleryPage from "@/components/gallery";
import { SubmissionObject } from "@/lib/types";
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

function Page() {
    const [submissions, setSubmissions] = useState<SubmissionObject[]>([]);
    const school_affiliation = "Case Western Reserve University";

    useEffect(() => {
        getURLsForSchool(school_affiliation)
            .then(setSubmissions)
            .catch(console.error);
    }, [school_affiliation]);

    const bannerItems = submissions.map((submission) => submission.url_link);

    return (
        <main className="w-full flex flex-col flex-grow items-center">
            <Banner rotatingBannerItems={rotatingBannerItems} />
            <Suspense fallback={<div>Loading...</div>}>
                <GalleryPage gallery={submissions} />
            </Suspense>
        </main>
    );
}

export default Page;
