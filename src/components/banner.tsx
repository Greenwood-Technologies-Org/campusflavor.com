"use client";

import { VotingStatus, VotingStatusResult } from "@/lib/types";
import { cn, formatMilliseconds } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { HTMLAttributes } from "react";
import Marquee from "react-fast-marquee";
import { CountdownTimer } from "./dboard/countdown_timer";

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

interface BannerProps extends HTMLAttributes<HTMLDivElement> {
    rotatingBannerItems: string[];
    votingStatusParam: VotingStatusResult;
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
    ({ className, rotatingBannerItems, votingStatusParam, ...props }, ref) => {
        return (
            <div className="w-full h-fit">
                <div
                    className={cn(
                        "w-full min-h-80 bg-grainy flex flex-col items-center justify-center relative",
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

                        {votingStatusParam.countdownTimestamp !== null && (
                            <CountdownTimer
                                className=""
                                VotingStatusResult={votingStatusParam}
                            />
                        )}

                        <Link href="/submit-info">
                            {(votingStatusParam.votingStatus ===
                                VotingStatus.Prevoting ||
                                votingStatusParam.votingStatus ===
                                    VotingStatus.Voting) && (
                                <button className="p-2 bg-[#FF3E51] rounded-lg text-sm md:text-xl">
                                    Submit a Design
                                </button>
                            )}
                        </Link>
                        {votingStatusParam.votingStatus ===
                            VotingStatus.Finished && (
                            <div className="flex flex-col gap-1 justify-start items-center w-fit h-fit bg-primary-500 text-secondary-500 text-sm md:text-lg font-bold p-2 rounded-lg shadow-lg">
                                <p className="text-center">
                                    Voting has concluded.
                                </p>
                            </div>
                        )}

                        <div className="text-center mt-auto">
                            <p className="text-sm">
                                Not affiliated with, licensed, sponsored, or
                                endorsed by any college, university, or
                                licensing entity.
                            </p>
                        </div>
                    </div>
                </div>
                <RotatingTicker className="" items={rotatingBannerItems} />
            </div>
        );
    }
);
Banner.displayName = "Banner";

export { Banner, type BannerProps };
