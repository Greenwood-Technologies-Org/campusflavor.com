import { cwru_competition_id, get_user_id } from "@/lib/constants";
import getDbClient from "@/lib/db/db-client";
import { uploadMockupAndDesignImages } from "./fileGenerationUpload";
import { useState } from "react";

interface SubmissionInfo {
    mockupImageURL: string;
    designImageURL: string;
    mockupColor: string;
    mockupType: string;
    description: string;
    username: string;
}

async function insert_submission_records(
    submissionInfo: SubmissionInfo
): Promise<String> {
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
    return data;
}

async function insert_file_records(
    submission_id: String,
    file_url: String,
    mockup_image_url: String
): Promise<void> {
    const supabase = getDbClient();
    const result = await supabase.rpc("insert_file_upload", {
        _submission_id: submission_id,
        _time: new Date(),
        _used: false,
        _metadata: "Some metadata",
        _file_url: file_url,
        _mockup_image_url: mockup_image_url,
    });

    if (result.error) {
        console.error(result.error.message);
    } else {
        console.log("New file upload entry inserted with ID:", result.data);
    }
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
            const { mockupImageUrl, designImageUrl } =
                await uploadMockupAndDesignImages(
                    submissionInfo.mockupImageURL,
                    submissionInfo.designImageURL
                );

            const submission_id = await insert_submission_records(
                submissionInfo
            );

            await insert_file_records(
                submission_id,
                designImageUrl,
                mockupImageUrl
            );

            // Set success state
            setSuccess(true);
        } catch (e) {
            setError("Submission failed");
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    return { submit, loading, success, error };
};

export default useSubmissionApi;
