// components/UploadDesign.tsx
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

// Add a prop type for the callback function
interface UploadDesignProps {
  onImageUpload: (file: File) => void; // Function that takes a File object
}

const UploadDesign: React.FC<UploadDesignProps> = ({ onImageUpload }) => {

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Directly handle the file here
    const file = acceptedFiles[0];
    console.log(file.name);
    onImageUpload(file); // Notify the parent component
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    maxFiles: 1
  });

  return (
    <div {...getRootProps()}
      className="w-full h-full border-dashed border-4 border-gray-500 rounded-xl cursor-pointer hover:border-black transition-colors duration-300">
      <input {...getInputProps()} />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <img src="/icons/plus.svg" alt="Upload" className="mb-2 w-12 h-12" />
        <p className="text-gray-500">
          Drag or drop to upload design.
        </p>
      </div>
    </div>
  );
};

export default UploadDesign;
