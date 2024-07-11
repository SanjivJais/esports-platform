import React, { useEffect, useState } from 'react'
import { FaCircleCheck, FaRegClock } from 'react-icons/fa6';
import { useAuth } from '../../utils/AuthContext';
import { Link } from 'react-router-dom';
import { calculateTimeLeft } from '../../utils/DateUtils'

export const TournCard = ({ tournament }) => {
    let totalPrize = 0;
    for (let index = 0; index < tournament.prizePool.length; index++) {
        totalPrize += tournament.prizePool[index];
    }

    let joinPercent = parseInt((tournament.participants.length * 100) / tournament.max);

    const cardStyles = {
        backgroundImage: `url("${tournament.imgURL}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '5px',
    };

    const { user, userDetails } = useAuth();
    const [joinStatus, setJoinStatus] = useState(false)
    useEffect(() => {
        if (user && userDetails) {
            const status = userDetails.tournaments.includes(tournament.$id)
            setJoinStatus(status)
        }
    }, [user, userDetails])


    return (
        <Link to={`/t/${tournament.$id}`}>
            <div className='w-full h-auto rounded-[5px] border-[0.8px] border-inactive border-opacity-40 hover:shadow-card'>
                <div className={`flex flex-col justify-between rounded-br-none rounded-bl-none w-full h-52`} style={cardStyles}>
                    <div className="flex justify-between px-2 pt-2">
                        <div className="flex flex-col gap-2">
                            <div className='bg-secondary h-fit bg-opacity-90 relative text-[12px] px-3 py-[3px] rounded-xl'>{tournament.gameID === "freefire" ? "Free Fire" : ''}</div>
                            {joinStatus && <div className='bg-secondary text-openStatus h-fit text-center flex items-center gap-1 bg-opacity-90 relative text-[12px] px-3 py-[3px] rounded-xl'><span>Joined</span><FaCircleCheck className='text-[11px]' /></div>}

                        </div>
                        {tournament.status === "Open" && calculateTimeLeft(tournament.regEnd).daysLeft >= 0 && calculateTimeLeft(tournament.regEnd).hoursLeft >= 0 && <div className='bg-secondary h-fit relative text-[13px] px-3 py-[3px] rounded-2xl font-semibold flex items-center gap-1'><FaRegClock className='text-openStatus' />{calculateTimeLeft(tournament.regEnd).daysLeft}d, {calculateTimeLeft(tournament.regEnd).hoursLeft}hrs </div>}
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
                <div className="pt-4 pb-2 px-3 text-sm">
                    <div className="flex justify-between">
                        <div>
                            <label htmlFor="" className='text-[12px] text-dimText'>ENTRY</label>
                            <div className='font-semibold flex items-center gap-1'>{JSON.parse(tournament.entryFee).fee !== 0 ? JSON.parse(tournament.entryFee).currencyType === "eg_coin" ? <img className='' src="/icons/Coin.svg" alt="" /> : <img className='' src="/icons/eg_token.svg" alt="" /> : ''}{JSON.parse(tournament.entryFee).fee == 0 ? 'Free' : JSON.parse(tournament.entryFee).fee}</div>
                        </div>
                        {tournament.gameID === "freefire" && <div>
                            <label htmlFor="" className='text-[12px] text-dimText'>MODE</label>
                            <div className='font-semibold'>{JSON.parse(tournament.gameDetails).gameMode} - {JSON.parse(tournament.gameDetails).teamSize}</div>
                        </div>}
                        <div>
                            <label htmlFor="" className='text-[12px] text-dimText'>PRIZE POOL</label>
                            <div className='font-semibold flex items-center gap-1'>{tournament.prizeType === "eg_coin" ? <img className='' src="/icons/Coin.svg" alt="" /> : <img className='' src="/icons/eg_token.svg" alt="" />} {totalPrize}</div>
                        </div>
                        <div>
                            <label htmlFor="" className='text-[12px] text-dimText'>STATUS</label>
                            <div className={`text-[12px] mt-[2px] font-medium ${tournament.status === "Open" ? 'bg-openStatus' : tournament.status === "Ongoing" ? 'bg-ongoingStatus' : tournament.status === "Finished" ? 'bg-finishedStatus' : tournament.status === "Upcoming" ? 'bg-primary' : 'bg-abortedStatus'} bg-opacity-40 w-fit px-2 py-[2px] rounded-xl`}>{tournament.status}</div>
                        </div>
                    </div>

                    <div className="h-[0.8px] bg-inactive bg-opacity-30 my-4"></div>
                    <div className='mb-2 flex items-center gap-[6px] text-[15px]'>{tournament.tournTitle}</div>


                </div>

            </div>
        </Link>

    )
}
