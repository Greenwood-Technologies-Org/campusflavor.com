import React from 'react';
import { Icons } from "../icons";

interface CompetitionStepProps {
    icon: JSX.Element;
    title: string
    content: string
}

const CompetitionStep: React.FC<CompetitionStepProps> = ({ icon, title, content }) => {

    const iconWithClasses = React.cloneElement(icon, {
        className: `${icon.props.className} w-full h-auto aspect-square object-cover`
    });

    return (
        <div className="w-full items-center text-center">
            <div>
                {iconWithClasses}
            </div>
            <h4 className="text-xl font-semibold pb-2">{title}</h4>
            <span>{content}</span>
        </div>
    );
};

export default CompetitionStep;
