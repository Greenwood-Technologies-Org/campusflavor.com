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

export { cn, formatMilliseconds };
