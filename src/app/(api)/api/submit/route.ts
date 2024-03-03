import axios from 'axios';

interface Crop {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface ColorJson {
    red: number;
    green: number;
    blue: number;
}

interface LayerInput {
    id: string;
    data?: string;
    crop?: Crop;
    checked: boolean;
    color?: ColorJson; // Optional, depending on if the layer uses color
}

interface MockupApiData {
    nr: number;
    layer_inputs: LayerInput[];
}

async function handleMediaModifierCall(mockupApiData: MockupApiData): Promise<any> {
    console.log("Calling MediaModifier API...");
    const mediaModifierApiKey = process.env.MEDIAMODIFIER_API_KEY; // Ensure you have MEDIAMODIFIER_API_KEY in your environment variables

    if (!mediaModifierApiKey) {
        throw new Error("MediaModifier API key is not defined in environment variables.");
    }

    const options = {
        method: "POST",
        url: "https://api.mediamodifier.com/v2/mockup/render",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            api_key: mediaModifierApiKey,
        },
        data: mockupApiData,
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error("Failed to call MediaModifier API:", error);
        throw error; // Rethrow or handle as needed
    }
}

export default handleMediaModifierCall;
