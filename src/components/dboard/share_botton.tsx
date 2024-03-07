import { Icons } from "../icons";
// ShareButton.tsx

import React, { useState, useEffect } from "react";
import NotificationPopup from "./notification_popup";

type ShareButtonProps = {
    submissionId: string;
    onShare: () => void;
};

const ShareButton: React.FC<ShareButtonProps> = ({ submissionId, onShare }) => {
    const [showPopup, setShowPopup] = useState(false);
    const handleShare = () => {
        // Assuming I want to share the URL with the submission ID as a query parameter, clears out other search paramters
        const urlToShare = `${window.location.origin}${window.location.pathname}?submissionId=${submissionId}`;
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
    };

    return (
        <button onClick={handleShare} className="w-7 h-7 cursor-pointer">
            <Icons.share className="w-7 h-7" />
            {showPopup && <NotificationPopup message="Link Copied." />}
        </button>
    );
};

export default ShareButton;
