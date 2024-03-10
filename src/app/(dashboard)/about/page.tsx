import Link from "next/link";
import Image from 'next/image';

import { Icons } from "@/components/icons";
import CompetitionStep from "@/components/about/competition_step";


export default function About() {

    const competitionSteps = [
        <CompetitionStep
            key="1. Design"
            icon={<Icons.design />}
            title={"1. Design"}
            content={"Student artists create a funny, pretty, or cute design related to their school."}
        />,
        <CompetitionStep
            key="2. Submit"
            icon={<Icons.upload />}
            title={"2. Submit"}
            content={"Artists use our mockup editor to create a new piece of merchandise."}
        />,
        <CompetitionStep
            key="3. Share"
            icon={<Icons.share />}
            title={"3. Share"}
            content={"Artists and other students can share a great submission from the design board."}
        />,
        <CompetitionStep
            key="4. Vote"
            icon={<Icons.heart />}
            title={"4. Vote"}
            content={"Students vote on the best designs by liking a submission."}
        />,
        <CompetitionStep
            key="5. Win"
            icon={<Icons.trophy />}
            title={"5. Win"}
            content={"The top 3 designs are awarded with clothing and cash prizes."}
        />,
        <CompetitionStep
            key="6. Wear"
            icon={<Icons.tshirt />}
            title={"6. Wear"}
            content={"Anyone can order apparel with artist designs from the Campus Flavor Shop!"}
        />,
    ];


    return (
        <div className="w-full py-12 px-[2%] space-y-10">

            {/* The Problem */}
            <div className="px-[8%] flex flex-col items-center space-y-8 md:flex-row md:space-x-12 md:space-y-0"> {/* Add items-center to align items vertically */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-4xl font-semibold pb-4">The Problem</h2>
                    <span>We noticed a trend at universities: school merchandise features generic designs that don’t accurately speak to student life. The college experience is about a lot more than just logos. Its about avoiding the dorm filth, pulling all nighters to catch up on studying, and surviving on a shitty meal plan. </span>
                </div>
                <div className="flex items-center justify-center w-full md:w-1/2"> {/* Adjusted: removed fixed height */}
                    <div className="max-w-md md:max-w-xs w-full h-auto"> {/* New: Control width, auto-adjust height */}
                        <Image
                            src="/images/about/the_problem.png"
                            alt="The Problem"
                            layout="responsive"
                            width={500} // Example width, adjust based on your actual image aspect ratio
                            height={500} // Example height, adjust based on your actual image aspect ratio
                            objectFit="contain" // Use contain to ensure the image fits within the bounds of its container
                        />
                    </div>
                </div>
            </div>

            {/* Our Solution (below medium size) */}
            <div className="px-[8%] md:hidden flex flex-col items-center space-y-8 md:flex-row md:space-x-12 md:space-y-0"> {/* Add items-center to align items vertically */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-4xl font-semibold pb-4">Our Solution</h2>
                    <span>We host university-specific merchandise design competitions so students can create clothing that accurately speaks to their experiences in college. At Campus Flavor, apparel speaks to campus inside jokes, legendary study spots, and memorable events that every student can relate to.</span>
                </div>
                <div className="flex items-center justify-center w-full md:w-1/2"> {/* Adjusted: removed fixed height */}
                    <div className="max-w-md md:max-w-xs w-full h-auto"> {/* New: Control width, auto-adjust height */}
                        <Image
                            src="/images/about/our_solution.png"
                            alt="Our Solution"
                            layout="responsive"
                            width={500} // Example width, adjust based on your actual image aspect ratio
                            height={500} // Example height, adjust based on your actual image aspect ratio
                            objectFit="contain" // Use contain to ensure the image fits within the bounds of its container
                        />
                    </div>
                </div>
            </div>

            {/* Our Solution (above medium size) */}
            <div className="px-[8%] hidden md:flex flex-col items-center space-y-8 md:flex-row md:space-x-12 md:space-y-0"> {/* Add items-center to align items vertically */}
                <div className="flex items-center justify-center w-full md:w-1/2"> {/* Adjusted: removed fixed height */}
                    <div className="max-w-md md:max-w-xs w-full h-auto"> {/* New: Control width, auto-adjust height */}
                        <Image
                            src="/images/about/our_solution.png"
                            alt="Our Solution"
                            layout="responsive"
                            width={500} // Example width, adjust based on your actual image aspect ratio
                            height={500} // Example height, adjust based on your actual image aspect ratio
                            objectFit="contain" // Use contain to ensure the image fits within the bounds of its container
                        />
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <h2 className="text-4xl font-semibold pb-4">Our Solution</h2>
                    <span>We host university-specific merchandise design competitions so students can create clothing that accurately speaks to their experiences in college. At Campus Flavor, apparel speaks to campus inside jokes, legendary study spots, and memorable events that every student can relate to.</span>
                </div>
            </div>

            {/* How It Works */}
            <div>
                <h2 className="text-4xl font-semibold text-center">How It Works</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 px-4">
                    {competitionSteps}
                </div>
            </div>

            {/* How It Works */}
            <div className="text-center">
                <h2 className="text-4xl font-semibold pb-4">Contact Us</h2>
                <span>Have a question or just want to connect? Reach us at contact@campusflavor.com.</span>
            </div>

            <Link href="/dboard" className="w-full flex flex-col flex-grow items-center">
                <button
                    className="py-2 px-8 rounded-lg focus:outline-none bg-black text-white hover:bg-gray-700"
                >
                    Design Board
                </button>
            </Link>

        </div>
    );
}
