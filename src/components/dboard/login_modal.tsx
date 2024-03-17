import React from "react";
import { IoClose } from "react-icons/io5"; // make sure to install react-icons if you haven't
import { useRouter } from "next/navigation";

type LoginModalProps = {
    onClose: () => void;
};

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
    const router = useRouter();

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white w-64 h-auto rounded-lg shadow-lg relative flex flex-col items-center justify-center p-6">
                <p className="text-lg font-semibold mb-2">
                    Please Login to Vote!
                </p>
                <p className="text-sm text-gray-500 mb-8">
                    One step away from creative merch designs!
                </p>
                <div className="flex justify-between items-center w-full">
                    <button
                        onClick={() => router.push("/signin")}
                        className="bg-black text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-80 mr-2 flex-grow"
                    >
                        Login
                    </button>
                    <button
                        onClick={onClose}
                        className="text-black font-bold py-2 px-6 rounded-lg hover:bg-gray-100 ml-2 flex-grow"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
