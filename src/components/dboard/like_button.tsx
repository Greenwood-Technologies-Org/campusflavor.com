// LikeButton.tsx
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import getDbClient from "@/lib/db/db-client";
import NotificationPopup from "./notification_popup";
import VotingModal from "./vote_modal";
import { VotingStatus } from "@/lib/types";
import LoginModal from "./login_modal";

type LikeButtonProps = {
    initialCount: number;
    isInitiallyLiked: boolean;
    submissionId: string;
    user_id: string;
    enableClick: boolean;
    votingStatus: VotingStatus;
};

const LikeButton: React.FC<LikeButtonProps> = ({
    initialCount,
    isInitiallyLiked,
    submissionId,
    user_id,
    enableClick,
    votingStatus,
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

        if (user_id !== "" && votingStatus === VotingStatus.Voting) {
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

            // Optionally, set a timeout to hide the popup automatically after a few seconds
            //setTimeout(() => setShowPopup(false), 3000);
        }
    };

    console.log("This is the votingStatus", votingStatus);

    return (
        <>
            <button onClick={() => handleLike()} className={"cursor-pointer"}>
                <div className="flex items-center space-x-1">
                    <FontAwesomeIcon
                        icon={isLiked ? fasHeart : farHeart}
                        color={isLiked ? "red" : "black"}
                        className="w-5 h-5"
                    />
                    <span>{likeCount}</span>
                </div>
            </button>

            {votingStatus == VotingStatus.Prevoting && showPopup && (
                <VotingModal
                    onClose={() => setShowPopup(false)}
                    title="Voting Not Started"
                    message="We are still in the submission stage for this competition. Please come back when voting has begun!"
                />
            )}
            {votingStatus == VotingStatus.Finished && showPopup && (
                <VotingModal
                    onClose={() => setShowPopup(false)}
                    title="Voting Over"
                    message="Voting is over this competition. The Design Board placements are final. Please come back next time!."
                />
            )}
            {votingStatus == VotingStatus.Voting && showPopup && (
                <LoginModal onClose={() => setShowPopup(false)} />
            )}
        </>
    );
};

export default LikeButton;
