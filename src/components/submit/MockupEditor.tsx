import { Image, Layer, Rect, Stage, Transformer } from "react-konva";
import React, { useEffect, useRef, useState } from "react";

import useImage from "use-image";

interface MockupEditorProps {
    imageFile: File;
    backgroundColor: string;
}

const MockupEditor: React.FC<MockupEditorProps> = ({
    imageFile,
    backgroundColor,
}) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [image] = useImage(imageSrc!);
    const containerRef = useRef<HTMLDivElement>(null);
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
            className="border-2 border-gray-300 w-full h-full rounded-xl overflow-hidden"
        >
            <Stage width={dimensions.width} height={dimensions.height}>
                <Layer>
                    <Rect
                        width={dimensions.width}
                        height={dimensions.height}
                        fill={backgroundColor}
                    />
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
                        />
                    )}
                    <Transformer ref={transformerRef} />
                </Layer>
            </Stage>
        </div>
    );
};

export default MockupEditor;
