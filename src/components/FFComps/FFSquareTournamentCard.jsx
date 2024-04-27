import React, { useState } from 'react'
import { Modal } from '../Modal';
import { FFTournModalComponent } from './FFTournModalComponent';


export const FFSquareTournamentCard = ({ tournament }) => {
    const [showModal, setShowModal] = useState(false);
    let totalPrize = 0;
    for (let index = 0; index < tournament.prizes.length; index++) {
        totalPrize += tournament.prizes[index];
    }

    let joinPercent = parseInt((tournament.participants.length * 100) / tournament.max);

    // formatting datetime
    const formatDateTime = (dateTimeString) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const dateTime = new Date(dateTimeString);
        const date = dateTime.toLocaleDateString('en-US', options);
        const time = dateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

        return { date, time };
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
                <label htmlFor="Game Title" className='self-end bg-secondary h-fit bg-opacity-80 relative text-[12px] px-3 py-[3px] rounded-xl top-2 right-2'>Free Fire</label>
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
                        <div className={`text-[12px] mt-[2px] font-medium ${tournament.status === "Open" ? 'bg-green-500' : 'bg-red-500'} bg-opacity-30 w-fit px-3 py-[2px] rounded-xl`}>{tournament.status}</div>
                    </div>

                </div>
                <div className="h-[0.8px] bg-inactive bg-opacity-30 my-4"></div>
                <div className="flex justify-between">
                    <div>
                        <label htmlFor="" className='text-[12px] text-dimText'>STARTING</label>
                        <div className='font-semibold flex gap-2'><span>{formatDateTime(tournament.startTime).date} . {formatDateTime(tournament.startTime).time}</span> </div>
                    </div>
                    <button onClick={() => setShowModal(true)} className='bg-secondaryLight px-5 py-2 hover:text-secondary border-[0.8px] border-inactive border-opacity-40 hover:border-primary transition-colors duration-200 ease-in-out rounded-[5px] font-bold hover:bg-primary'>View Details</button>
                </div>

            </div>
            <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
                <FFTournModalComponent tournament={tournament} />
            </Modal>
        </div>
    )
}
