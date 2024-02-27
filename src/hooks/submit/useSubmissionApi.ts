import { cwru_competition_id } from "@/lib/constants";
import getDbClient from "@/lib/db/db-client";
import { useState } from "react";

interface SubmissionInfo {
    mockupImageURL: string;
    designImageURL: string;
    mockupColor: string;
    mockupType: string;
    description: string;
    username: string;
}

async function insert_submission_records(submissionInfo: SubmissionInfo) {
    const supabase = getDbClient();
    const user_uuid = await get_user_id(submissionInfo.username);
    const { data, error } = await supabase.rpc<any, any>("insert_submission", {
        _competition_id: cwru_competition_id,
        _user_id: user_uuid,
        _description: submissionInfo.description,
        _mockup_type: submissionInfo.mockupType,
        _approved: false,
        _mockup_color: submissionInfo.mockupColor,
    });
    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
}

async function get_user_id(username: string) {
    return "6cce32da-7bf7-42f9-a487-25cf27b52cf4";
}

const useSubmissionApi = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const submit = async (submissionInfo: SubmissionInfo) => {
        console.log("Submitting");
        console.log(submissionInfo);

        setLoading(true);
        setError("");
        try {
            // Simulate API call with a timeout
            await new Promise((resolve) => setTimeout(resolve, 2000));

            console.log(
                "Who's stronger you or him? If Sukuna regained all his fingers I might have a little trouble. But would you lose? Nah I'd win"
            );

            await insert_submission_records(submissionInfo);

            // Set success state
            setSuccess(true);
        } catch (e) {
            setError("Submission failed");
        } finally {
            setLoading(false);
        }
    };

    return { submit, loading, success, error };
};

export default useSubmissionApi;
