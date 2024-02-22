import Image from "next/image";
import React from "react";

function timeAgo(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();

    // NOTE units in ms, so we need to convert to days
    const diff = now.getTime() - date.getTime();

    // Convert the difference from milliseconds to days
    const daysAgo = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (daysAgo === 0) {
        return "today";
    } else if (daysAgo === 1) {
        return "1 day ago";
    } else {
        return `${daysAgo} days ago`;
    }
}

export type ShirtBoxProps = {
    imageUrl: string;
    username: string;
    postedDate: string;
};

const ShirtBox = React.forwardRef<HTMLDivElement, ShirtBoxProps>(
    ({ imageUrl, username, postedDate, ...props }, ref) => {
        return (
            <div
                ref={ref}
                {...props}
                style={{
                    border: "1px solid #ccc",
                    padding: "16px",
                    borderRadius: "8px",
                    width: "200px", // Adjust width as necessary
                    margin: "8px",
                    textAlign: "center",
                }}
            >
                <img
                    src={imageUrl}
                    alt="Shirt"
                    style={{
                        maxWidth: "100%",
                        height: "auto",
                        marginBottom: "8px",
                    }}
                />
                <div style={{ color: "#333" }}>
                    <p style={{ fontWeight: "bold", margin: 0 }}>@{username}</p>
                    <p style={{ color: "#666", margin: 0 }}>
                        {timeAgo(postedDate)}
                    </p>
                </div>
            </div>
        );
    }
);

ShirtBox.displayName = "ShirtBox";
export default ShirtBox;
