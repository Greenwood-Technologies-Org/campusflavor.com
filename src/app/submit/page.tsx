'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import UploadDesign from '@/components/submit/UploadDesign';
import MockupColor from '@/components/submit/MockupColor';
import MockupType from '@/components/submit/MockupType';
import MockupDescription from '@/components/submit/MockupDescription';
import ConfirmSubmission from '@/components/submit/ConfirmSubmission';

// Dynamically import the MockupEditor with SSR disabled
const MockupEditor = dynamic(() => import('@/components/submit/MockupEditor'), {
    ssr: false,
});

const SubmitPage = () => {
    const [imageFile, setImageFile] = useState<File | null>(null); // State to hold the uploaded image file
    // Handler to update imageFile state, this should be triggered by UploadDesign component
    const handleImageUpload = (file: File) => {
        setImageFile(file);
    };

    const colors = ['#1E1E1E', '#4354D2', '#4CB7EC', '#FF80E1', '#FFFFFF'];
    const [selectedColor, setSelectedColor] = useState<string>(colors[0]);

    const types = ['T-shirt', 'Sweater', 'Hoodie'];
    const [selectedType, setSelectedType] = useState<string>(types[0]);

    const [description, setDescription] = useState('');

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleSubmit = () => {
        setShowConfirmationModal(true);
    };

    return (
        <div className="h-screen justify-center items-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold my-8">Submit Design</h1>

                <div className="space-y-4 mx-[8%] max-w-screen-xl 2xl:mx-auto md:flex md:space-x-[5%] md:space-y-0">

                    <div className="md:flex-1">
                        <div className="relative" style={{ paddingBottom: '100%' }}>
                            <div className="absolute inset-0 flex flex-col space-y-4">
                                {imageFile ? (
                                    <MockupEditor imageFile={imageFile} backgroundColor={selectedColor} />
                                ) : (
                                    <UploadDesign onImageUpload={handleImageUpload} />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="md:flex-1">
                        <div className="relative" style={{ paddingBottom: '100%' }}>
                            <div className="absolute inset-0 flex flex-col space-y-5">
                                <MockupColor colors={colors} onColorSelect={setSelectedColor} />
                                <MockupType types={types} onTypeSelect={setSelectedType} />
                                <MockupDescription onDescriptionChange={setDescription} />
                            </div>
                        </div>
                    </div>
                </div>


                <button
                    className="bg-black hover:bg-gray-700 text-white py-2 px-8 rounded-lg my-8"
                    onClick={handleSubmit}
                >
                    Submit
                </button>

                <ConfirmSubmission
                    isOpen={showConfirmationModal}
                    onClose={() => setShowConfirmationModal(false)}
                    designImage={imageFile ? URL.createObjectURL(imageFile) : ''}
                    mockupColor={selectedColor}
                    mockupType={selectedType}
                    description={description}
                    username="test_username"
                />

            </div>
        </div>
    );
};

export default SubmitPage;
