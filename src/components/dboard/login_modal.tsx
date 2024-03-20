import React from "react";
import { useRouter } from "next/navigation";

interface LoginModalProps {
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
    const router = useRouter();

    const handleLogin = () => {
        router.push("/signin");
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-700 bg-opacity-0 bg-blend-multiply">
            <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-700 bg-opacity-50">
                <div className="bg-white w-96 h-auto rounded-lg shadow-lg relative p-6">
                    <div className="text-center">
                        <h2 className="text-xl font-bold mb-2">
                            Login To Vote
                        </h2>
                        <p className="text-md mb-8">Please login to vote!</p>
                        <div className="flex justify-between">
                            {" "}
                            <button
                                onClick={onClose}
                                className="border-2 border-gray-300 text-black py-2 flex-grow rounded-lg hover:bg-gray-200 focus:outline-none"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleLogin}
                                className="bg-black text-white py-2 flex-grow ml-2 rounded-lg hover:bg-gray-700 focus:outline-none"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
