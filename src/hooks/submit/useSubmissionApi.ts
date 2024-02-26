import { useState } from "react";

interface SubmissionInfo {
    mockupImageURL: string;
    designImageURL: string;
    mockupColor: string;
    mockupType: string;
    description: string;
    username: string;
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
