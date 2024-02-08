import ShirtBox from "./shirtbox";
import { SubmissionObject } from "../lib/types";
import React from "react";

interface GalleryPageProps {
    gallery: SubmissionObject[];
}

const GalleryPage = React.forwardRef<HTMLDivElement, GalleryPageProps>(
    ({ gallery, ...props }, ref) => {
        return (
            <div
                ref={ref}
                {...props}
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                {gallery.map((item, index) => (
                    <ShirtBox
                        key={index}
                        imageUrl={item.url_link}
                        username={item.username}
                        postedDate={item.posted_date}
                    />
                ))}
            </div>
        );
    }
);

GalleryPage.displayName = "GalleryPage";
export default GalleryPage;
