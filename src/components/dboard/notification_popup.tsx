// NotificationPopup.tsx
import React from "react";

type NotificationPopupProps = {
    message: string;
    // Uncomment the following line if you want to make the close button functional
    // onClose: () => void;
};

const NotificationPopup: React.FC<NotificationPopupProps> = ({
    message /* , onClose */,
}) => {
    return (
        <div className="fixed inset-x-0 bottom-10 z-50 flex justify-center">
            <div
                className="bg-white py-4 px-6 rounded-lg shadow-lg flex items-center justify-center"
                style={{ maxWidth: "300px" }}
            >
                <div className="text-center">
                    <p className="text-sm font-semibold text-gray-800">
                        {message}
                    </p>
                    {/* Optional Close Button -> if you want a button to force clsoe
                    <button
                        onClick={onClose}
                        className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-lg text-xs"
                    >
                        Close
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default NotificationPopup;
