import React from 'react'

export const Alert = ({ type, message }) => {
    var color = "bg-gray-500 text-gray-100";
    switch (type) {
        case "error":
            color = `bg-red-500 text-red-100`;
            break;
        case "warning":
            color = "bg-yellow-500 text-yellow-100";
            break;
        case "success":
            color = "bg-green-500 text-green-100";
            break;
        default:
            break;
    }
    return (
        <div className={`${color} bg-opacity-30 rounded-[3px] w-full px-4 py-2 my-2`}>
            {message}
        </div>
    )
}
