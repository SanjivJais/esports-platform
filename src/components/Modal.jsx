import React from 'react'
import { IoClose } from 'react-icons/io5'

export const Modal = ({ isVisible, onClose, children }) => {
    if (!isVisible) return null;
    // const handleClose = (e) => {
    //     if (e.target.id === "modalWrapper") { onClose() };
    // }
    return (
        <div id='modalWrapper' className="fixed z-40 inset-0 bg-black backdrop-blur bg-opacity-40 flex justify-center items-center" style={{ backdropFilter: 'blur(1.5px)' }}>
            <div className='relative bg-secondary overflow-auto custom-scrollbar h-[85vh] w-[72vw] flex flex-col rounded-[5px] border-inactive border-opacity-10 border-[0.5px] shadow-modal'>
                <IoClose onClick={() => onClose()} className='absolute top-3 right-3 text-3xl bg-secondary p-[5px] bg-opacity-60 rounded-[50%] cursor-pointer' />
                {children}
            </div>
        </div>
    )
}
