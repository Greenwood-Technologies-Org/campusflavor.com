import React, { useState } from "react";

import InformationModal from "@/components/InformationModal";

type MockupColorProps = {
    colors: string[];
    onColorSelect: (color: string) => void;
};

const MockupColor: React.FC<MockupColorProps> = ({ colors, onColorSelect }) => {
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
        onColorSelect(color);
    };

    return (
        <div className="flex flex-col">
            <div className="flex items-center mb-2">
                <p className="text-lg font-semibold text-black text-left">
                    Mockup Color
                </p>
                <img
                    src="/icons/info.svg"
                    alt="Info"
                    className="ml-2 w-5 h-5 cursor-pointer"
                    onClick={() => setIsModalOpen(true)} // Open the modal on click
                />
            </div>
            <div className="flex gap-2 items-start">
                {colors.map((color, index) => (
                    <div
                        key={index}
                        className={`w-10 h-10 rounded-lg border ${color === selectedColor
                            ? "border-black"
                            : "border-gray-300"
                            } cursor-pointer`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorSelect(color)}
                    ></div>
                ))}
            </div>

            <InformationModal
                isOpen={isModalOpen}
                title="Mockup Color"
                information="Color of mockup background. Choose a color that best suits your design."
                onClose={() => setIsModalOpen(false)} // Function to close the modal
            />
        </div>
    );
};

export default MockupColor;
