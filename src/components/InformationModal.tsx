import React from 'react';

interface InformationModalProps {
    isOpen: boolean;
    title: string;
    information: string;
    onClose: () => void;
}

const InformationModal: React.FC<InformationModalProps> = ({ isOpen, title, information, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
            <div className="bg-white p-8 space-y-8 rounded-lg shadow-lg flex flex-col items-center max-w-xs">
                <h1 className="text-3xl">{title}</h1>
                <p>{information}</p>
                <button
                    className="flex-grow text-white py-2 w-full rounded-lg focus:outline-none bg-black hover:bg-gray-700"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default InformationModal;
