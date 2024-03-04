// LikeButton.tsx
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import getDbClient from "@/lib/db/db-client";

type LikeButtonProps = {
    initialCount: number;
    isInitiallyLiked: boolean;
    submissionId: string;
    user_id: string;
};

const LikeButton: React.FC<LikeButtonProps> = ({
    initialCount,
    isInitiallyLiked,
    submissionId,
    user_id,
}) => {
    const [isLiked, setIsLiked] = useState(isInitiallyLiked);
    const [likeCount, setLikeCount] = useState(initialCount);

    useEffect(() => {
        setIsLiked(isInitiallyLiked);
        setLikeCount(initialCount);
    }, [initialCount, isInitiallyLiked]);

    const handleLike = async () => {
        const supabase = getDbClient();
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
        const updatedLikeCount = updatedIsLiked ? likeCount + 1 : likeCount - 1;

        setIsLiked(updatedIsLiked);
        setLikeCount(updatedLikeCount);
    };

    return (
        <button
            onClick={handleLike}
            style={{ border: "none", background: "none", cursor: "pointer" }}
        >
            <FontAwesomeIcon
                icon={isLiked ? fasHeart : farHeart}
                color={isLiked ? "red" : "grey"}
            />
            <span style={{ marginLeft: "4px" }}>{likeCount}</span>
        </button>
    );
};

export default LikeButton;
