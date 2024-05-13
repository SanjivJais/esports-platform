import React from 'react'
import { IoNotificationsCircle } from 'react-icons/io5'
import ReactHtmlParser from 'react-html-parser'



export const NotificationTile = ({notification}) => {
    return (
        <>
            <div title='Click to Mark As Read' className="bg-secondary text-[17px] px-4 py-3 w-full border-b-[0.8px] border-inactive border-opacity-20 group cursor-pointer">
                <div className='text-dimText text-sm my-2'>13 hours ago</div>
                <div className="flex gap-3 items-center ">
                    <div className="flex flex-col self-start"><IoNotificationsCircle className='text-offBlue group-hover:text-openStatus text-3xl' /></div>
                    <div className="flex flex-col">
                        {/* content  */}
                        {ReactHtmlParser(notification.message)}
                        <div className='text-dimText text-sm'>{notification.$createdAt}</div>

                    </div>
                </div>
            </div>
        </>
    )
}
