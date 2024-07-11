import React, { useState } from 'react'
import { FaExpandAlt } from 'react-icons/fa';
import { MatchDetailsModal } from './MatchDetailsModal';
import { Modal } from '../Modal';
import { formatDateTime } from '../../utils/DateUtils';



export const MatchTile = ({ match, tournament }) => {

    const [detailsModalVisible, setDetailsModalVisible] = useState(false)

    return (
        <>
            <div className='flex items-center justify-between gap-4 bg-secondaryLight p-3 rounded-[5px]'>
                <div className="flex items-center gap-3">
                    <div className='bg-primary text-secondary font-semibold text-sm px-3 py-[2px] rounded-[4px]'>{match.matchName}</div>
                    <div className={`${match.matchStatus === "Scheduled" ? 'bg-openStatus text-secondary' : match.matchStatus === "Ongoing" ? 'bg-ongoingStatus text-secondary' : match.matchStatus === "Finished" ? 'bg-finishedStatus text-offWhite' : ''} px-3 py-[2px] rounded-[5px] w-fit text-sm font-semibold`}>{match.matchStatus}</div>

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
