import React, { useState } from 'react';

interface MockupDescriptionProps {
  onDescriptionChange: (description: string) => void;
}

const MockupDescription: React.FC<MockupDescriptionProps> = ({ onDescriptionChange }) => {
  const maxChars = 300;
  const [description, setDescription] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = event.target.value.slice(0, maxChars);
    setDescription(newDescription); // Update local state
    onDescriptionChange(newDescription); // Update parent state
  };

  return (
    <div className="flex flex-col w-full h-full relative">
      <p className="text-left text-lg font-semibold text-black mb-2">Description</p>
      <div className="flex-1 relative">
        <textarea
          placeholder="Describe your design."
          className="border-2 border-gray-300 rounded-md w-full h-full resize-none p-2 text-gray-700 overflow-auto"
          value={description}
          onChange={handleInputChange}
          style={{ boxSizing: 'border-box' }}
        />
        <div className="absolute bottom-2 right-2 text-gray-500 text-sm">
          {description.length}/{maxChars}
        </div>
      </div>
    </div>
  );
};


export default MockupDescription;
