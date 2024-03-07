// LikeButton.tsx
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import getDbClient from "@/lib/db/db-client";
import NotificationPopup from "./notification_popup";

type LikeButtonProps = {
    initialCount: number;
    isInitiallyLiked: boolean;
    submissionId: string;
    user_id: string;
    enableClick: boolean;
};

const LikeButton: React.FC<LikeButtonProps> = ({
    initialCount,
    isInitiallyLiked,
    submissionId,
    user_id,
    enableClick,
}) => {
    const [isLiked, setIsLiked] = useState(isInitiallyLiked);
    const [likeCount, setLikeCount] = useState(initialCount);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        setIsLiked(isInitiallyLiked);
        setLikeCount(initialCount);
    }, [initialCount, isInitiallyLiked, showPopup]);

    const handleLike = async () => {
        const supabase = getDbClient();

        if (user_id !== "") {
            const { data, error } = await supabase.rpc<any, any>(
                "insert_or_delete_vote_record",
                {
                    _user_id: user_id,
                    _submission_id: submissionId,
                    _vote_value: 1,
                }
            );

            if (error) {
                console.error(error.message);
                return;
            }

            const updatedIsLiked = !isLiked;
            const updatedLikeCount = updatedIsLiked
                ? likeCount + 1
                : likeCount - 1;

            setIsLiked(updatedIsLiked);
            setLikeCount(updatedLikeCount);
        } else {
            // Inside the else block of handleLike
            setShowPopup(true);
            console.log("user_id is empty");

            // Optionally, set a timeout to hide the popup automatically after a few seconds
            setTimeout(() => setShowPopup(false), 3000);
        }
    };

    return (
        <>
            <button
                onClick={() => enableClick && handleLike()}
                className={enableClick ? "cursor-pointer" : "cursor-default"}
            >
                <div className="flex items-center space-x-1">
                    <FontAwesomeIcon
                        icon={isLiked ? fasHeart : farHeart}
                        color={isLiked ? "red" : "black"}
                        className="w-5 h-5"
                    />
                    <span>{likeCount}</span>
                </div>
            </button>

            {showPopup && <NotificationPopup message="Please Login to Like." />}
        </>
    );
};

export default LikeButton;
