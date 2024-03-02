import Link from "next/link";
import Image from 'next/image';

export default function SubmitInfo() {
    return (
        <div className="py-12 px-[10%] itmes-center justify-center">
            <div className="w-full space-y-12">
                {/* Design Content */}
                <div className="flex flex-col items-center space-y-8 md:flex-row md:space-x-12 md:space-y-0"> {/* Add items-center to align items vertically */}
                    <div className="w-full md:w-1/2">
                        <h2 className="text-4xl font-semibold pb-4">Design</h2>
                        <span>Create a funny, cute, or pretty clothing design and upload it to our mockup editor to see how it would look on different pieces of clothing.</span>
                    </div>
                    <div className="w-3/4 md:w-1/2"> {/* Adjusted: removed fixed height */}
                        <div className="w-full h-auto"> {/* New: Control width, auto-adjust height */}
                            <Image
                                src="/images/submit-info/design.png"
                                alt="Design Submission Information"
                                layout="responsive"
                                width={500} // Example width, adjust based on your actual image aspect ratio
                                height={500} // Example height, adjust based on your actual image aspect ratio
                                objectFit="contain" // Use contain to ensure the image fits within the bounds of its container
                            />
                        </div>
                    </div>
                </div>

                {/* Row 2 */}
                <div className="flex flex-row items-center space-x-8">
                    <div className="bg-blue-500 text-white p-4 w-1/2">3</div>
                    <div className="bg-yellow-500 text-white p-4 w-1/2">4</div>
                </div>
            </div>

            <Link href="/submit" className="w-full flex flex-col flex-grow">
                <button
                    className="py-2 px-8 my-8 rounded-lg focus:outline-none bg-black text-white hover:bg-gray-700"
                >
                    Submit Design
                </button>
            </Link>
        </div>
    );
}
