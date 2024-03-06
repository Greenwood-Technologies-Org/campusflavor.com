import { Image, Layer, Stage, Transformer } from "react-konva";
import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import useImage from "use-image";

interface MockupEditorProps {
    imageFile: File;
    backgroundColor: string;
    setDesignImageUrl: (url: string) => void;
}

const MockupEditor: React.FC<MockupEditorProps> = ({
    imageFile,
    backgroundColor,
    setDesignImageUrl,
}) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [image] = useImage(imageSrc!);
    const containerRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<any>(null);
    const imageRef = useRef<any>(null);
    const transformerRef = useRef<any>(null);
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
        scaleX: 1,
        scaleY: 1,
    });

    useEffect(() => {
        if (imageFile) {
            const fileSrc = URL.createObjectURL(imageFile);
            setImageSrc(fileSrc);
        }
    }, [imageFile]);

    const getDesignImageUrl = async (): Promise<string> => {
        let designBlobUrl = "";

        transformerRef.current.visible(false);
        transformerRef.current.getLayer().draw();
        if (containerRef.current) {
            const stage = containerRef.current.querySelector("canvas");
            if (stage) {
                // Convert canvas to data URL
                const dataUrl = stage.toDataURL();

                // Convert data URL to Blob
                const fetchResponse = await fetch(dataUrl);
                const blob = await fetchResponse.blob();

                // Create a blob URL from the Blob
                designBlobUrl = URL.createObjectURL(blob);
            }
        }
        transformerRef.current.visible(true);
        return designBlobUrl;
    };

    const updateDesignImageUrl = async () => {
        console.log("Updating design image URL");
        // need a delay to allow the updateImageUrl to start after the image has been uploaded
        await new Promise((resolve) => setTimeout(resolve, 500));
        const designImageUrl = await getDesignImageUrl();
        setDesignImageUrl(designImageUrl);
    };

    useEffect(() => {
        const getDesignImageUrlEffect = async (): Promise<string> => {
            let designBlobUrl = "";

            transformerRef.current.visible(false);
            transformerRef.current.getLayer().draw();
            if (containerRef.current) {
                const stage = containerRef.current.querySelector("canvas");
                if (stage) {
                    // Convert canvas to data URL
                    const dataUrl = stage.toDataURL();

                    // Convert data URL to Blob
                    const fetchResponse = await fetch(dataUrl);
                    const blob = await fetchResponse.blob();

                    // Create a blob URL from the Blob
                    designBlobUrl = URL.createObjectURL(blob);
                }
            }
            transformerRef.current.visible(true);
            return designBlobUrl;
        };

        const updateDesignImageUrlEffect = async () => {
            console.log("Updating design image URL");
            // need a delay to allow the updateImageUrl to start after the image has been uploaded
            await new Promise((resolve) => setTimeout(resolve, 500));
            const designImageUrl = await getDesignImageUrlEffect();
            setDesignImageUrl(designImageUrl);
        };

        updateDesignImageUrlEffect();
    }, [imageRef, setDesignImageUrl]);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            if (
                entries[0].contentRect.width &&
                entries[0].contentRect.height &&
                image
            ) {
                const stageWidth = entries[0].contentRect.width;
                const stageHeight = entries[0].contentRect.height;
                const scaleX = stageWidth / (image.width * 1.2);
                const scaleY = stageHeight / (image.height * 1.2);
                const scale = Math.min(scaleX, scaleY);

                setDimensions({
                    width: stageWidth,
                    height: stageHeight,
                    scaleX: scale,
                    scaleY: scale,
                });
            }
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => resizeObserver.disconnect();
    }, [image]);

    useEffect(() => {
        // Update the transformer's nodes on render and when the selected image changes
        if (transformerRef.current && imageRef.current) {
            transformerRef.current.nodes([imageRef.current]);
            transformerRef.current.getLayer().batchDraw();
        }
    }, [image]);

    return (
        <div
            ref={containerRef}
            style={{
                borderColor: "gray",
                borderWidth: 2,
                backgroundColor: backgroundColor,
            }} // Example for directly using backgroundColor prop.
            className={`w-full h-full rounded-xl overflow-hidden`}
        >
            <Stage
                width={dimensions.width}
                height={dimensions.height}
                ref={stageRef}
            >
                <Layer>
                    {image && (
                        <Image
                            image={image}
                            x={
                                (dimensions.width -
                                    image.width * dimensions.scaleX) /
                                2
                            } // Center the image
                            y={
                                (dimensions.height -
                                    image.height * dimensions.scaleY) /
                                2
                            } // Center the image
                            width={image.width * dimensions.scaleX}
                            height={image.height * dimensions.scaleY}
                            ref={imageRef}
                            draggable
                            onDragEnd={updateDesignImageUrl}
                            alt="Design Image"
                        />
                    )}
                    <Transformer
                        ref={transformerRef}
                        onTransformEnd={updateDesignImageUrl}
                    />
                </Layer>
            </Stage>
        </div>
    );
};

export default MockupEditor;
