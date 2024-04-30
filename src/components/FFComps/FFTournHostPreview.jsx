import React, { useState } from 'react'
import { Modal } from '../Modal';
import { FFTournModalComponent } from './FFTournModalComponent';
import { FaRegClock } from 'react-icons/fa6';
import { HiMiniTrophy } from 'react-icons/hi2';
import { UpdateFFTournHost } from './UpdateFFTournHost';


export const FFTournHostPreview = ({ tournament }) => {
    const [showModal, setShowModal] = useState(false);
    let totalPrize = 0;
    for (let index = 0; index < tournament.prizes.length; index++) {
        totalPrize += tournament.prizes[index];
    }

    let joinPercent = parseInt((tournament.participants.length * 100) / tournament.max);

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

    const calculateTimeLeft = (targetDateTime) => {
        // Parse the target date and time
        const [dateString, timeString] = targetDateTime.split('T');
        const [year, month, day] = dateString.split('-').map(Number);
        const [hour, minute] = timeString.split(':').map(Number);

        // Create a new Date object using the extracted components
        const targetDate = new Date(year, month - 1, day, hour, minute);

        // Get the current date and time
        const currentDate = new Date();

        // Calculate the time difference in milliseconds
        const timeDifference = targetDate - currentDate;

        // Calculate days and hours left
        const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        return { daysLeft, hoursLeft };
    };



    const cardStyles = {
        backgroundImage: `url("${tournament.imgURL}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '5px',
    };
    return (
        <div className='w-full h-auto rounded-[5px] border-[0.8px] border-inactive border-opacity-40 hover:shadow-card'>
            <div className={`flex flex-col justify-between rounded-br-none rounded-bl-none w-full h-52`} style={cardStyles}>
                <div className="flex justify-between px-2 pt-2">
                    <div className='bg-secondary h-fit relative text-[13px] px-3 py-[3px] rounded-2xl font-semibold flex items-center gap-1'><FaRegClock className='text-openStatus' />{calculateTimeLeft(tournament.startTime).daysLeft}d, {calculateTimeLeft(tournament.startTime).hoursLeft}hrs </div>
                    <div className='bg-secondary h-fit bg-opacity-90 relative text-[12px] px-3 py-[3px] rounded-xl'>Free Fire</div>
                </div>
                <div className='bg-secondary bg-opacity-80 px-3 py-3'>
                    <div className="flex justify-between  text-[13px] mb-1">
                        <label htmlFor="" >Participants Joined</label>
                        <label htmlFor=""><span>{tournament.participants.length}</span> / <span className='text-primary'>{tournament.max}</span></label>
                    </div>
                    <div className='bg-gray w-full h-2 rounded-lg'>
                        <div className={`bg-primary h-2 rounded-lg`} style={{ width: joinPercent + '%' }}></div>
                    </div>
                </div>
            </div>
            <div className="pt-4 pb-3 px-3 text-sm">
                <div className='mb-3 flex items-center gap-[6px]'><HiMiniTrophy />{tournament.tournTitle}</div>
                <div className="h-[0.8px] bg-inactive bg-opacity-30 my-4"></div>
                <div className="flex justify-between">
                    <div>
                        <label htmlFor="" className='text-[12px] text-dimText'>ENTRY</label>
                        <div className='font-semibold flex items-center gap-1'>{tournament.entryFee !== 0 && <img className='' src="/icons/Coin.svg" alt="" />}{tournament.entryFee == 0 ? 'Free' : tournament.entryFee}</div>
                    </div>
                    <div>
                        <label htmlFor="" className='text-[12px] text-dimText'>MODE</label>
                        <div className='font-semibold'>{tournament.gameMode} - {tournament.teamType}</div>
                    </div>
                    <div>
                        <label htmlFor="" className='text-[12px] text-dimText'>PRIZE POOL</label>
                        <div className='font-semibold flex items-center gap-1'>{tournament.rewardType === "eg_coin" && <img className='' src="/icons/Coin.svg" alt="" />} {totalPrize}</div>
                    </div>
                    <div>
                        <label htmlFor="" className='text-[12px] text-dimText'>STATUS</label>
                        <div className={`text-[12px] mt-[2px] font-medium ${tournament.status === "Open" ? 'bg-openStatus' : tournament.status === "Ongoing" ? 'bg-ongoingStatus' : tournament.status === "Finished" ? 'bg-finishedStatus' : 'bg-abortedStatus'} bg-opacity-40 w-fit px-2 py-[2px] rounded-xl`}>{tournament.status}</div>
                    </div>

                </div>
                <div className="h-[0.8px] bg-inactive bg-opacity-30 my-4"></div>
                <div className="flex justify-between">
                    <div>
                        <label htmlFor="" className='text-[12px] text-dimText'>STARTING</label>
                        <div className='font-semibold flex gap-2'><span>{formatDateTime(tournament.startTime).date} . {formatDateTime(tournament.startTime).time}</span> </div>
                    </div>
                    {(tournament.status == "Open" || tournament.status == "Ongoing") ?
                        <button onClick={() => setShowModal(true)} className=' px-5 py-2 text-secondary rounded-[5px] font-bold bg-primary'>Update</button>
                        :
                        <button onClick={() => setShowModal(true)} className=' px-5 py-2 rounded-[5px] font-bold bg-secondaryLight border-2 border-inactive border-opacity-25 text-offBlue'>See Details</button>

                    }
                </div>

            </div>
            <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
                <UpdateFFTournHost tournament={tournament} />
            </Modal>
        </div>
    )
}
