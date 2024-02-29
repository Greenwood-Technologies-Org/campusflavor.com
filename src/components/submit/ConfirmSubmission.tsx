import React, { useEffect, useState } from "react";

import Link from "next/link";
import SubmissionCard from "@/components/submit/SubmissionCard";
import { SyncLoader } from "react-spinners";
import useCreateMockupApi from "@/hooks/submit/useCreateMockupApi";
import useSubmissionApi from "@/hooks/submit/useSubmissionApi";

interface ConfirmSubmissionProps {
    isOpen: boolean;
    onClose: () => void;
    designImageUrl: string;
    mockupColor: string;
    mockupType: string;
    description: string;
    username: string;
}

const ConfirmSubmission: React.FC<ConfirmSubmissionProps> = ({
    isOpen,
    onClose,
    designImageUrl,
    mockupColor,
    mockupType,
    description,
    username,
}) => {
    const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);

    // code for handling the creation of the mockup image
    const {
        fetchMockupUrl,
        loading: mockupLoading,
        url: mockupUrl,
        error: mockupError,
    } = useCreateMockupApi();
    const handleOpen = async () => {
        await fetchMockupUrl(designImageUrl, mockupType);
    };
    useEffect(() => {
        if (isOpen) {
            handleOpen();
        }
    }, [isOpen]);

    // code for handling user pressing the submit button
    const {
        submit,
        loading: submissionLoading,
        success: submissionSuccess,
        error: submissionError,
    } = useSubmissionApi();

    const handleSubmit = async () => {
        const submissionInfo = {
            mockupImageURL: mockupUrl,
            designImageURL: designImageUrl,
            mockupColor: mockupColor,
            mockupType: mockupType,
            description: description,
            username: username,
        };
        await submit(submissionInfo);
    };

    if (!isOpen) return null;

    if (submissionLoading || mockupLoading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-10">
                <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
                    <div className="flex justify-center items-center my-8">
                        <SyncLoader
                            color="#000000"
                            size={20}
                            speedMultiplier={0.6}
                            margin={5}
                        />
                    </div>
                </div>
            </div>
        );
    }

    if (submissionSuccess) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
                <div className="bg-white p-8 space-y-5 rounded-lg shadow-lg flex flex-col items-center max-w-xs">
                    <h1 className="text-3xl">Success!</h1>
                    <p>
                        Your submission was successful. It will be posted to the
                        design board after review.
                    </p>
                    <Link href="/dboard">
                        <button className="text-white py-2 px-5 rounded-lg focus:outline-none bg-black hover:bg-gray-700">
                            Close
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-10">
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
                <h1 className="text-3xl mb-4">Preview</h1>

                <SubmissionCard
                    mockupImageUrl={mockupUrl ? mockupUrl : designImageUrl}
                    username={username}
                    description={description}
                />

                <div className="max-w-xs flex items-center space-x-2 my-4 px-4">
                    <input
                        type="checkbox"
                        id="termsCheckbox"
                        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        onChange={(e) =>
                            setIsCheckboxSelected(e.target.checked)
                        }
                    />
                    <label
                        htmlFor="termsCheckbox"
                        className="text-xs text-gray-700"
                    >
                        I agree to the challenge Legal Terms, website Terms of
                        Use, and Privacy Policy.
                    </label>
                </div>

                <div className="flex space-x-4 w-full">
                    <button
                        className="flex-grow border-2 border-gray-300 text-black py-2 w-full rounded-lg hover:bg-gray-200 focus:outline-none"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        disabled={!isCheckboxSelected}
                        className={`flex-grow text-white py-2 w-full rounded-lg focus:outline-none ${!isCheckboxSelected
                            ? "bg-gray-500 text-white"
                            : "bg-black text-white hover:bg-gray-700"
                            }`}
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmSubmission;
