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
    leftChevron: (props: LucideProps) => (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#000000"
            strokeWidth="0.00024000000000000003"
            {...props}
        >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L9.41421 12L15.7071 18.2929C16.0976 18.6834 16.0976 19.3166 15.7071 19.7071C15.3166 20.0976 14.6834 20.0976 14.2929 19.7071L7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289Z"
                    fill="#000000"
                ></path>
            </g>
        </svg>
    ),
    close: (props: LucideProps) => (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
                    fill="#000000"
                ></path>
            </g>
        </svg>
    ),
    share: (props: LucideProps) => (
        <svg
            width="800px"
            height="800px"
            viewBox="0 -0.5 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M12.5 6.25C12.9142 6.25 13.25 5.91421 13.25 5.5C13.25 5.08579 12.9142 4.75 12.5 4.75V6.25ZM20.25 12.5C20.25 12.0858 19.9142 11.75 19.5 11.75C19.0858 11.75 18.75 12.0858 18.75 12.5H20.25ZM19.5 6.25C19.9142 6.25 20.25 5.91421 20.25 5.5C20.25 5.08579 19.9142 4.75 19.5 4.75V6.25ZM15.412 4.75C14.9978 4.75 14.662 5.08579 14.662 5.5C14.662 5.91421 14.9978 6.25 15.412 6.25V4.75ZM20.25 5.5C20.25 5.08579 19.9142 4.75 19.5 4.75C19.0858 4.75 18.75 5.08579 18.75 5.5H20.25ZM18.75 9.641C18.75 10.0552 19.0858 10.391 19.5 10.391C19.9142 10.391 20.25 10.0552 20.25 9.641H18.75ZM20.0303 6.03033C20.3232 5.73744 20.3232 5.26256 20.0303 4.96967C19.7374 4.67678 19.2626 4.67678 18.9697 4.96967L20.0303 6.03033ZM11.9697 11.9697C11.6768 12.2626 11.6768 12.7374 11.9697 13.0303C12.2626 13.3232 12.7374 13.3232 13.0303 13.0303L11.9697 11.9697ZM12.5 4.75H9.5V6.25H12.5V4.75ZM9.5 4.75C6.87665 4.75 4.75 6.87665 4.75 9.5H6.25C6.25 7.70507 7.70507 6.25 9.5 6.25V4.75ZM4.75 9.5V15.5H6.25V9.5H4.75ZM4.75 15.5C4.75 18.1234 6.87665 20.25 9.5 20.25V18.75C7.70507 18.75 6.25 17.2949 6.25 15.5H4.75ZM9.5 20.25H15.5V18.75H9.5V20.25ZM15.5 20.25C18.1234 20.25 20.25 18.1234 20.25 15.5H18.75C18.75 17.2949 17.2949 18.75 15.5 18.75V20.25ZM20.25 15.5V12.5H18.75V15.5H20.25ZM19.5 4.75H15.412V6.25H19.5V4.75ZM18.75 5.5V9.641H20.25V5.5H18.75ZM18.9697 4.96967L11.9697 11.9697L13.0303 13.0303L20.0303 6.03033L18.9697 4.96967Z"
                fill="#000000"
            />
        </svg>
    ),
    plus: (props: LucideProps) => (
        <svg
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M4 12H20M12 4V20"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    ),
    noImage: (props: LucideProps) => (
        <svg
            fill="#000000"
            width="800px"
            height="800px"
            viewBox="0 0 32 32"
            id="icon"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
                <title>no-image</title>

                <path d="M30,3.4141,28.5859,2,2,28.5859,3.4141,30l2-2H26a2.0027,2.0027,0,0,0,2-2V5.4141ZM26,26H7.4141l7.7929-7.793,2.3788,2.3787a2,2,0,0,0,2.8284,0L22,19l4,3.9973Zm0-5.8318-2.5858-2.5859a2,2,0,0,0-2.8284,0L19,19.1682l-2.377-2.3771L26,7.4141Z" />

                <path d="M6,22V19l5-4.9966,1.3733,1.3733,1.4159-1.416-1.375-1.375a2,2,0,0,0-2.8284,0L6,16.1716V6H22V4H6A2.002,2.002,0,0,0,4,6V22Z" />

                <rect
                    id="_Transparent_Rectangle_"
                    fill="none"
                    width="32"
                    height="32"
                />
            </g>
        </svg>
    ),
    info: (props: LucideProps) => (
        <svg
            width="800px"
            height="800px"
            viewBox="-0.5 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
                <path
                    d="M12 21.5C17.1086 21.5 21.25 17.3586 21.25 12.25C21.25 7.14137 17.1086 3 12 3C6.89137 3 2.75 7.14137 2.75 12.25C2.75 17.3586 6.89137 21.5 12 21.5Z"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M12.9309 8.15005C12.9256 8.39231 12.825 8.62272 12.6509 8.79123C12.4767 8.95974 12.2431 9.05271 12.0008 9.05002C11.8242 9.04413 11.6533 8.98641 11.5093 8.884C11.3652 8.7816 11.2546 8.63903 11.1911 8.47415C11.1275 8.30927 11.1139 8.12932 11.152 7.95675C11.19 7.78419 11.278 7.6267 11.405 7.50381C11.532 7.38093 11.6923 7.29814 11.866 7.26578C12.0397 7.23341 12.2192 7.25289 12.3819 7.32181C12.5446 7.39072 12.6834 7.506 12.781 7.65329C12.8787 7.80057 12.9308 7.97335 12.9309 8.15005ZM11.2909 16.5301V11.1501C11.2882 11.0556 11.3046 10.9615 11.3392 10.8736C11.3738 10.7857 11.4258 10.7057 11.4922 10.6385C11.5585 10.5712 11.6378 10.518 11.7252 10.4822C11.8126 10.4464 11.9064 10.4286 12.0008 10.43C12.094 10.4299 12.1863 10.4487 12.272 10.4853C12.3577 10.5218 12.4352 10.5753 12.4997 10.6426C12.5642 10.7099 12.6143 10.7895 12.6472 10.8767C12.6801 10.9639 12.6949 11.0569 12.6908 11.1501V16.5301C12.6908 16.622 12.6727 16.713 12.6376 16.7979C12.6024 16.8828 12.5508 16.96 12.4858 17.025C12.4208 17.09 12.3437 17.1415 12.2588 17.1767C12.1738 17.2119 12.0828 17.23 11.9909 17.23C11.899 17.23 11.8079 17.2119 11.723 17.1767C11.6381 17.1415 11.5609 17.09 11.4959 17.025C11.4309 16.96 11.3793 16.8828 11.3442 16.7979C11.309 16.713 11.2909 16.622 11.2909 16.5301Z"
                    fill="#000000"
                />
            </g>
        </svg>
    ),
};

export { type Icon, Icons };
