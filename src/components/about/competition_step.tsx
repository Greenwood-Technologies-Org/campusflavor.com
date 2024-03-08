import React from 'react';
import { Icons } from "../icons";

interface CompetitionStepProps {
    icon: JSX.Element;
    title: string
}

const CompetitionStep: React.FC<CompetitionStepProps> = ({ icon, title }) => {

    return (
        <div className="w-full items-center ">
            <div>
                {icon}
            </div>
            <h4 className="text-xl font-semibold p-2 text-center">{title}</h4>
        </div>
    );
};

export default CompetitionStep;
