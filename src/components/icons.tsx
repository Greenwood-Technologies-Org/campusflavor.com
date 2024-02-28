import { type XIcon as LucideIcon, type LucideProps } from "lucide-react";

type Icon = typeof LucideIcon;

const Icons = {
    account: (props: LucideProps) => (
        <svg
            width={props.width || "24"}
            height={props.height || "24"}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M19.7274 20.4471C19.2716 19.1713 18.2672 18.0439 16.8701 17.2399C15.4729 16.4358 13.7611 16 12 16C10.2389 16 8.52706 16.4358 7.12991 17.2399C5.73276 18.0439 4.72839 19.1713 4.27259 20.4471"
                stroke={props.fill || "#1E1E1E"}
                strokeWidth="2"
                strokeLinecap="round"
            />
            <circle
                cx="12"
                cy="8"
                r="4"
                stroke={props.fill || "#1E1E1E"}
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    ),
    spinner: (props: LucideProps) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    ),
};

export { type Icon, Icons };
