import Image from "next/image";
import React from "react";

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
            <div className="border-t-2 border-gray w-full"></div>
            <div className="px-4 py-2 text-left">
                <div className="text-xl mb-1">@{username}</div>
                <p className="text-gray-700 text-base">{description}</p>
            </div>
        </div>
    );
};

export default SubmissionCard;
