import React, { useEffect, useState } from "react";

import { Icons } from "../icons";
import NotificationPopup from "./notification_popup";

// ShareButton.tsx

type ShareButtonProps = {
    submissionId: string;
    onShare: () => void;
};

const ShareButton: React.FC<ShareButtonProps> = ({ submissionId, onShare }) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleShare = async () => {
        // URL with the submission ID as a query parameter
        const urlToShare = `${window.location.origin}${window.location.pathname}?submissionId=${submissionId}`;

        // Use native share dialog if available
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Check this design out!",
                    url: urlToShare,
                });
                // Call onShare callback if provided
                onShare && onShare();
            } catch (err) {
                console.error("Error sharing:", err);
            }
        } else {
            // Fallback to copying the link to the clipboard
            navigator.clipboard
                .writeText(urlToShare)
                .then(() => {
                    onShare && onShare();
                })
                .catch((err) => {
                    console.error("Could not copy URL to clipboard: ", err);
                });
            setShowPopup(true);

            // Optionally, set a timeout to hide the popup automatically after a few seconds
            setTimeout(() => setShowPopup(false), 3000);
        }
    };

    return (
        <button onClick={handleShare} className="w-7 h-7 cursor-pointer">
            <Icons.share className="w-7 h-7" />
            {showPopup && <NotificationPopup message="Link Copied." />}
        </button>
    );
};

export default ShareButton;
