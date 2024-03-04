// ShareButton.tsx
import React from "react";

type ShareButtonProps = {
    submissionId: string;
    onShare: () => void;
};

const ShareButton: React.FC<ShareButtonProps> = ({ submissionId, onShare }) => {
    const handleShare = () => {
        // Assuming I want to share the URL with the submission ID as a query parameter, clears out other search paramters
        const urlToShare = `${window.location.origin}${window.location.pathname}?submissionId=${submissionId}`;
        navigator.clipboard
            .writeText(urlToShare)
            .then(() => {
                alert("URL copied to clipboard!");
                onShare && onShare();
            })
            .catch((err) => {
                console.error("Could not copy URL to clipboard: ", err);
            });
    };

    return (
        <button
            onClick={handleShare}
            style={{ margin: "10px 0", padding: "8px 16px" }}
        >
            Share
        </button>
    );
};

export default ShareButton;
