import { cn } from "@/lib/utils"
import React from "react"
import { HTMLAttributes } from "react"
import Marquee from "react-fast-marquee"

interface RotatingTickerProps extends HTMLAttributes<HTMLDivElement> {
    items: string[]
    separator?: string
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
                <Marquee className="w-full h-full flex flex-row items-center gap-12">
                    {items.map((value, index) => (
                        <React.Fragment key={`marquee-item-${index}`}>
                            {index <= 0 && (
                                <p className="text-4xl font-bold text-primary-500 flex items-center justify-center flex-shrink-0 mx-6">
                                    ·
                                </p>
                            )}
                            <p className="text-xl font-bold text-primary-500 flex items-center justify-center flex-shrink-0 mx-6">
                                {value}
                            </p>
                            {index < items.length - 3 && (
                                <p className="text-4xl font-bold text-primary-500 flex items-center justify-center flex-shrink-0 mx-6">
                                    ·
                                </p>
                            )}
                            {index == items.length - 2 && (
                                <p className="text-4xl font-bold text-primary-500 flex items-center justify-center flex-shrink-0 mx-6">
                                    ·
                                </p>
                            )}
                        </React.Fragment>
                    ))}
                </Marquee>
            </div>
        )
    }
)

RotatingTicker.displayName = "RotatingTicker"

interface BannerProps extends HTMLAttributes<HTMLDivElement> {
    rotatingBannerItems: string[]
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
    ({ className, rotatingBannerItems, ...props }, ref) => {
        return (
            <div className="w-full h-fit">
                <div
                    className={cn("w-full h-72 min-h-72 bg-grainy", className)}
                    {...props}
                    ref={ref}
                ></div>
                <RotatingTicker items={rotatingBannerItems} />
            </div>
        )
    }
)
Banner.displayName = "Banner"

export { Banner, type BannerProps }
