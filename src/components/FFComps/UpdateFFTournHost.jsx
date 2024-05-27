import React, { useEffect, useState } from 'react'
import { FaPeopleGroup } from 'react-icons/fa6';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { database, db_id } from '../../../config/Appwrite';
import { toast } from 'react-toastify';
import { ID, Query } from 'appwrite';
import LoadingBar from 'react-top-loading-bar';
import { Modal } from '../Modal'
import { useNavigate } from 'react-router-dom'



export const UpdateFFTournHost = ({ tournament, onClose }) => {
    const navigate = useNavigate();



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


    const [updatedTournament, setUpdatedTournament] = useState({
        entryFee: tournament.entryFee,
        gameMode: tournament.gameMode,
        host: tournament.host,
        imgURL: tournament.imgURL,
        isFeatured: tournament.isFeatured,
        map: tournament.map,
        matches: tournament.matches,
        max: tournament.max,
        min: tournament.min,
        participants: tournament.participants,
        prizes: tournament.prizes,
        rewardType: tournament.rewardType,
        roomID: tournament.roomID,
        roomPass: tournament.roomPass,
        rulesDetails: tournament.rulesDetails,
        startTime: tournament.startTime,
        status: tournament.status,
        teamType: tournament.teamType,
        tournTitle: tournament.tournTitle,
        winners: tournament.winners,
        ytLiveURL: tournament.ytLiveURL,
    })


    const [prizesData, setPrizesData] = useState(tournament.prizes); // Initial state with a number

    const addPrize = () => {
        setPrizesData([...prizesData, 0]); // Add a number (0 in this case) to the prizes array
    };

    useEffect(() => {
        setUpdatedTournament((prevData) => ({
            ...prevData,
            prizes: prizesData
        }))
    }, [prizesData])

    const handlePrizeChange = (index, value) => {
        const updatedPrizes = [...prizesData];
        updatedPrizes[index] = parseInt(value, 10);
        setPrizesData(updatedPrizes);
    };

    // loading participants 
    const [progress, setProgress] = useState(0)

    const [participantDetails, setParticipantDetails] = useState([])
    useEffect(() => {
        setProgress(40)
        const fetchUserDetails = async () => {
            try {
                const userDetailsPromises = tournament.participants.map(async participantId => {
                    const userDetail = await database.getDocument(db_id, 'user_details', participantId, [Query.select(['prof_pic_url', 'username'])]);
                    return userDetail;
                });
                const userDetailsData = await Promise.all(userDetailsPromises);

                const userGamePromises = tournament.participants.map(async participantId => {
                    const userGameDetails = await database.getDocument(db_id, 'ff_profiles', participantId, [Query.select(['ff_name', 'ff_uid'])]);
                    return userGameDetails;
                });

                const userGameData = await Promise.all(userGamePromises);

                const updatedParticipantDetails = userDetailsData.map((userDetail, index) => ({
                    ...userDetail,
                    ff_name: userGameData[index].ff_name,
                    ff_uid: userGameData[index].ff_uid
                }));

                setParticipantDetails(updatedParticipantDetails);
            } catch (error) {
                toast.error(`Error fetching participant details: ${error.message}`);
            }
            setProgress(100)

        };
        fetchUserDetails();
    }, []);


    // copy tournament ID functionality 
    const handleUsernameCopyClick = (username) => {
        navigator.clipboard.writeText(username)
            .then(() => {
                toast.success("Username copied")
            })
            .catch((error) => toast.error('Error copying username'));
    }

    // handle winners
    const [winnerData, setWinnerData] = useState(tournament.winners);   // winnerData contains usernames of winners
    useEffect(() => {
        setUpdatedTournament((prevData) => ({
            ...prevData,
            winners: winnerData
        }))
    }, [winnerData])

    useEffect(() => {
        if (updatedTournament.status !== 'Finished') {
            setWinnerData([]);
        } else {
            setWinnerData(tournament.winners)
        }
    }, [updatedTournament.status])

    const handleWinnerChange = (index, value) => {
        const updatedWinner = [...winnerData];
        updatedWinner[index] = value;
        setWinnerData(updatedWinner);
    };

    const handleInputChange = (e) => {
        e.preventDefault()
        let { name, value, type } = e.target;
        if (value == "") value = null

        setUpdatedTournament((prevData) => ({
            ...prevData,
            [name]: type === 'number' ? parseInt(value, 10) : value
        }))
    }


    const [confirmationModal, setConfirmationModal] = useState(false)
    const handleUpdate = () => {
        if (updatedTournament.status == "Finished") {
            if (updatedTournament.winners.filter(item => item.trim() !== '').length == updatedTournament.prizes.length) {
                let usernameArray = participantDetails.map(user => user.username)
                let count = 0;
                for (let i = 0; i < winnerData.length; i++) {
                    if (usernameArray.includes(winnerData[i]))
                        ++count;
                }
                if (count == winnerData.length) {
                    setConfirmationModal(true)
                } else {
                    toast.error(`At least one user is not in participants list, recheck please!`)
                }
            } else {
                toast.info("All winners must be specified")
            }
        } else {
            setConfirmationModal(true)
        }
    }

    const handleFinalUpdate = async () => {
        setProgress(40)
        if (updatedTournament.status === "Finished") {
            try {
                const prizeValues = await database.getDocument(db_id, 'ff_tournaments', tournament.$id, [Query.select('prizes')])
                for (let index = 0; index < winnerData.length; index++) {
                    const winnerUsername = winnerData[index];
                    const userData = await database.listDocuments(db_id, 'user_details', [Query.equal('username', winnerUsername)])

                    if (userData.total == 1) {
                        let coin = userData.documents[0].eg_coin;
                        let prize = prizeValues.prizes[index]

                        let updatedCoin = coin + prize;
                        await database.updateDocument(db_id, 'user_details', userData.documents[0].$id, { 'eg_coin': updatedCoin })
                        toast.success(`${winnerUsername}: ${coin} + ${prize} (Prize#${index + 1}) = ${updatedCoin}`, {
                            autoClose: false,
                        })

                        let notif = await database.createDocument(db_id, 'notifications', ID.unique(),
                            {
                                recipentType: "specific",
                                message: `🎉 Congratulations! You got <span class="text-primary">rank ${index + 1} </span>in tournament <span class="text-offBlue">${tournament.tournTitle} (ID: ${tournament.$id})</span>. <span class="text-primary">${prize} EG Coins</span> credited to your account.`,
                                recipents: [
                                    JSON.stringify(
                                        {
                                            user: userData.documents[0].$id,
                                            read: false
                                        }
                                    )
                                ],
                                targetLink: null
                            }
                        )

                        await database.updateDocument(db_id, 'user_details', userData.documents[0].$id, { 'notifications': [notif.$id] })

                    } else {
                        toast.error(`User '${winnerUsername}' not found!`, { autoClose: false, })
                    }
                }

            } catch (error) {
                toast.error(error.message)
            }
        }

        if (updatedTournament.status === "Aborted") {
            if (tournament.entryFee > 0) {
                try {
                    const response = await database.getDocument(db_id, 'ff_tournaments', tournament.$id, [Query.select(['participants'])])
                    if (response.participants.length > 0) {
                        let count = 0;
                        for (let i = 0; i < response.participants.length; i++) {
                            const participantID = response.participants[i];
                            try {
                                const userRes = await database.getDocument(db_id, 'user_details', participantID, [Query.select(['eg_coin'])])
                                let coin = userRes.eg_coin;
                                let updatedCoin = coin + tournament.entryFee;
                                try {
                                    await database.updateDocument(db_id, 'user_details', participantID, { 'eg_coin': updatedCoin })
                                    count++;
                                } catch (error) {
                                    toast.error("Error updating funds of participants!")
                                }
                            } catch (error) {
                                toast.error(`Error fetching funds of participants!`)
                            }
                        }

                        if (count == response.participants.length)
                            toast.success(`Entry fees of ${count} participants refunded successfully!`)
                    }
                } catch (error) {

                }

            }
        }

        try {
            await database.updateDocument(db_id, 'ff_tournaments', tournament.$id, updatedTournament)
            toast.success("Tournament updated")
        } catch (error) {
            toast.error(error.message)
        }
        setConfirmationModal(false)
        onClose();
        setProgress(100)
        let pauseTime = 2500
        if (updatedTournament.status === "Finished") {
            pauseTime = 5000
        }

        toast.info("Page will refresh shortly", {
            autoClose: pauseTime,
            hideProgressBar: false,
        })
        setTimeout(() => {
            window.location.reload(true);
        }, pauseTime)

    }

    return (
        <>
            <LoadingBar
                color='#F88B26'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />


            <div className='xl:w-[76vw] lg:w-[82vw] w-[95vw] h-[92vh] '>
                <div className='md:m-6 m-4 flex flex-col pb-4'>
                    <div className="grid grid-cols-12 gap-4">
                        <img src={updatedTournament.imgURL} alt="" className='md:col-span-5 col-span-12 rounded-[5px]' />
                        <div className='grid md:grid-cols-2 grid-cols-1 md:col-span-7 col-span-12 gap-x-3 gap-y-2'>
                            <div className="flex flex-col gap-1">
                                <div>Entry Fee</div>
                                <input onChange={(e) => handleInputChange(e)} disabled={participantDetails.length != 0 || tournament.status === "Finished"} name='entryFee' type="number" value={updatedTournament.entryFee} placeholder='Eg. 0' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                            </div>
                            <div className="flex flex-col gap-1">
                                <div>Game Mode</div>
                                <input onChange={(e) => handleInputChange(e)} disabled name='gameMode' type="text" value={updatedTournament.gameMode} className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                            </div>
                            <div className="flex flex-col gap-1">
                                <div>Team Type</div>
                                <select onChange={(e) => handleInputChange(e)} disabled name="teamType" id="" value={updatedTournament.teamType} className='custom-dropdown border-2 border-inactive border-opacity-20 text-offBlue'>
                                    <option value="Solo">Solo</option>
                                    <option value="Duo">Duo</option>
                                    <option value="Squad">Squad</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div>Reward Type</div>
                                <select onChange={(e) => handleInputChange(e)} disabled={participantDetails.length != 0 || tournament.status === "Finished"} name="rewardType" id="" value={updatedTournament.rewardType} className='custom-dropdown border-2 border-inactive border-opacity-20 text-offBlue'>
                                    <option value="eg_coin">EG Coin</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div>Start Time</div>
                                <div className='bg-secondaryLight py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none'>{formatDateTime(updatedTournament.startTime).date} / {formatDateTime(updatedTournament.startTime).time} </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div>Change Time</div>
                                <input onChange={(e) => handleInputChange(e)} disabled={participantDetails.length != 0 || tournament.status === "Finished"} name='startTime' type="datetime-local" className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                            </div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 grid-cols-1 mt-5 gap-3">
                        <div className="flex flex-col gap-1">
                            <div>Matches</div>
                            <input onChange={(e) => handleInputChange(e)} disabled={participantDetails.length != 0 || tournament.status === "Finished"} name='matches' type="number" value={updatedTournament.matches} className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div>Map</div>
                            <input onChange={(e) => handleInputChange(e)} disabled={participantDetails.length != 0 || tournament.status === "Finished"} name='map' type="text" value={updatedTournament.map} className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div>Hosted By</div>
                            <div className='bg-secondaryLight py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none'>{updatedTournament.host} </div>
                        </div>
                    </div>

                    <div className='mt-5 flex flex-col gap-1'>
                        <div>Prizes</div>
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
                            {prizesData.map((prize, index) => (
                                <div key={index} className='flex gap-2 items-center'>
                                    <div className='text-inactive font-bold '>#{index + 1}</div>
                                    <input
                                        className='w-full bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none'
                                        type="number"
                                        placeholder={`Prize for place #${index + 1}`}
                                        value={prize}
                                        onChange={(e) => handlePrizeChange(index, e.target.value)}
                                        min={0}
                                        disabled={tournament.status === "Finished" || tournament.prizes[index] != null}
                                    />
                                    {index === prizesData.length - 1 && (
                                        <div onClick={addPrize} className='w-14 h-11 text-xl flex justify-center items-center bg-secondaryLight cursor-pointer rounded'>
                                            <IoIosAddCircleOutline />
                                        </div>
                                    )}
                                </div>

                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-12 mt-5 gap-3">
                        <div className="flex flex-col gap-3 md:col-span-6 col-span-12 bg-slate-500 bg-opacity-15 p-3 border-[1px] border-inactive border-opacity-30 rounded-[5px]">
                            <div className="flex flex-col gap-1">
                                <div>Tournament Title</div>
                                <input onChange={(e) => handleInputChange(e)} disabled={tournament.status === "Finished"} name='tournTitle' type="text" value={updatedTournament.tournTitle} className='bg-secondary py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                            </div>
                            <div className="flex flex-col gap-1">
                                <div>Thumbnail URL</div>
                                <input onChange={(e) => handleInputChange(e)} name='imgURL' type="url" value={updatedTournament.imgURL} className='bg-secondary py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                            </div>
                            <div className="flex flex-col gap-1">
                                <div>Max Participants</div>
                                <input onChange={(e) => handleInputChange(e)} disabled={tournament.status === "Finished"} name='max' type="number" value={updatedTournament.max} className='bg-secondary py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                            </div>
                            <div className="flex flex-col gap-1">
                                <div>Min Participants</div>
                                <input onChange={(e) => handleInputChange(e)} disabled={tournament.status === "Finished"} name='min' type="number" value={updatedTournament.min} className='bg-secondary py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                            </div>
                            <div className="flex flex-col gap-1">
                                <div>Room ID</div>
                                <input onChange={(e) => handleInputChange(e)} disabled={tournament.status === "Finished"} name='roomID' type="text" value={updatedTournament.roomID || ''} className='bg-secondary py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                            </div>
                            <div className="flex flex-col gap-1">
                                <div>Room Pass</div>
                                <input onChange={(e) => handleInputChange(e)} disabled={tournament.status === "Finished"} name='roomPass' type="text" value={updatedTournament.roomPass || ''} className='bg-secondary py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                            </div>
                            <div className="flex flex-col gap-1">
                                <div>YT Video URL</div>
                                <input onChange={(e) => handleInputChange(e)} name='ytLiveURL' type="url" value={updatedTournament.ytLiveURL || ''} className='bg-secondary py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                            </div>
                            <div className="flex flex-col gap-1">
                                <div>Is Featured?</div>
                                <select onChange={(e) => handleInputChange(e)} name="isFeatured" id="" value={updatedTournament.isFeatured} className='custom-dropdown border-2 border-inactive border-opacity-20 text-offBlue'>
                                    <option value="false">No</option>
                                    <option value="true">Yes</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div>Rules & Details</div>
                                <textarea onChange={(e) => handleInputChange(e)} disabled={tournament.status === "Finished"} value={updatedTournament.rulesDetails} name="rulesDetails" id="" cols="30" rows="12" placeholder='Rules, Details, and Guides' className='bg-secondary custom-scrollbar py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none'></textarea>
                            </div>

                        </div>

                        <div className="flex flex-col gap-3 md:col-span-6 col-span-12 bg-slate-500 bg-opacity-15 p-3 border-[1px] border-inactive border-opacity-30 rounded-[5px]">
                            <div className="flex flex-col gap-1">
                                <div>Participants</div>
                                {participantDetails && participantDetails.length >= 1 ?
                                    <>
                                        <div className="overflow-auto max-h-[80vh] custom-scrollbar bg-secondary rounded-[5px]">
                                            <table className="table-auto w-full ">
                                                <thead className='bg-secondaryLight text-offBlue text-left'>
                                                    <tr className="">
                                                        <th className="px-4 py-3">#</th>
                                                        <th className="px-4 py-3">Player/Team</th>
                                                        <th className="px-4 py-3">FF Name</th>
                                                        <th className="px-4 py-3">FF UID</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {participantDetails.map((participant, index) => (
                                                        <tr key={index} className="">
                                                            <td className='px-4 py-3'>{index + 1}</td>
                                                            <td onClick={() => handleUsernameCopyClick(participant.username)} title='Click to copy username' className="px-4 py-3 flex items-center gap-3 hover:cursor-pointer">
                                                                <img src={participant.prof_pic_url} alt="" className='h-8 w-8 object-cover rounded-[50%]' />
                                                                <div className="text-offBlue">{participant.username}</div>
                                                            </td>
                                                            <td className='px-4 py-3'>{participant.ff_name}</td>
                                                            <td className='px-4 py-3'>{participant.ff_uid}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                    :
                                    <><div className='w-full h-64 border-[0.8px] bg-secondary border-inactive border-opacity-20 rounded-[5px] flex justify-center items-center text-inactive'>
                                        <div className='flex flex-col gap-3 items-center'>
                                            <FaPeopleGroup className='text-4xl' />
                                            No one has joined!
                                        </div>
                                    </div></>
                                }
                            </div>
                            <div className="flex flex-col gap-1">
                                <div>Winners</div>
                                <div className="flex flex-col gap-2">
                                    {tournament.prizes.map((prize, index) => (
                                        <div key={index} className="flex gap-3 items-center bg-secondary rounded-[5px] border-2 border-inactive border-opacity-20">
                                            <div className='ml-3'>#{index + 1}</div>
                                            <input disabled={updatedTournament.status != "Finished" || tournament.status === "Finished"} value={winnerData[index] || ''} onChange={(e) => handleWinnerChange(index, e.target.value)} type="text" placeholder={`EG Username of #${index + 1}`} className='bg-transparent w-full py-2 px-3  placeholder:text-sm placeholder:text-inactive focus:outline-none' />
                                        </div>
                                    ))}


                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <div>Status</div>
                                <select disabled={tournament.status === "Finished"} onChange={handleInputChange} name="status" id="" value={updatedTournament.status} className='custom-dropdown border-2 border-inactive border-opacity-20 text-offBlue'>
                                    <option value="Open">Open</option>
                                    <option value="Ongoing">Ongoing</option>
                                    <option value="Finished">Finished</option>
                                    <option value="Aborted">Aborted</option>
                                </select>
                            </div>


                        </div>

                    </div>

                    {tournament.status !== "Aborted" && <button onClick={handleUpdate} className={`self-center mt-4 bg-primary transition-colors text-secondary duration-300  w-48 px-3 py-2 rounded-[5px] font-bold `}>Update</button>}
                </div>
            </div>

            <Modal isVisible={confirmationModal} onClose={() => setConfirmationModal(false)}>
                <div className='p-6 md:w-96 w-72'>
                    {(updatedTournament.status === 'Open' || updatedTournament.status === 'Ongoing') && <p className='mt-4 flex justify-center'>Are you sure? </p>}
                    {(updatedTournament.status === 'Finished' || updatedTournament.status === 'Aborted') && <p className='mt-4 flex justify-center text-center'>Are you sure? You can't update '{updatedTournament.status}' tournament later.</p>}
                    <div className="flex w-full justify-evenly mt-7">
                        <button onClick={() => setConfirmationModal(false)} className='bg-transparent rounded-[3px] text-inactive border-[1px] border-inactive px-8 py-2 font-medium'>Cancel</button>
                        <button onClick={handleFinalUpdate} className='bg-primary rounded-[3px] text-secondary border-[1px] border-primary px-8 py-2 font-bold'>Yes</button>
                    </div>
                </div>

            </Modal>
        </>

    )
}
