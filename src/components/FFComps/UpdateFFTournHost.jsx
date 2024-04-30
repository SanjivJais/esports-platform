import React from 'react'

export const UpdateFFTournHost = ({ tournament }) => {

    // formatting datetime 
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
        <div className='md:w-[76vw] w-[95vw] h-[92vh]'>
            <div className='md:m-6 m-4 flex flex-col'>
                <div className="grid grid-cols-12">
                    <img src={tournament.imgURL} alt="" className='md:col-span-5 col-span-12 rounded-[5px]' />
                    <div className='grid md:grid-cols-2 grid-cols-1 px-4 md:col-span-7 col-span-12 gap-x-3 gap-y-2'>
                        <div className="flex flex-col gap-1">
                            <div>Entry Fee</div>
                            <input disabled name='entryFee' type="number" value={tournament.entryFee} placeholder='Eg. 0' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div>Game Mode</div>
                            <input disabled name='gameMode' type="text" value={tournament.gameMode} className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div>Team Type</div>
                            <input disabled name='teamType' type="text" value={tournament.teamType} className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div>Reward Type</div>
                            <input disabled name='rewardType' type="text" value={tournament.rewardType} className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div>Start Time</div>
                            <div className='bg-secondaryLight py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none'>{formatDateTime(tournament.startTime).date} / {formatDateTime(tournament.startTime).time} </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div>Change Time</div>
                            <input disabled name='startTime' type="datetime-local" className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                        </div>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 my-5 gap-3">
                    <div className="flex flex-col gap-1">
                        <div>Tournament Title</div>
                        <input name='tournTitle' type="text" value={tournament.tournTitle} className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div>Thumbnail URL</div>
                        <input name='imgURL' type="text" value={tournament.imgURL} className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                    </div>

                </div>

            </div>
        </div>
    )
}
