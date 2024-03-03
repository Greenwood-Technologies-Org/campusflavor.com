import { useState } from "react";
import { createMockup } from "./createMockup";

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

const resizeImage = async (blobUrl: string, targetWidth: number, targetHeight: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        // Create an Image object
        const img = new Image();

        // Set up the onload function, which resizes the image once it's loaded
        img.onload = () => {
            // Create a canvas and get its context
            const canvas = document.createElement('canvas');
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const ctx = canvas.getContext('2d');

            // Draw the image onto the canvas with the new dimensions
            ctx!.drawImage(img, 0, 0, targetWidth, targetHeight);

            // Convert the canvas content to a Blob, then create a blob URL
            canvas.toBlob((blob) => {
                if (blob) {
                    const resizedBlobUrl = URL.createObjectURL(blob);
                    resolve(resizedBlobUrl);
                } else {
                    reject(new Error('Canvas to Blob conversion failed'));
                }
            });
        };

        // Set up onerror function in case the image loading fails
        img.onerror = () => {
            reject(new Error('Image loading failed'));
        };

        // Trigger the image loading
        img.src = blobUrl;
    });
};

function downloadImage(blobObjectUrl: string): void {
    const a = document.createElement('a');
    a.href = blobObjectUrl;
    a.download = 'downloaded-image';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}


// function for getting the public design image url (should be 500x500px) image
const getPublicDesignImageUrl = async (
    designImageBlob: string,
): Promise<string> => {
    // convert our image to 500x500px
    const resizedImage = await resizeImage(designImageBlob, 500, 500);

    // THIS IS WHERE WE NEED TO UPLOAD IMAGE AND GET PUBLICLY ACCESSIBLE URL FOR 500X500 IMAGE
    // simulate delay while getting image url
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // placeholder for the image we are trying to get
    // this placeholder is already 500x500px
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
            // const response = await fakeCallCreateMockupApi(publicDesignImageUrl, mockupType, mockupColor);

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
    // get json RBG data for background color
    const backgroundColorJson = getBackgroundColorJson();

    var mockupApiData;
    if (mockupType === "T-shirt") {
        mockupApiData = {
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
        mockupApiData = {
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
        mockupApiData = {
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

    const response = await createMockup(mockupApiData);
    return response;
};

// Simulated API call function for testing without actual API request
const fakeCallCreateMockupApi = async (
    designImageUrl: string,
    mockupType: string,
    mockupColor: string,
): Promise<ApiResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate delay

    var mockupTypeUrl;

    if (mockupType === "T-shirt") {
        mockupTypeUrl =
            "https://mediamodifier.com/temporary/kxT4RMJdre2wLco7.jpeg";
    } else if (mockupType === "Sweater") {
        mockupTypeUrl =
            "https://mediamodifier.com/temporary/6J4zf4zwygI8bkkm.jpeg";
    } else if (mockupType === "Hoodie") {
        mockupTypeUrl =
            "https://mediamodifier.com/temporary/86Ct2gzDtQJAcPQ4.jpeg";
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
