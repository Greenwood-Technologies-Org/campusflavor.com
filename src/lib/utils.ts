import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

function formatMilliseconds(ms: number): {
    years: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
} {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);

    return {
        years: years,
        days: days % 365,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60,
    };
}

export { cn };
