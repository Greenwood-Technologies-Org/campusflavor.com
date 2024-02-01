import { cn } from "@/lib/utils"
import React from "react"
import { HTMLAttributes } from "react"

interface RotatingBannerProps extends HTMLAttributes<HTMLDivElement> {
    items: string[]
    separator: string
}

const RotatingBanner = React.forwardRef<HTMLDivElement, RotatingBannerProps>(
    ({ className, items, separator, ...props }, ref) => {
        // Assuming each item + separator takes up approx. 200px width, adjust as needed
        const totalWidth = items.length * 200 * 2 // Multiply by 2 for the duplicate

        return (
            <div
                className={cn(
                    "w-full h-14 min-h-14 shadow-xl overflow-hidden flex items-center justify-start",
                    className
                )}
                {...props}
                ref={ref}
            >
                <div
                    className="flex flex-row gap-8"
                    style={{
                        animation: "rotateBanner 20s linear infinite",
                        width: `${totalWidth}px`,
                    }}
                >
                    {/* Original Items */}
                    {items.map((value, index) => (
                        <React.Fragment key={`original-${index}`}>
                            <p className="text-xl font-bold text-primary-500 flex items-center justify-center">
                                {value}
                            </p>
                            {index < items.length - 1 && (
                                <p className="text-4xl font-bold text-primary-500 flex items-center justify-center">
                                    {separator}
                                </p>
                            )}
                        </React.Fragment>
                    ))}
                    <p className="text-4xl font-bold text-primary-500 flex items-center justify-center">
                        {separator}
                    </p>
                    {/* Duplicate Items for Continuous Loop */}
                    {items.map((value, index) => (
                        <React.Fragment key={`duplicate1-${index}`}>
                            <p className="text-xl font-bold text-primary-500 flex items-center justify-center">
                                {value}
                            </p>
                            {index < items.length - 1 && (
                                <p className="text-4xl font-bold text-primary-500 flex items-center justify-center">
                                    {separator}
                                </p>
                            )}
                        </React.Fragment>
                    ))}
                    <p className="text-4xl font-bold text-primary-500 flex items-center justify-center">
                        {separator}
                    </p>
                    {/* Duplicate Items for Continuous Loop */}
                    {items.map((value, index) => (
                        <React.Fragment key={`duplicate2-${index}`}>
                            <p className="text-xl font-bold text-primary-500 flex items-center justify-center">
                                {value}
                            </p>
                            {index < items.length - 1 && (
                                <p className="text-4xl font-bold text-primary-500 flex items-center justify-center">
                                    {separator}
                                </p>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        )
    }
)

RotatingBanner.displayName = "RotatingBanner"

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
                <RotatingBanner
                    items={rotatingBannerItems}
                    separator="·"
                ></RotatingBanner>
            </div>
        )
    }
)
Banner.displayName = "Banner"

export { Banner, type BannerProps, RotatingBanner, type RotatingBannerProps }
