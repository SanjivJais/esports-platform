import React from 'react'
import { IoNotificationsCircle } from 'react-icons/io5'
import ReactHtmlParser from 'react-html-parser'



export const NotificationTile = ({ notification }) => {


    const formatDateTime = (dateTimeString) => {
        // Split the input string into date and time parts
        const [datePart, timePart] = dateTimeString.split('T');

        const [year, month, day] = datePart.split('-');
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const formattedDate = `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;

        // Parse the time part
        const [hours, minutes] = timePart.split(':');
        const hour = parseInt(hours, 10) > 12 ? parseInt(hours, 10) - 12 : parseInt(hours, 10);
        const ampm = parseInt(hours, 10) >= 12 ? 'PM' : 'AM';
        const formattedTime = `${hour}:${minutes} ${ampm}`;

        return { date: formattedDate, time: formattedTime };
    };


    return (
        <>
            <div title='Click to Mark As Read' className="bg-secondary text-[17px] px-4 py-3 w-full border-b-[0.8px] border-inactive border-opacity-20 group cursor-pointer">
                <div className='text-dimText text-sm my-2'>13 hours ago</div>
                <div className="flex gap-3 items-center ">
                    <div className="flex flex-col self-start"><IoNotificationsCircle className='text-offBlue group-hover:text-openStatus text-3xl' /></div>
                    <div className="flex flex-col">
                        {/* content  */}
                        {ReactHtmlParser(notification.message)}

                        <div className='text-dimText text-sm'>{formatDateTime(notification.timestamp).date} at {formatDateTime(notification.timestamp).time}</div>

                    </div>
                </div>
            </div>
        </>
    )
}
