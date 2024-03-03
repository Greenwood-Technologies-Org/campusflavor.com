"use client";

import { VotingStatus } from "@/lib/types";
import { cn, formatMilliseconds } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { HTMLAttributes } from "react";
import Marquee from "react-fast-marquee";

interface RotatingTickerProps extends HTMLAttributes<HTMLDivElement> {
    items: string[];
    separator?: string;
}

const RotatingTicker = React.forwardRef<HTMLDivElement, RotatingTickerProps>(
    ({ className, children, items, ...props }, ref) => {
        return (
            <div
                className={cn(
                    "w-full h-14 min-h-14 shadow-xl overflow-hidden",
                    className
                )}
                {...props}
                ref={ref}
            >
                <Marquee className="w-full h-full flex flex-row items-center">
                    {items.map((value, index) => (
                        <React.Fragment key={`marquee-item-${index}`}>
                            <div className="flex flex-row items-center justify-center">
                                {/* Always add a separator before each item except the first one */}
                                {index > 0 && (
                                    <p className="text-4xl font-bold text-primary-500 flex items-center justify-center flex-shrink-0 mx-2 md:mx-4">
                                        ·
                                    </p>
                                )}
                                <p className="text-md md:text-xl font-bold text-primary-500 flex items-center justify-center flex-shrink-0 mx-2 md:mx-4">
                                    {value}
                                </p>
                                {/* Separator for last item */}
                                {index === items.length - 1 && (
                                    <p className="text-4xl font-bold text-primary-500 flex items-center justify-center flex-shrink-0 mx-2 md:mx-4">
                                        ·
                                    </p>
                                )}
                            </div>
                        </React.Fragment>
                    ))}
                </Marquee>
            </div>
        );
    }
);

RotatingTicker.displayName = "RotatingTicker";

interface CountdownTimerProps extends HTMLAttributes<HTMLDivElement> {
    timestamp: number;
}

const CountdownTimer = React.forwardRef<HTMLDivElement, CountdownTimerProps>(
    ({ className, children, timestamp, ...props }, ref) => {
        const [timestampLive, setTimestampLive] =
            React.useState<number>(timestamp);

        React.useEffect(() => {
            const interval = setInterval(() => {
                setTimestampLive((prev) => prev - 1000);
            }, 1000);

            return () => clearInterval(interval);
        }, []);

        const timeData = formatMilliseconds(timestampLive);

        return (
            <div
                className={cn(
                    "flex flex-col gap-1 justify-start items-center w-fit h-fit bg-primary-500 text-secondary-500 text-sm md:text-lg font-bold p-2 rounded-lg shadow-lg",
                    className
                )}
                {...props}
                ref={ref}
            >
                <p>Voting Opens In</p>
                <div className="flex flex-row items-center justify-center gap-4">
                    <div className="flex flex-col items-center justify-center">
                        <p>{timeData.hours}</p>
                        <p className="font-normal">
                            {timeData.hours == 1 ? "hour" : "hours"}
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <p>{timeData.minutes}</p>
                        <p className="font-normal">
                            {timeData.minutes == 1 ? "minute" : "minutes"}
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <p>{timeData.seconds}</p>
                        <p className="font-normal">
                            {timeData.seconds == 1 ? "second" : "seconds"}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
);
CountdownTimer.displayName = "CountdownTimer";

interface BannerProps extends HTMLAttributes<HTMLDivElement> {
    rotatingBannerItems: string[];
    votingStatusParam: VotingStatus;
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
    ({ className, rotatingBannerItems, votingStatusParam, ...props }, ref) => {
        return (
            <div className="w-full h-fit">
                <div
                    className={cn(
                        "w-full h-72 min-h-72 bg-grainy flex flex-col items-center justify-center relative",
                        className
                    )}
                    {...props}
                    ref={ref}
                >
                    <div className="flex flex-col w-fit gap-3 md:gap-2 items-center justify-center text-2xl md:text-3xl lg:text-4xl text-secondary-500">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-4">
                            <div className="hidden md:inline font-bold">
                                Campus Flavor
                            </div>
                            <p className="hidden md:inline text-6xl font-bold">
                                ·
                            </p>
                            <div className="font-bold text-center">
                                Case Western Reserve University
                            </div>
                        </div>
                        <CountdownTimer
                            className=""
                            timestamp={1000000}
                        ></CountdownTimer>

                        <Link href="/submit-info">
                            {votingStatusParam === VotingStatus.Prevoting && (
                                <button className="p-2 bg-[#FF3E51] rounded-lg text-sm md:text-xl">
                                    Submit a Design
                                </button>
                            )}
                        </Link>
                    </div>
                </div>
                <RotatingTicker className="" items={rotatingBannerItems} />
            </div>
        );
    }
);
Banner.displayName = "Banner";

export { Banner, type BannerProps };
