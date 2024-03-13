import React from 'react';
import styled, { keyframes } from 'styled-components';

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
    return <RotatingImage src={src} alt="Loading" />;
};

export default LoadingSpinner;
