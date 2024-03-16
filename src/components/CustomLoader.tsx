"use client";

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { loadingMessages } from '@/lib/constants';

// Define the keyframe animation with a pause
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  80% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Apply the animation to your component, adjusting the timing to include the pause
const RotatingImage = styled.img`
  animation: ${rotate} 1.75s ease-in-out infinite;
`;

interface CustomLoaderProps {
  src: string;
}

const CustomLoader: React.FC<CustomLoaderProps> = ({ src }) => {
  // Initialize with the first message or any preferred static message
  const [loaderMessage, setLoaderMessage] = useState<string>(loadingMessages[0]);

  useEffect(() => {
    const updateMessage = () => {
      const randomIndex = Math.floor(Math.random() * loadingMessages.length);
      setLoaderMessage(loadingMessages[randomIndex]);
    };


    const intervalId = setInterval(updateMessage, 1750);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <RotatingImage src={src} alt="Loading" />
        <p>{loaderMessage}</p>
      </div>
    </div>
  );
};

export default CustomLoader;
