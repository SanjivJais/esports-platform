import React, { useEffect, useState } from 'react'
import { FaCaretDown } from 'react-icons/fa6';
import { Modal } from '../Modal';
import { database, db_id } from '../../../config/Appwrite';
import LoadingBar from 'react-top-loading-bar';
import { toast } from 'react-toastify';

export const MatchUpdate = ({ match, participants, gameID }) => {

    const [progress, setProgress] = useState(0)

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

    const [editBoxOpen, setEditBoxOpen] = useState(false)
    const [entryDetails, setEntryDetails] = useState(JSON.parse(match.entryDetails))

    const [updatedMatch, setUpdatedMatch] = useState({
        tournamentID: match.tournamentID,
        matchParticipants: match.matchParticipants,
        scheduledTime: match.scheduledTime,
        matchResults: match.matchResults,
        entryDetails: match.entryDetails,
        matchName: match.matchName,
        matchStatus: match.matchStatus
    })

    const handleInputChange = (e) => {
        e.preventDefault()
        const { name, type, value } = e.target
        setUpdatedMatch(prevData => ({
            ...prevData,
            [name]: type === 'number' ? parseInt(value, 10) : value
        }))
    }

    const handleEntryDetailsChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setEntryDetails(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    useEffect(() => {
        setUpdatedMatch((prevData) => ({
            ...prevData,
            entryDetails: JSON.stringify(entryDetails)
        }))
    }, [entryDetails])

    useEffect(() => {
        if (updatedMatch.matchStatus === "Scheduled") {
            setEntryDetails(JSON.parse(match.entryDetails))
        }
    }, [updatedMatch.matchStatus])


    const [confirmationModal, setConfirmationModal] = useState(false)
    const handleMatchUpdate = async () => {
        setProgress(60)
        try {
            await database.updateDocument(db_id, 'matches', match.$id, updatedMatch)
            toast.success("Match updated!");
            setConfirmationModal(false)
            setEditBoxOpen(false)
        } catch (error) {
            toast.error("Something went wrong!")
        }
        setProgress(100)
    }


    return (
        <>

            <LoadingBar
                color='#F88B26'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <div className="flex flex-col ">

                <div className={`flex items-center justify-between gap-4 bg-secondaryLight p-3 ${editBoxOpen ? 'rounded-tl-[5px] rounded-tr-[5px] border-b-[0.8px] border-inactive border-opacity-20' : 'rounded-[5px]'}`}>
                    <div className="flex items-center gap-3">
                        <div className='bg-finishedStatus px-3 py-[2px] rounded-[4px]'>{match.matchName}</div>
                        <div className={`${match.matchStatus === "Scheduled" ? 'bg-openStatus text-secondary' : match.matchStatus === "Ongoing" ? 'bg-ongoingStatus text-secondary' : match.matchStatus === "Finished" ? 'bg-finishedStatus text-offWhite' : ''} px-3 py-1 rounded-[5px] w-fit text-sm font-semibold`}>{match.matchStatus}</div>

                        <div className={`max-sm:hidden`}>{formatDateTime(match.scheduledTime).date} / {formatDateTime(match.scheduledTime).time}</div>
                    </div>
                    <FaCaretDown onClick={() => setEditBoxOpen(!editBoxOpen)} title='Expand to edit' className={`${editBoxOpen ? 'rotate-180' : ''} transition-transform duration-200 text-base mr-1 cursor-pointer hover:text-offBlue`} />
                </div>

                <div className={`${editBoxOpen ? '' : 'hidden'} grid md:grid-cols-2 grid-cols-1 gap-4 px-4 py-4 bg-secondaryLight rounded-bl-[5px] rounded-br-[5px]`}>

                    <div className="flex flex-col gap-1">
                        <div>Match Name <span className='text-red-500 font-semibold text-lg'>*</span></div>
                        <input onChange={(e) => handleInputChange(e)} disabled={participants.length > 0 || match.matchStatus === "Finished"} name='matchName' type="text" value={updatedMatch.matchName} className='bg-secondary py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div>Start Date <span className='text-red-500 font-semibold text-lg'>*</span></div>
                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
                            <input onChange={(e) => handleInputChange(e)} disabled={participants.length > 0 || match.matchStatus === "Finished"} name='scheduledTime' type="datetime-local" className='bg-secondary py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                            <div className='bg-secondaryLight py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none'>{formatDateTime(updatedMatch.scheduledTime).date} / {formatDateTime(updatedMatch.scheduledTime).time} </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div>Match Status</div>
                        <select onChange={(e) => handleInputChange(e)} name="matchStatus" id="" value={updatedMatch.matchStatus} className='custom-dropdown border-2 border-inactive border-opacity-20 text-offBlue'>
                            <option value="Scheduled">Scheduled</option>
                            <option value="Ongoing">Ongoing</option>
                            <option value="Finished">Finished</option>
                        </select>
                    </div>

                    <fieldset className="flex flex-col gap-2 border-[1px] border-inactive border-opacity-20 rounded-[5px] p-3">
                        <legend className='px-2'>Entry Details</legend>
                        {gameID === 'freefire' && <>
                            <div className="flex flex-col gap-1">
                                <div>Room ID</div>
                                <input onChange={(e) => handleEntryDetailsChange(e)} disabled={updatedMatch.matchStatus !== "Ongoing"} name='roomID' type="text" value={entryDetails.roomID || ''} className='bg-secondary py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                            </div>
                            <div className="flex flex-col gap-1">
                                <div>Room Pass</div>
                                <input onChange={(e) => handleEntryDetailsChange(e)} disabled={updatedMatch.matchStatus !== "Ongoing"} name='roomPass' type="text" value={entryDetails.roomPass || ''} className='bg-secondary py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                            </div>

                        </>}
                    </fieldset>


                    {/* No winner specification for single-match tournament */}


                    {match.matchStatus !== "Finished" && <div className="flex col-span-2 justify-end">
                        <button onClick={() => setConfirmationModal(true)} className='bg-primary text-secondary font-semibold rounded-[5px] px-4 py-2 text-sm self-end'>Update Match</button>
                    </div>}




                </div>

            </div>

            <Modal isVisible={confirmationModal} onClose={() => setConfirmationModal(false)}>
                <div className='p-6 md:w-96 w-72'>
                    <p className='mt-4 flex justify-center'>Are you sure? </p>
                    <div className="flex w-full justify-evenly mt-7">
                        <button onClick={() => setConfirmationModal(false)} className='bg-transparent rounded-[3px] text-inactive border-[1px] border-inactive px-8 py-2 font-medium'>No</button>
                        <button onClick={handleMatchUpdate} className='bg-primary rounded-[3px] text-secondary border-[1px] border-primary px-8 py-2 font-bold'>Yes</button>
                    </div>
                </div>

            </Modal>

        </>
    )
}
