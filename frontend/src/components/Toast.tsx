import { CircleCheckBig, CircleX, TriangleAlert } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ToastType } from "../types/Toast";

interface ToastProps {
    type: ToastType;
    message: string;
}

const Toast: React.FC<ToastProps> = ({ type, message }) => {

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="toast fixed toast-top toast-end z-50">
            {type === "success" && (
                <div className="alert flex items-center space-x-2 p-4 rounded-md shadow-md bg-white border-1">
                    <CircleCheckBig className="icon-medium text-green-500" />
                    {message}
                </div>
            )}
            {type === "error" && (
                <div className="alert flex items-center space-x-2 p-4 rounded-md shadow-md bg-white border-1">
                    <CircleX className="icon-medium text-red-500" />
                    {message}
                </div>
            )}
            {type === "warning" && (
                <div className="alert flex items-center space-x-2 p-4 rounded-md shadow-md bg-white border-1">
                    <TriangleAlert className="icon-medium text-yellow-500" />
                    {message}
                </div>
            )}
        </div>
    );
};

export default Toast;