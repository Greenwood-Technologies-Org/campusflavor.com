import { useState } from "react";

import axios from "axios";
import { get } from "http";

interface ApiResponse {
    success: boolean;
    message: string;
    url: string;
}

interface ApiError {
    message: string;
}

// NEEDS TO BE HIDDEN BEFORE PUBLISHING SITE
const mediaModifierApiKey = "89cee3be-166b-4070-a7a9-e5c6417303d4";

const getPublicDesignImageUrl = async (
    designImageBlob: string,
): Promise<string> => {
    // simulate delay while getting image url
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // placeholder for the image we are trying to get
    const publicDesignImageUrl = "https://lh3.googleusercontent.com/drive-viewer/AKGpihYNdMktv7UuoosUGnqatCpIWtZC3ymii1xr0c8MUOtU5uqbWLo7x_DhuBNx1_kHxSFsRgkkKOGdRa3iIEJzSmaTZJuByg=s2560";
    return publicDesignImageUrl;
}

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
            const publicDesignImageUrl = await getPublicDesignImageUrl(designImageUrl);

            const response = await callCreateMockupApi(publicDesignImageUrl, mockupType, mockupColor); // Uncomment this line to use the real API call
            // const response = await fakeCallCreateMockupApi(
            //     publicDesignImageUrl,
            //     mockupType
            //     mockupColor
            // );
            setUrl(response.url);
        } catch (e) {
            setError("Getting mockup failed");
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    return { fetchMockupUrl, loading, url, error };
};

function hexToJsonRgb(hex: string): { red: number; green: number; blue: number } {
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, '');

    // Parse the hex string into integers for red, green, and blue
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { red: r, green: g, blue: b };
}

function getBackgroundColorJson(): { red: number; green: number; blue: number } {
    // RGB for white
    return { red: 255, green: 255, blue: 255 };
}


// Actual API call function (not used initially, but ready for easy switch)
const callCreateMockupApi = async (
    designImageUrl: string,
    mockupType: string,
    mockupColor: string,
): Promise<ApiResponse> => {
    // get json RBG data for mockupColor
    const mockupColorJson = hexToJsonRgb(mockupColor);
    const backgroundColorJson = getBackgroundColorJson();
    console.log(mockupColor);


    var mockupTypeData;

    if (mockupType === "T-shirt") {
        mockupTypeData = {
            nr: 705,
            layer_inputs: [
                {
                    id: '539fba27-3c25-4c33-b798-0b1628b3d6a0',
                    data: designImageUrl,
                    crop: { x: -50, y: -50, width: 600, height: 965.4 },
                    checked: true
                },
                {
                    id: '16d9837d-8463-49ba-934b-42653270afaa',
                    checked: true,
                    color: mockupColorJson
                },
                {
                    id: '3c7aee09-37b7-42fe-9275-b5f0c7788dc6',
                    checked: true,
                    color: backgroundColorJson
                }
            ]
        };
    } else if (mockupType === "Sweater") {
        mockupTypeData = {
            nr: 883,
            layer_inputs: [
                {
                    id: 'd4650742-abf2-4208-a754-c97b348b1282',
                    data: designImageUrl,
                    crop: { x: -50, y: -70, width: 600, height: 965.4 },
                    checked: true
                },
                {
                    id: '9ba9ee04-4859-4f38-8837-0786af210b6d',
                    checked: true,
                    color: mockupColorJson
                },
                {
                    id: 'd47d677f-d35f-44b9-bd2c-648a0a293259',
                    checked: true,
                    color: backgroundColorJson
                }
            ]
        };
    } else if (mockupType === "Hoodie") {
        mockupTypeData = {
            nr: 153935,
            layer_inputs: [
                {
                    id: 'c197f8ef-ddc4-4d69-b2ce-63a58ba023e7',
                    data: designImageUrl,
                    crop: { x: 0, y: -66, width: 500, height: 632 },
                    checked: true
                },
                {
                    id: '0f4ad8a2-70cf-4381-bc0a-e5f6754d388b',
                    checked: true,
                    color: mockupColorJson
                },
                {
                    id: '904d0277-b414-4179-b4e7-4ad8eedfe53d',
                    checked: true,
                    color: backgroundColorJson
                }
            ]
        };
    } else {
        throw new Error("Mockup type not found");
    }

    const options = {
        method: "POST",
        url: "https://api.mediamodifier.com/v2/mockup/render",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            api_key: mediaModifierApiKey,
        },
        data: mockupTypeData,
    };

    const response = await axios.request(options);
    return response.data; // Assuming the API responds with the data in this format
};

// Simulated API call function for testing without actual API request
const fakeCallCreateMockupApi = async (
    designImageUrl: string,
    mockupType: string
): Promise<ApiResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate delay

    var mockupTypeUrl;

    if (mockupType === "T-shirt") {
        mockupTypeUrl =
            "https://assets.mediamodifier.com/mockups/60215527042f6804dbdd9e1c/shirt-template-ghost-model_thumb.jpg";
    } else if (mockupType === "Sweater") {
        mockupTypeUrl =
            "https://assets.mediamodifier.com/mockups/5fbcafa06ed8231339c7e5a0/athletic-lady-wearing-white-long-sleeve_thumb.jpg";
    } else if (mockupType === "Hoodie") {
        mockupTypeUrl =
            "https://assets.mediamodifier.com/mockups/5fcf32fa96de08215cc655f5/front-view-hoodie-mockup_thumb.jpg";
    } else {
        throw new Error("Mockup type not found");
    }

    return {
        success: true,
        message: "Image rendered successfully",
        url: mockupTypeUrl,
    };
};

export default useCreateMockupApi;
