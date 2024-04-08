import React from 'react'
import { IoClose } from 'react-icons/io5'

export const Modal = ({ isVisible, onClose }) => {
    if (!isVisible) return null;
    const handleClose = (e) => {
        // if (e.target.id === "modalWrapper") { onClose() };
    }
    return (
        <div id='modalWrapper' className="fixed z-40 inset-0 bg-secondary backdrop-blur-sm bg-opacity-30 flex justify-center items-center">
            <div className='bg-secondary overflow-auto custom-scrollbar h-[85vh] w-[72vw] flex flex-col rounded-[5px] shadow-modal'>
                <IoClose onClick={() => onClose()} className='self-end m-4 text-3xl bg-secondary p-[5px] bg-opacity-60 rounded-[50%] cursor-pointer' />
            </div>
        </div>
    )
}
