import React, { useState, useEffect } from 'react';
import SubmissionCard from '@/components/submit/SubmissionCard';
import { SyncLoader } from 'react-spinners';

import useCreateMockupApi from '@/hooks/submit/useCreateMockupApi';
import useSubmissionApi from '@/hooks/submit/useSubmissionApi';

interface ConfirmSubmissionProps {
    isOpen: boolean;
    onClose: () => void;
    designImage: string;
    mockupColor: string;
    mockupType: string;
    description: string;
    username: string;
}

const ConfirmSubmission: React.FC<ConfirmSubmissionProps> = ({
    isOpen,
    onClose,
    designImage,
    mockupColor,
    mockupType,
    description,
    username,
}) => {

    const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);

    const { data: mockupData, loading: mockupLoading, error: mockupError } = useCreateMockupApi(designImage);

    const { submit, loading: submissionLoading, success: submissionSuccess, error: submissionError } = useSubmissionApi();
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async () => {
        console.log("Submitting...");
        const submissionInfo = {
            imageURL: designImage,
            mockupColor: mockupColor,
            mockupType: mockupType,
            description: description,
            username: username
        };
        await submit(submissionInfo);
        setShowSuccess(true);
    };

    if (!isOpen) return null;

    if (submissionLoading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-10">
                <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
                    <div className="flex justify-center items-center my-8">
                        <SyncLoader color="#000000" size={20} speedMultiplier={0.6} margin={5} />
                    </div>
                </div>
            </div>
        )
    }

    if (submissionSuccess) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-10">
                <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
                    <h1 className="text-3xl mb-4">Success!</h1>
                    <p className="text-gray-700 text-center">Your submission was successful. You can view it in the gallery.</p>
                    <button
                        className="bg-black text-white py-2 w-full rounded-lg focus:outline-none mt-4"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-10">
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
                <h1 className="text-3xl mb-4">Preview</h1>

                {
                    mockupLoading ? (
                        <div className="flex justify-center items-center my-8">
                            <SyncLoader color="#000000" size={20} speedMultiplier={0.6} margin={5} />
                        </div>
                    ) : (
                        <SubmissionCard
                            mockupImageUrl={mockupData ? mockupData.url : designImage}
                            username={username}
                            description={description}
                        />
                    )
                }

                <div className="max-w-xs flex items-center space-x-2 my-4 px-4">
                    <input
                        type="checkbox"
                        id="termsCheckbox"
                        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        onChange={(e) => setIsCheckboxSelected(e.target.checked)}
                    />
                    <label htmlFor="termsCheckbox" className="text-xs text-gray-700">
                        I agree to the challenge Legal Terms, website Terms of Use, and Privacy Policy.
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
                        className={`flex-grow text-white py-2 w-full rounded-lg focus:outline-none ${!isCheckboxSelected ? 'bg-gray-500 text-white' : 'bg-black text-white hover:bg-gray-700'}`}
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
