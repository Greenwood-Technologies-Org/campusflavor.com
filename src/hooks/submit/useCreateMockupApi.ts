import { useEffect, useState } from "react";

import axios from "axios";
import { mock } from "node:test";

interface ApiResponse {
    success: boolean;
    message: string;
    url: string;
}

interface ApiError {
    message: string;
}

const useCreateMockupApi = (designImageUrl: string, mockupType: string): ApiResponse | null => {
    const [data, setData] = useState<ApiResponse | null>(null);

    useEffect(() => {
        if (!designImageUrl) return;

        fakeCallCreateMockupApi(designImageUrl, mockupType)
            .then(setData)
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setData(null); // Optionally handle errors more gracefully
            });

        // The dependency array ensures this effect runs only when designImageUrl or mockupType changes
    }, [designImageUrl, mockupType]);

    return data; // This will initially be null and then update to the actual data once the promise resolves
};

// Actual API call function (not used initially, but ready for easy switch)
const callCreateMockupApi = async (designImageUrl: string, mockupType: string): Promise<ApiResponse> => {
    var mockupTypeData;

    if (mockupType === "T-shirt") {
        mockupTypeData = {
            nr: 520,
            layer_inputs: [
                {
                    id: "juqu6evm8k4dtcu835p",
                    data: designImageUrl,
                    checked: true,
                },
                {
                    id: "ea18e8f6-1e41-4a5e-bbe2-a469e2fea45d",
                    checked: true,
                },
            ],
        };
    } else if (mockupType === "Sweater") {
        mockupTypeData = {
            nr: 520,
            layer_inputs: [
                {
                    id: "juqu6evm8k4dtcu835p",
                    data: designImageUrl,
                    checked: true,
                },
                {
                    id: "ea18e8f6-1e41-4a5e-bbe2-a469e2fea45d",
                    checked: true,
                },
            ],
        };
    } else if (mockupType === "Hoodie") {
        mockupTypeData = {
            nr: 520,
            layer_inputs: [
                {
                    id: "juqu6evm8k4dtcu835p",
                    data: designImageUrl,
                    checked: true,
                },
                {
                    id: "ea18e8f6-1e41-4a5e-bbe2-a469e2fea45d",
                    checked: true,
                },
            ],
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
            api_key: "e4da0953-6fa4-4546-9e8d-df4b89723fef",
        },
        data: mockupTypeData
    };

    const response = await axios.request(options);
    return response.data; // Assuming the API responds with the data in this format
};

// Simulated API call function for testing without actual API request
const fakeCallCreateMockupApi = async (
    designImageUrl: string, mockupType: string
): Promise<ApiResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate delay

    // Download design image from blob URL
    const response = await fetch(designImageUrl);
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'designImage'; // You can give it a more descriptive name based on your requirements
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(downloadUrl);

    var mockupTypeUrl;

    if (mockupType === "T-shirt") {
        mockupTypeUrl = "https://assets.mediamodifier.com/mockups/60215527042f6804dbdd9e1c/shirt-template-ghost-model_thumb.jpg";
    } else if (mockupType === "Sweater") {
        mockupTypeUrl = "https://assets.mediamodifier.com/mockups/5fbcafa06ed8231339c7e5a0/athletic-lady-wearing-white-long-sleeve_thumb.jpg";
    } else if (mockupType === "Hoodie") {
        mockupTypeUrl = "https://assets.mediamodifier.com/mockups/5fcf32fa96de08215cc655f5/front-view-hoodie-mockup_thumb.jpg";
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
