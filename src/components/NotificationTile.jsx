import React, { useEffect, useState } from 'react'
import { IoNotificationsCircle } from 'react-icons/io5'
import ReactHtmlParser from 'react-html-parser'
import { useAuth } from '../utils/AuthContext'




export const NotificationTile = ({ notification }) => {

    const {user} = useAuth()

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

    function convertISODateToLocal(ISODateString) {
        const date = new Date(ISODateString);
        const offset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
        const localDate = new Date(date.getTime() - offset);

        // Format the local date in ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
        const formattedLocalDate = localDate.toISOString().slice(0, 19) + 'Z';

        return formattedLocalDate;
    }



    function timeAgo(localDateISOString) {
        const date = new Date(localDateISOString);
        const nowDate = new Date();
        const now = new Date(convertISODateToLocal(nowDate))

        const seconds = Math.floor((now - date) / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30); // Approximation
        const years = Math.floor(days / 365); // Approximation

        if (years > 0) {
            return `${years} year${years > 1 ? 's' : ''} ago`;
        } else if (months > 0) {
            return `${months} month${months > 1 ? 's' : ''} ago`;
        } else if (weeks > 0) {
            return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
        } else if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return `< 1 min ago`;
        }
    }


    const [readStatus, setReadStatus] = useState(false)
    useEffect(()=>{
        setReadStatus(
            notification.recipents.some(recipent=>JSON.parse(recipent).user===user.$id && JSON.parse(recipent).read)
        )
    }, [])



    return (
        <>
            <div title='Click to Mark As Read' className="bg-secondary text-[17px] px-4 py-3 w-full border-b-[0.8px] border-inactive border-opacity-20 group cursor-pointer">
                <div className='text-dimText text-sm my-2'>{timeAgo(convertISODateToLocal(notification.$createdAt))}</div>
                <div className="flex gap-3 items-center ">
                    <div className="flex flex-col self-start"><IoNotificationsCircle className={`${readStatus? 'text-openStatus':'text-offBlue group-hover:text-openStatus'}  text-3xl`} /></div>
                    <div className="flex flex-col">
                        {/* content  */}
                        {ReactHtmlParser(notification.message)}

                        <div className='text-dimText text-sm'>{formatDateTime(convertISODateToLocal(notification.$createdAt)).date} / {formatDateTime(convertISODateToLocal(notification.$createdAt)).time}</div>

                    </div>
                </div>
            </div>
        </>
    )
}
