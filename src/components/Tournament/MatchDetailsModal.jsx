import React, { useEffect, useState } from 'react'
import { GiPodiumWinner, GiSandsOfTime } from 'react-icons/gi';
import { useAuth } from '../../utils/AuthContext';
import { FaPeopleGroup } from 'react-icons/fa6';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';

export const MatchDetailsModal = ({ match, tournament }) => {
    const { user, userDetails } = useAuth();

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

    const tabs = document.getElementsByClassName("matchDetailsTab");
    let [activeTab, setActiveTab] = useState(0);
    const handleTabs = (event) => {
        const index = Array.from(tabs).indexOf(event.target);
        setActiveTab(index);
    }

    useEffect(() => (
        setActiveTab(activeTab)
    ), [activeTab])

    const [matchJoinStatus, setMatchJoinStatus] = useState(false)
    useEffect(() => {
        if (user && userDetails) {
            if (JSON.parse(tournament.bracket).bracketType === "single_match") {
                const status = userDetails.tournaments.includes(tournament.$id)
                setMatchJoinStatus(status)
            } else {
                const status = match.matchParticipants.includes(user.$id)
                setMatchJoinStatus(status)
            }
        }
    }, [])

    return (
        <>
            <div className='lg:w-[50vw] md:w-[70vw] w-[90vw] min-h-[10rem] max-h-[40rem] '>
                <div className="m-6 flex flex-col">
                    <div className="flex flex-col gap-3">
                        <div className="md:flex grid grid-cols-1 gap-3 items-center">
                            <div className="bg-secondaryLight px-3 py-1 rounded-[5px] w-fit text-sm">{tournament.tournTitle}</div>
                            <h2 className='text-lg font-semibold'>{match.matchName} Details</h2>
                            <div className={`${match.matchStatus === "Scheduled" ? 'bg-openStatus text-secondary' : match.matchStatus === "Ongoing" ? 'bg-ongoingStatus' : match.matchStatus === "Finished" ? 'bg-finishedStatus text-offWhite' : ''} px-3 py-1 rounded-[5px] w-fit text-sm font-semibold`}>{match.matchStatus}</div>
                        </div>
                        <div className='flex items-center gap-1 text-offBlue'><GiSandsOfTime className='' /><span className='text-finishedStatus font-bold'>Starts At:</span> {formatDateTime(match.scheduledTime).time} / {formatDateTime(match.scheduledTime).date}</div>

                        <div className="flex max-sm:flex-col max-sm:items-start gap-2 items-center">
                            <div className='text-finishedStatus font-bold'>Match Join Details: </div>
                            {matchJoinStatus ?
                                <>
                                    {match.matchStatus === "Ongoing" ?
                                        <>
                                            {tournament.gameID === "freefire" && <>
                                                {match.entryDetails && <div className="flex gap-2">
                                                    <div className='bg-secondaryLight px-2 py-1 rounded-[3px]'>Room ID: {JSON.parse(match.entryDetails).roomID}</div>
                                                    <div className='bg-secondaryLight px-2 py-1 rounded-[3px]'>Room Pass: {JSON.parse(match.entryDetails).roomPass}</div>
                                                </div>}
                                            </>}
                                        </>
                                        :
                                        <>
                                            <p className='text-inactive'>Entry details are revealed around <strong className='text-offBlue'>10 minutes</strong> before starting time of match!</p>
                                        </>
                                    }
                                </>
                                : <p className='text-inactive'>You are not a participant of this match! </p>
                            }

                        </div>
                        <div className='my-4'>
                            <div className="flex md:gap-8 gap-4 md:text-base text-sm custom-scrollbar whitespace-nowrap overflow-x-auto">
                                <label htmlFor="" onClick={(e) => handleTabs(e)} className={`matchDetailsTab ${activeTab === 0 ? 'md:border-b-2 md:border-primary md:text-offBlue text-primary' : 'text-inactive hover:text-offBlue'}  pb-2 font-semibold cursor-pointer`}>Match Participants</label>
                                <label htmlFor="" onClick={(e) => handleTabs(e)} className={`matchDetailsTab ${activeTab === 1 ? 'md:border-b-2 md:border-primary md:text-offBlue text-primary' : 'text-inactive hover:text-offBlue'}  pb-2 font-semibold cursor-pointer`}>Match Results</label>

                            </div>
                            <div className="h-[1px] bg-inactive bg-opacity-25 w-full"></div>
                        </div>

                        <div>
                            {activeTab === 0 && <>
                                {JSON.parse(tournament.bracket).bracketType === "single_match" ?
                                    <>
                                        <div className='w-full h-64 border-[0.8px] border-inactive border-opacity-20 rounded-[5px] flex justify-center items-center text-inactive'>
                                            <div className='flex flex-col gap-3 items-center'>
                                                <IoCheckmarkDoneSharp className='text-4xl text-openStatus text-opacity-75' />
                                                All participants of the tournament!
                                            </div>
                                        </div>
                                    </> : <>

                                    </>}
                            </>}
                            {activeTab === 1 && <>
                                {match.matchStatus === "Finished" ?
                                    <>

                                    </> : <>
                                        <div className='w-full h-64 border-[0.8px] border-inactive border-opacity-20 rounded-[5px] flex justify-center items-center text-inactive'>
                                            <div className='flex flex-col gap-3 items-center'>
                                                <GiPodiumWinner className='text-4xl' />
                                                Match is yet to finish!
                                            </div>
                                        </div>
                                    </>}
                            </>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
