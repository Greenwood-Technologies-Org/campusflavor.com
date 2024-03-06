import React, { useState } from "react";

import { Icons } from "../icons";
import InformationModal from "@/components/InformationModal";

type MockupTypeProps = {
    types: string[]; // List of type strings
    onTypeSelect: (type: string) => void; // Function to handle type selection
};

const MockupType: React.FC<MockupTypeProps> = ({ types, onTypeSelect }) => {
    const [selectedType, setSelectedType] = useState(types[0]); // Default to the first type
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleTypeSelect = (type: string) => {
        setSelectedType(type);
        onTypeSelect(type);
    };

    return (
        <div className="flex flex-col">
            <div className="flex items-center mb-2">
                <p className="text-lg font-semibold text-black text-left">
                    Mockup Type
                </p>
                <Icons.info
                    className="ml-2 w-5 h-5 cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                />
            </div>

            <div
                className="flex overflow-x-auto gap-2 items-start py-2"
                style={{ scrollbarWidth: "none" }}
            >
                {types.map((type, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 rounded-full border ${
                            type === selectedType
                                ? "border-black"
                                : "border-gray-300"
                        } cursor-pointer whitespace-nowrap`}
                        onClick={() => handleTypeSelect(type)}
                    >
                        {type}
                    </button>
                ))}
            </div>

            <InformationModal
                isOpen={isModalOpen}
                title="Mockup Type"
                information="Select a type to see your design on the mockup! If selected for printing, your design will be available on all suitable types."
                onClose={() => setIsModalOpen(false)} // Function to close the modal
            />
        </div>
    );
};

export default MockupType;
