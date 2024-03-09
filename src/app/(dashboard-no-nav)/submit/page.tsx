"use client";

import React, { useState } from "react";

import ConfirmSubmission from "@/components/submit/ConfirmSubmission";
import GlobalConfig from "@/lib/config/global";
import { Icons } from "@/components/icons";
import Link from "next/link";
import MockupColor from "@/components/submit/MockupColor";
import MockupDescription from "@/components/submit/MockupDescription";
import MockupType from "@/components/submit/MockupType";
import UploadDesign from "@/components/submit/UploadDesign";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import useSession from "@/hooks/use-session";

// Dynamically import the MockupEditor with SSR disabled
const MockupEditor = dynamic(() => import("@/components/submit/MockupEditor"), {
    ssr: false,
});

const SubmitPage = () => {
    const router = useRouter();
    const { session, isLoading } = useSession();

    React.useEffect(() => {
        if (isLoading) return;

        if (!session) {
            router.push(`/signin?callback=/submit`);
        }
    }, [session, isLoading, router]);

    const submissionLimitReached =
        session?.user.user_metadata.api_calls >
        GlobalConfig.mediaModifier.maxCalls;
    console.log(submissionLimitReached);

    const [imageFile, setImageFile] = useState<File | null>(null); // State to hold the uploaded image file
    // Handler to update imageFile state, this should be triggered by UploadDesign component
    const handleImageUpload = (file: File) => {
        setImageFile(file);
    };

    // Add a new state for designImageUrl
    const [designImageUrl, setDesignImageUrl] = useState<string>("");
    // Function to update designImageUrl state
    const handleSetDesignImageUrl = (url: string) => {
        setDesignImageUrl(url);
    };

    const colors = [
        "#ffffff",
        "#b2afaa",
        "#f59382",
        "#335231",
        "#2d407d",
        "#3a3a38",
        "#171f2c",
        "#101010",
    ];
    const [selectedColor, setSelectedColor] = useState<string>(colors[0]);

    const types = ["T-shirt", "Sweater", "Hoodie"];
    const [selectedType, setSelectedType] = useState<string>(types[0]);

    const [description, setDescription] = useState("");

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleSubmit = async () => {
        // SOMEHOW CALL MOCKUP EDITOR updateDesignImageUrl FUNCTION AND WAIT FOR RESPONSE
        setShowConfirmationModal(true);
    };

    return (
        <div className="h-screen w-full justify-center items-center">
            <div className="flex justify-between items-start pt-5 px-5">
                <Link href="/submit-info">
                    <div className="flex items-center space-x-1">
                        {/* Use flex to align items horizontally */}
                        <Icons.leftChevron className="w-6 h-6" />
                        <span>Back</span> {/* Add text next to the chevron */}
                    </div>
                </Link>
                <Link href="/design-board">
                    <Icons.close className="w-6 h-6" />
                </Link>
            </div>

            <div className="text-center">
                <h1 className="text-3xl font-medium my-8">Submit Design</h1>

                <div className="space-y-4 mx-[8%] max-w-screen-xl 2xl:mx-auto md:flex md:space-x-[5%] md:space-y-0">
                    <div className="md:flex-1">
                        <div
                            className="relative"
                            style={{ paddingBottom: "100%" }}
                        >
                            <div className="absolute inset-0 flex flex-col space-y-4">
                                {imageFile ? (
                                    <MockupEditor
                                        imageFile={imageFile}
                                        backgroundColor={selectedColor}
                                        setDesignImageUrl={
                                            handleSetDesignImageUrl
                                        }
                                    />
                                ) : (
                                    <UploadDesign
                                        onImageUpload={handleImageUpload}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="md:flex-1">
                        <div
                            className="relative"
                            style={{ paddingBottom: "100%" }}
                        >
                            <div className="absolute inset-0 flex flex-col space-y-5">
                                <MockupColor
                                    colors={colors}
                                    onColorSelect={setSelectedColor}
                                />
                                <MockupType
                                    types={types}
                                    onTypeSelect={setSelectedType}
                                />
                                <MockupDescription
                                    onDescriptionChange={setDescription}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {submissionLimitReached && (
                    <div className="h-full w-full flex flex-row items-center justify-center">
                        <div className=" h-full w-3/4 bg-red-500 mt-8 text-secondary-500 p-2 rounded-lg">
                            You have reached your submission limit. You are no
                            longer allowed to make submissions to this
                            competition. If you have any questions feel free to contact contact@campusflavor.com.
                        </div>
                    </div>
                )}

                <button
                    disabled={!imageFile || submissionLimitReached}
                    className={`flex-grow py-2 px-8 my-8 rounded-lg focus:outline-none ${
                        !imageFile || submissionLimitReached
                            ? "bg-gray-500 text-white"
                            : "bg-black text-white hover:bg-gray-700"
                    }`}
                    onClick={handleSubmit}
                >
                    Submit
                </button>

                <ConfirmSubmission
                    isOpen={showConfirmationModal}
                    onClose={() => setShowConfirmationModal(false)}
                    designImageUrl={designImageUrl}
                    mockupColor={selectedColor}
                    mockupType={selectedType}
                    description={description}
                    session={session}
                />
            </div>
        </div>
    );
};

export default SubmitPage;
