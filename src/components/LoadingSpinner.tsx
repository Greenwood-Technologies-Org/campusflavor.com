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

interface LoadingSpinnerProps {
    src: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ src }) => {
    // Initialize with the first message or any preferred static message
    const [loaderMessage, setLoaderMessage] = useState<string>(loadingMessages[0]);

    useEffect(() => {
        const updateMessage = () => {
            const randomIndex = Math.floor(Math.random() * loadingMessages.length);
            setLoaderMessage(loadingMessages[randomIndex]);
        };

        // Match the message change interval to the spinner animation duration for synchronicity
        const intervalId = setInterval(updateMessage, 1750); // Adjusted to match the spinner's cycle
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="flex flex-col items-center w-full space-y-2">
            <RotatingImage src={src} alt="Loading" />
            <p>{loaderMessage}</p>
        </div>
    );
};

export default LoadingSpinner;
