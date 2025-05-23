import React from 'react'
import { IoClose } from 'react-icons/io5'

export const Modal = ({ isVisible, onClose, children, closeButtonActive = true, outsideClose = false }) => {
    if (!isVisible) {
        document.body.classList.remove("overflow-hidden");
        return null
    } else {
        document.body.classList.add("overflow-hidden");

    }
    const handleClose = (e) => {
        if (e.target.id === "modalWrapper" && outsideClose) { onClose() };
    }
    return (
        <div id='modalWrapper' onClick={(e) => handleClose(e)} className="fixed z-40 inset-0 bg-black bg-opacity-70 flex justify-center items-center" >
            <div className='relative bg-secondary overflow-auto custom-scrollbar flex flex-col rounded-[5px] border-inactive border-opacity-10 border-[0.5px] shadow-modal'>
                {closeButtonActive && <IoClose onClick={() => onClose()} className='absolute top-3 right-3 text-3xl bg-secondary p-[5px] bg-opacity-60 rounded-[50%] cursor-pointer' />}
                {children}
            </div>
        </div>
    )
}
