import { VotingStatus, VotingStatusResult } from "@/lib/types";
import React from "react";
import { HTMLAttributes } from "react";

interface CountdownTimerProps extends HTMLAttributes<HTMLDivElement> {
    VotingStatusResult: VotingStatusResult;
}

function getStatusMessage(status: VotingStatus): string {
    switch (status) {
        case VotingStatus.NotStarted:
            return "Submissions Open in";
        case VotingStatus.Prevoting:
            return "Voting Opens In";
        case VotingStatus.Intermission:
            return "Voting Opens In";
        case VotingStatus.Voting:
            return "Voting Closing In";
        case VotingStatus.Finished:
            return "Voting Closed";
        default:
            return "Status Unknown";
    }
}

export const CountdownTimer = React.forwardRef<
    HTMLDivElement,
    CountdownTimerProps
>(({ className, VotingStatusResult, ...props }, ref) => {
    const timestamp =
        VotingStatusResult.countdownTimestamp !== null
            ? VotingStatusResult.countdownTimestamp
            : 0;
    const [timestampLive, setTimestampLive] = React.useState<number>(timestamp);

    React.useEffect(() => {
        setTimestampLive(timestamp); // Update immediately with the latest timestamp

        const interval = setInterval(() => {
            setTimestampLive((prev) => prev - 1000);
        }, 1000);

        return () => clearInterval(interval); // Clean up on unmount or timestamp change
    }, [timestamp]);

    // Updated formatMilliseconds function to include days
    const formatMilliseconds = (milliseconds: number) => {
        const seconds = Math.floor((milliseconds / 1000) % 60);
        const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
        const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
        const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

        return {
            days,
            hours,
            minutes,
            seconds,
        };
    };

    const timeData = formatMilliseconds(timestampLive);

    if (timestamp < 0) {
        return (
            <div className="flex justify-center items-center">
                <div className="w-10 h-10 border-4 border-gray-300 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div
            className={`flex flex-col gap-1 justify-start items-center w-fit h-fit bg-primary-500 text-secondary-500 text-sm md:text-lg font-bold p-2 rounded-lg shadow-lg ${className}`}
            {...props}
            ref={ref}
        >
            <p>{getStatusMessage(VotingStatusResult.votingStatus)}</p>
            <div className="flex flex-row items-center justify-center gap-4">
                {timeData.days > 0 && (
                    <div className="flex flex-col items-center justify-center">
                        <p>{timeData.days}</p>
                        <p className="font-normal">
                            {timeData.days === 1 ? "day" : "days"}
                        </p>
                    </div>
                )}
                <div className="flex flex-col items-center justify-center">
                    <p>{timeData.hours}</p>
                    <p className="font-normal">
                        {timeData.hours === 1 ? "hour" : "hours"}
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p>{timeData.minutes}</p>
                    <p className="font-normal">
                        {timeData.minutes === 1 ? "minute" : "minutes"}
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p>{timeData.seconds}</p>
                    <p className="font-normal">
                        {timeData.seconds === 1 ? "second" : "seconds"}
                    </p>
                </div>
            </div>
        </div>
    );
});

CountdownTimer.displayName = "CountdownTimer";
