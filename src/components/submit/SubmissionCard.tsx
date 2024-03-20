import Image from "next/image";
import React from "react";

import { Icons } from "../icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

type SubmissionCardProps = {
    mockupImageUrl: string;
    username: string;
    description: string;
};

const SubmissionCard: React.FC<SubmissionCardProps> = ({
    mockupImageUrl,
    username,
    description,
}) => {
    return (
        <div className="max-w-xs rounded-xl bg-white border-2 border-gray">
            <div className="flex justify-center">
                <Image
                    src={mockupImageUrl}
                    alt="Mockup Image"
                    width={500}
                    height={500}
                    className="aspect-square object-cover rounded-t-xl"
                    priority={true}
                />
            </div>
            <div className="flex justify-between items-center mx-4 py-2">
                <p className="text-gray-800 text-xl">@{username}</p>
                <div className="flex space-x-2 items-center">
                    <Icons.share className="w-7 h-7" />
                    <FontAwesomeIcon
                        icon={faHeart}
                        color="black"
                        className="w-5 h-5"
                    />
                </div>
            </div>
        </div>
    );
};

export default SubmissionCard;
