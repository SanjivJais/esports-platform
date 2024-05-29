import React, { useState } from 'react'
import { FaExpandAlt } from 'react-icons/fa';
import { MatchDetailsModal } from './MatchDetailsModal';
import { Modal } from '../Modal';



export const MatchTile = ({ match, tournament }) => {

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

    const [detailsModalVisible, setDetailsModalVisible] = useState(false)

    return (
        <>
            <div className='flex items-center justify-between gap-4 bg-secondaryLight p-3 rounded-[5px]'>
                <div className="flex items-center gap-3">
                    <div className='bg-finishedStatus px-3 py-[2px] rounded-[4px]'>{match.matchName}</div>
                    <div className={`${match.matchStatus === "Scheduled" ? 'bg-openStatus text-secondary' : match.matchStatus === "Ongoing" ? 'bg-ongoingStatus' : match.matchStatus === "Finished" ? 'bg-finishedStatus text-offWhite' : ''} px-3 py-1 rounded-[5px] w-fit text-sm font-semibold`}>{match.matchStatus}</div>

                    <div className={`max-sm:hidden`}>{formatDateTime(match.scheduledTime).date} / {formatDateTime(match.scheduledTime).time}</div>
                </div>
                <FaExpandAlt onClick={() => setDetailsModalVisible(true)} title='Expand' className='text-base mr-1 cursor-pointer hover:text-offBlue' />
            </div>

            <Modal outsideClose={false} isVisible={detailsModalVisible} onClose={() => setDetailsModalVisible(false)}>
                <MatchDetailsModal match={match} tournament={tournament} />
            </Modal>

        </>
    )
}
