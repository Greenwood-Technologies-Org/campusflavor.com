import { cwru_folder } from "@/lib/constants";
import getDbClient from "@/lib/db/db-client";

export function generateRandomImageName(extension: string): string {
    const randomString = Math.random().toString(36).substring(2, 15);
    return `${cwru_folder}/${randomString}.${extension}`;
}

async function fetchImageAsBlob(imageUrl: string): Promise<Blob> {
    const response = await fetch(imageUrl);
    if (!response.ok) {
        console.log(response.statusText);
        throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    return await response.blob();
}

export async function uploadImageToSupabase(
    bucketName: string,
    path: string,
    imageBlob: Blob
): Promise<string> {
    const supabaseClient = getDbClient();
    const { data, error } = await supabaseClient.storage
        .from(bucketName)
        .upload(path, imageBlob);

    if (error) {
        console.log(error.message);
        throw error;
    }

    const url = supabaseClient.storage.from(bucketName).getPublicUrl(path);

    return url.data.publicUrl;
}

export async function uploadMockupAndDesignImages(
    mockupImageURL: string,
    designImageURL: string
): Promise<{ mockupImageUrl: string; designImageUrl: string }> {
    const mockupBlob: Blob = await fetchImageAsBlob(mockupImageURL);
    const mockupImageUrl = await uploadImageToSupabase(
        "mockup_submission_images",
        generateRandomImageName("jpg"),
        mockupBlob
    );
    const designBlob: Blob = await fetchImageAsBlob(designImageURL);
    const designImageUrl = await uploadImageToSupabase(
        "design_submission_images",
        generateRandomImageName("jpg"),
        designBlob
    );

    return {
        mockupImageUrl,
        designImageUrl,
    };
}
