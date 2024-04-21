import React, { useState } from 'react'

export const Tooltip = ({ content, children }) => {
    return (
        <div className="relative inline-block">
            <div className="group hover:cursor-help relative">
                <div className="relative flex">
                    {children}
                    <div className="invisible opacity-0 top-3 -left-8 transition-all duration-200 w-36 bg-frameBG group-hover:visible group-hover:opacity-95 font-light text-offBlue px-[10px] py-[5px] text-sm rounded-[6px] absolute z-10">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    )
}
