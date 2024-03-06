import React, { useState } from "react";

import { Icons } from "../icons";
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
                <Icons.info
                    className="ml-2 w-5 h-5 cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                />
            </div>

            <div
                className="flex flex-row items-start overflow-x-auto gap-2"
                style={{ scrollbarWidth: "none" }}
            >
                {colors.map((color, index) => (
                    <div
                        key={index}
                        className={`min-w-10 min-h-10 rounded-lg border ${
                            color === selectedColor
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
                information="Choose a color to preview your design in the mockup! If chosen for printing, your design will be offered on all suitable colors."
                onClose={() => setIsModalOpen(false)} // Function to close the modal
            />
        </div>
    );
};

export default MockupColor;
