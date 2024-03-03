"use client";

import React, { useState } from "react";

import ConfirmSubmission from "@/components/submit/ConfirmSubmission";
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
    }, [session, isLoading]);

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
                        {" "}
                        {/* Use flex to align items horizontally */}
                        <img
                            src="/icons/left-chevron.svg"
                            alt="Back"
                            className="w-6 h-6"
                        />
                        <span>Back</span> {/* Add text next to the chevron */}
                    </div>
                </Link>
                <Link href="/competitions">
                    <img src="/icons/x.svg" alt="Close" className="w-6 h-6" />
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

                <button
                    disabled={!imageFile}
                    className={`flex-grow py-2 px-8 my-8 rounded-lg focus:outline-none ${
                        !imageFile
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
                    username={session?.user.user_metadata.username}
                />
            </div>
        </div>
    );
};

export default SubmitPage;
