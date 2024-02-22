import React, { useState } from 'react';

type MockupTypeProps = {
  types: string[]; // List of type strings
  onTypeSelect: (type: string) => void; // Function to handle type selection
};

const MockupType: React.FC<MockupTypeProps> = ({ types, onTypeSelect }) => {
  const [selectedType, setSelectedType] = useState(types[0]); // Default to the first type

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    onTypeSelect(type);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-2">
        <p className="text-lg font-semibold text-black text-left">Mockup Type</p>
        <img src="/icons/info.svg" alt="Info" className="ml-2 w-5 h-5" />
      </div>
      <div className="flex gap-2 items-start">
        {types.map((type, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full border ${type === selectedType ? 'border-black' : 'border-gray-300'} cursor-pointer`}
            onClick={() => handleTypeSelect(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MockupType;
