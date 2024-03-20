import React from "react";
import { IoClose } from "react-icons/io5"; // make sure to install react-icons if you haven't

interface VotingModalProps {
    onClose: () => void;
    title: string;
    message: string;
}

const VotingModal: React.FC<VotingModalProps> = ({
    onClose,
    title,
    message,
}) => {
    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-700 bg-opacity-0 bg-blend-multiply">
            <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-700 bg-opacity-50">
                <div className="bg-white w-96 h-auto rounded-lg shadow-lg relative p-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-2">{title}</h2>
                        <p className="text-md text-gray-600 mb-8">{message}</p>
                    </div>
                    <div className="flex justify-between">
                        <button
                            onClick={onClose}
                            className="bg-black text-white py-2 flex-grow rounded-lg hover:bg-gray-700 focus:outline-none"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VotingModal;
