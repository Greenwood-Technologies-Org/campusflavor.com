import { useEffect, useState } from "react";

import axios from "axios";

interface ApiResponse {
    success: boolean;
    message: string;
    url: string;
}

interface ApiError {
    message: string;
}

const useCreateMockupApi = (designImageUrl: string) => {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ApiError | null>(null);

    useEffect(() => {
        if (!designImageUrl || designImageUrl == "") return;

        setLoading(true);
        // Replace fakeCallCreateMockupApi with callCreateMockupApi to use the real API call
        const fetchData = async () => {
            try {
                // const response = await callCreateMockupApi(designImageUrl); // Uncomment this line to use the real API call
                const response = await fakeCallCreateMockupApi(designImageUrl); // Comment this line when using the real API call
                setData(response);
                setLoading(false);
            } catch (error: any) {
                // Using 'any' for catch clause variable type is a common practice in TypeScript for handling unknown errors.
                setError({
                    message: error.message || "An unknown error occurred",
                });
                setLoading(false);
            }
        };

        fetchData();
    }, [designImageUrl]);

    return { data, loading, error };
};

// Actual API call function (not used initially, but ready for easy switch)
const callCreateMockupApi = async (designImageUrl: string): Promise<ApiResponse> => {
    const options = {
        method: "POST",
        url: "https://api.mediamodifier.com/v2/mockup/render",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            api_key: "e4da0953-6fa4-4546-9e8d-df4b89723fef",
        },
        data: {
            nr: 520,
            layer_inputs: [
                {
                    id: "juqu6evm8k4dtcu835p",
                    data: "https://images.vexels.com/media/users/3/300913/isolated/preview/09363b792ee41663cb7e659c661ca7f4-beer-reaper-t-shirt-with-a-skeleton-holding-a-scythe.png",
                    // data: designImageUrl, // use this line to use the actual designImageUrl
                    checked: true,
                },
                {
                    id: "ea18e8f6-1e41-4a5e-bbe2-a469e2fea45d",
                    checked: true,
                },
            ],
        },
    };

    const response = await axios.request(options);
    return response.data; // Assuming the API responds with the data in this format
};

// Simulated API call function for testing without actual API request
const fakeCallCreateMockupApi = async (
    designImageUrl: string
): Promise<ApiResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate delay
    return {
        success: true,
        message: "Image rendered successfully",
        url: "https://assets.mediamodifier.com/mockups/60215527042f6804dbdd9e1c/shirt-template-ghost-model_thumb.jpg",
    };
};

export default useCreateMockupApi;
