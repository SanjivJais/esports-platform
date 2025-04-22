import React from 'react'
import parse from 'html-react-parser';

export const AnnouncementsCard = ({ announcement }) => {

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
            <div className='bg-secondary p-6 gap-3 flex max-sm:flex-col w-full my-5 rounded-[5px] '>
                <div className="flex md:flex-col md:gap-[3px] gap-[6px] text-inactive min-w-24">
                    <div>Published On</div>
                    <div className='text-offBlue'>{formatDateTime(announcement.$createdAt).date}</div>
                </div>
                <div className="w-[0.8px] h-full bg-inactive bg-opacity-20">

                </div>
                <div className="flex flex-col gap-1">
                    <h3 className='text-[1.3rem] font-semibold text-offWhite'>{announcement.title}</h3>

                    <div className='text-offBlue content-area'>{parse(announcement.content)}</div>
                </div>
            </div>
        </>
    )
}
