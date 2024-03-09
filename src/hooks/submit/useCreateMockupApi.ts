import { createMockup, fakeCreateMockup } from "./createMockup";
import {
    generateRandomImageName,
    uploadImageToSupabase,
} from "./fileGenerationUpload";

import GlobalConfig from "@/lib/config/global";
import { Session } from "@supabase/supabase-js";
import axios from "axios";
import { getBrowserClient } from "@/lib/db/db-client";
import { useState } from "react";

interface ApiResponse {
    success: boolean;
    message: string;
    url: string;
}

interface ApiError {
    message: string;
}

const resizeImage = async (
    blobUrl: string,
    targetWidth: number,
    targetHeight: number
): Promise<string> => {
    return new Promise((resolve, reject) => {
        // Create an Image object
        const img = new Image();

        // Set up the onload function, which resizes the image once it's loaded
        img.onload = () => {
            // Create a canvas and get its context
            const canvas = document.createElement("canvas");
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const ctx = canvas.getContext("2d");

            // Draw the image onto the canvas with the new dimensions
            ctx!.drawImage(img, 0, 0, targetWidth, targetHeight);

            // Convert the canvas content to a Blob, then create a blob URL
            canvas.toBlob((blob) => {
                if (blob) {
                    const resizedBlobUrl = URL.createObjectURL(blob);
                    resolve(resizedBlobUrl);
                } else {
                    reject(new Error("Canvas to Blob conversion failed"));
                }
            });
        };

        // Set up onerror function in case the image loading fails
        img.onerror = () => {
            reject(new Error("Image loading failed"));
        };

        // Trigger the image loading
        img.src = blobUrl;
    });
};

function downloadImage(blobObjectUrl: string): void {
    const a = document.createElement("a");
    a.href = blobObjectUrl;
    a.download = "downloaded-image";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// function for getting the public design image url (should be 500x500px) image
const getPublicDesignImageUrl = async (
    designImageBlob: string
): Promise<string> => {
    // convert our image to 500x500px
    const resizedImage = await resizeImage(designImageBlob, 500, 500);

    const response = await fetch(resizedImage);

    if (!response.ok) {
        throw new Error(
            `Failed to fetch the blob from the URL: ${resizedImage}`
        );
    }

    const imageBlob = await response.blob();

    // GET PUBLICLY ACCESSIBLE URL FOR 500X500 IMAGE
    const publicDesignImageUrl = await uploadImageToSupabase(
        "public_design_submission_images",
        generateRandomImageName("jpg"),
        imageBlob
    );

    return publicDesignImageUrl;
};

const useCreateMockupApi = () => {
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");

    const fetchMockupUrl = async (
        designImageUrl: string,
        mockupType: string,
        mockupColor: string
    ) => {
        setLoading(true);
        setError("");

        try {
            const publicDesignImageUrl = await getPublicDesignImageUrl(
                designImageUrl
            );

            const client = getBrowserClient();
            const { data, error } = await client.auth.getUser();

            if (error) {
                throw new Error("Error fetching user. Not signed in.");
            }

            const user = data.user;
            if (
                user.user_metadata.api_calls <=
                GlobalConfig.mediaModifier.maxCalls
            ) {
                const response = await callCreateMockupApi(
                    publicDesignImageUrl,
                    mockupType,
                    mockupColor
                ); // Uncomment this line to use the real API call
                // const response = await fakeCallCreateMockupApi(
                //     publicDesignImageUrl,
                //     mockupType,
                //     mockupColor
                // );
                setUrl(response.url);
                console.log(response);

                await client.auth.updateUser({
                    data: {
                        api_calls: user.user_metadata.api_calls + 1,
                    },
                });
            } else {
                setError("Maximum submissions reached.");

                throw new Error("Maximum submissions reached.");
            }
        } catch (e) {
            setError("Getting mockup failed");
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    return { fetchMockupUrl, loading, url, error };
};

function hexToJsonRgb(hex: string): {
    red: number;
    green: number;
    blue: number;
} {
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, "");

    // Parse the hex string into integers for red, green, and blue
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { red: r, green: g, blue: b };
}

function getBackgroundColorJson(): {
    red: number;
    green: number;
    blue: number;
} {
    // RGB for white
    return { red: 255, green: 255, blue: 255 };
}

// Actual API call function (not used initially, but ready for easy switch)
const callCreateMockupApi = async (
    designImageUrl: string,
    mockupType: string,
    mockupColor: string
): Promise<ApiResponse> => {
    // get json RBG data for mockupColor
    const mockupColorJson = hexToJsonRgb(mockupColor);
    // get json RBG data for background color
    const backgroundColorJson = getBackgroundColorJson();

    var mockupApiData;
    if (mockupType === "T-shirt") {
        mockupApiData = {
            nr: 155410,
            layer_inputs: [
                {
                    id: 'eeacc340-5a01-4059-93fc-fc9a98787f71',
                    data: designImageUrl,
                    crop: { x: -50, y: -50, width: 600, height: 768 }
                },
                {
                    id: '540067b7-7330-494b-ab66-00d47e12d3da',
                    color: mockupColorJson
                },
                {
                    id: 'b5c700f8-fc92-40a8-9862-48c82fd7887c',
                    color: backgroundColorJson
                }
            ]
        };
    } else if (mockupType === "Sweater") {
        mockupApiData = {
            nr: 155412,
            layer_inputs: [
                {
                    id: '38122b5d-df37-4e59-9309-6dc2b5c5e41e',
                    data: designImageUrl,
                    crop: { x: -100, y: -50, width: 700, height: 700 }
                },
                {
                    id: 'fb1ccb3c-9173-456b-9776-6a8c07b77a20',
                    color: mockupColorJson
                },
                {
                    id: '8e0a95da-2e44-4e23-9937-3b22403e2870',
                    color: backgroundColorJson
                }
            ],
        };
    } else if (mockupType === "Hoodie") {
        mockupApiData = {

            nr: 155413, //FIXXXXXXX
            layer_inputs: [
                {
                    id: '524465c1-3ba9-4e1a-bc90-34639e3516e5',
                    data: designImageUrl,
                    crop: { x: -70, y: -30, width: 650, height: 650 }
                },
                {
                    id: '6d6da7c4-90c3-47ef-a24c-07c0e5568033',
                    color: mockupColorJson
                },
                {
                    id: 'aa608067-9112-44a5-b622-e96b25874525',
                    color: mockupColorJson
                },
                {
                    id: '845d671e-3807-445c-94e5-580024e6bf70',
                    color: mockupColorJson
                },
                {
                    id: '92104417-6b35-4e23-8071-b89c15ee54ec',
                    color: backgroundColorJson
                }
            ]
        };
    } else {
        throw new Error("Mockup type not found");
    }

    const response = await createMockup(mockupApiData);
    return response;
};

// Simulated API call function for testing without actual API request
const fakeCallCreateMockupApi = async (
    designImageUrl: string,
    mockupType: string,
    mockupColor: string
): Promise<ApiResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate delay

    const response = await fakeCreateMockup(mockupType);
    return response;
};

export default useCreateMockupApi;
