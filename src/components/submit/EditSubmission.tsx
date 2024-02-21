import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Rect, Image, Transformer } from 'react-konva';
import useImage from 'use-image';
import Konva from 'konva';
import { GithubPicker } from 'react-color';

const EditSubmission = ({
  printAreaWidth,
  printAreaHeight,
  imageUrl
}: {
  printAreaWidth: number,
  printAreaHeight: number,
  imageUrl: string
}) => {
  const [image] = useImage(imageUrl);
  const [fillColor, setFillColor] = useState('#FFFFFF'); // Default to white using hex code
  const stageRef = useRef<Konva.Stage>(null); // Reference to the Stage component
  const imageRef = useRef<Konva.Image>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (imageRef.current && transformerRef.current) {
      transformerRef.current.nodes([imageRef.current]);
      transformerRef.current.getLayer()!.batchDraw();
    }
  }, [image]);

  const handleColorChange = (color: { hex: string }) => {
    setFillColor(color.hex); // Update the fill color based on the user's selection
  };

  const colorOptions = ['#FFFFFF', '#000000', '#FF0000', '#008000', '#0000FF'];

  // Function to handle the creation and download of the mockup
const handleDownload = () => {
  if (stageRef.current && transformerRef.current) {
    // Hide the transformer before exporting
    transformerRef.current.visible(false);
    stageRef.current.getLayers().forEach(layer => layer.batchDraw()); // Redraw the layer to update the visibility change

    const dataURL = stageRef.current.toDataURL({ mimeType: 'image/png' });
    console.log(dataURL);

    // After exporting, make the transformer visible again
    transformerRef.current.visible(true);
    stageRef.current.getLayers().forEach(layer => layer.batchDraw()); // Redraw the layer to reflect the transformer being visible again

    // Proceed to create the download link and trigger the download
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'mockup.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};


  return (
    <div className="place-component">
      <Stage ref={stageRef} width={printAreaWidth} height={printAreaHeight}>
        <Layer>
          <Rect
            x={0}
            y={0}
            width={printAreaWidth}
            height={printAreaHeight}
            fill={fillColor}
            stroke="black"
            strokeWidth={2}
          />
          {image && (
            <Image
              image={image}
              ref={imageRef}
              x={(printAreaWidth - image.width) / 2}
              y={(printAreaHeight - image.height) / 2}
              draggable
            />
          )}
          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>
      <p>Apparel color:</p>
      <GithubPicker width="140px" triangle="hide" colors={colorOptions} color={fillColor} onChangeComplete={handleColorChange} />
      <button onClick={handleDownload} className="mt-2 p-2 text-white bg-blue-500 hover:bg-blue-700">Create mockup</button>
    </div>
  );
};

export default EditSubmission;
