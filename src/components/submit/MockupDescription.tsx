import React, { useState } from "react";

import InformationModal from "@/components/InformationModal";

interface MockupDescriptionProps {
    onDescriptionChange: (description: string) => void;
}

const MockupDescription: React.FC<MockupDescriptionProps> = ({
    onDescriptionChange,
}) => {
    const maxChars = 200;
    const [description, setDescription] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const newDescription = event.target.value.slice(0, maxChars);
        setDescription(newDescription);
        onDescriptionChange(newDescription);
    };

    return (
        <div className="flex flex-col w-full h-full relative">
            <div className="flex items-center mb-2">
                <p className="text-lg font-semibold text-black text-left">
                    Description
                </p>
                <img
                    src="/icons/info.svg"
                    alt="Info"
                    className="ml-2 w-5 h-5 cursor-pointer"
                    onClick={() => setIsModalOpen(true)} // Open the modal on click
                />
            </div>
            <div className="flex-1 relative">
                <textarea
                    placeholder="Describe your design (optional)."
                    className="border-2 border-gray-300 rounded-md w-full h-full resize-none p-2 text-gray-700 overflow-auto"
                    value={description}
                    onChange={handleInputChange}
                    style={{ boxSizing: "border-box" }}
                />
                <div className="absolute bottom-2 right-2 text-gray-500 text-sm">
                    {description.length}/{maxChars}
                </div>
            </div>

            <InformationModal
                isOpen={isModalOpen}
                title="Description"
                information="This description is optional and will not be displayed alongside your design. You can use this space to explain your design."
                onClose={() => setIsModalOpen(false)} // Function to close the modal
            />
        </div>
    );
};

export default MockupDescription;
