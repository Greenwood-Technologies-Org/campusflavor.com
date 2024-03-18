import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

function formatMilliseconds(ms: number): {
    hours: number;
    minutes: number;
    seconds: number;
} {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    return {
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60,
    };
}

async function fetchCurrentTime() {
    try {
        const response = await fetch(
            "https://worldtimeapi.org/api/timezone/America/New_York"
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // The datetime is in ISO 8601 format, which can be directly used to create a Date object
        const serverTime = new Date(data.datetime);
        return serverTime;
    } catch (error) {
        console.error("Failed to fetch current time from API", error);
        // In case of an error, fall back to local time or handle appropriately
        return new Date(); // This is a fallback and might not be ideal for your use case
    }
}

export { cn, formatMilliseconds, fetchCurrentTime };
