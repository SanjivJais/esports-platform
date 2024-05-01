import React, { useEffect, useState } from 'react'
import { FaPeopleGroup } from 'react-icons/fa6';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { database, db_id } from '../../../config/Appwrite';
import { toast } from 'react-toastify';
import { Query } from 'appwrite';

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

    const [updatedTournament, setUpdatedTournament] = useState(tournament)
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
    const [participantDetails, setParticipantDetails] = useState([])
    useEffect(() => {
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
                toast.error(`Error fetching participant details: ${error}`);
            }

        };
        fetchUserDetails();
    }, []);

    const handleUpdate = async () => {
        console.log(updatedTournament);
        console.log(participantDetails);
    }

    return (
        <div className='md:w-[76vw] w-[95vw] h-[92vh] '>
            <div className='md:m-6 m-4 flex flex-col pb-4'>
                <div className="grid grid-cols-12 gap-4">
                    <img src={tournament.imgURL} alt="" className='md:col-span-5 col-span-12 rounded-[5px]' />
                    <div className='grid md:grid-cols-2 grid-cols-1 md:col-span-7 col-span-12 gap-x-3 gap-y-2'>
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
                            <select disabled name="teamType" id="" value={tournament.teamType} className='custom-dropdown border-2 border-inactive border-opacity-20 text-offBlue'>
                                <option value="Solo">Solo</option>
                                <option value="Duo">Duo</option>
                                <option value="Squad">Squad</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div>Reward Type</div>
                            <select disabled name="rewardType" id="" value={tournament.rewardType} className='custom-dropdown border-2 border-inactive border-opacity-20 text-offBlue'>
                                <option value="eg_coin">EG Coin</option>
                            </select>
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
                <div className="grid md:grid-cols-3 grid-cols-1 mt-5 gap-3">
                    <div className="flex flex-col gap-1">
                        <div>Matches</div>
                        <input disabled name='matches' type="number" value={tournament.matches} className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div>Map</div>
                        <input disabled name='map' type="text" value={tournament.map} className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div>Hosted By</div>
                        <div className='bg-secondaryLight py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none'>{tournament.host} </div>
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
                    <div className="flex flex-col gap-3 md:col-span-6 col-span-12 bg-openStatus bg-opacity-10 p-3 border-[1px] border-inactive border-opacity-30 rounded-[5px]">
                        <div className="flex flex-col gap-1">
                            <div>Tournament Title</div>
                            <input name='tournTitle' type="text" value={tournament.tournTitle} className='bg-secondary py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div>Thumbnail URL</div>
                            <input name='imgURL' type="text" value={tournament.imgURL} className='bg-secondary py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div>Max Participants</div>
                            <input name='max' type="number" value={tournament.max} className='bg-secondary py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div>Min Participants</div>
                            <input name='min' type="number" value={tournament.min} className='bg-secondary py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div>Room ID</div>
                            <input name='roomID' type="text" value={tournament.roomID || ''} className='bg-secondary py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div>Room Pass</div>
                            <input name='roomPass' type="text" value={tournament.roomPass || ''} className='bg-secondary py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div>YT Video URL</div>
                            <input name='ytLiveURL' type="text" value={tournament.ytLiveURL || ''} className='bg-secondary py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div>Is Featured?</div>
                            <select name="isFeatured" id="" value={tournament.isFeatured} className='custom-dropdown border-2 border-inactive border-opacity-20 text-offBlue'>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div>Rules & Details</div>
                            <textarea value={tournament.rulesDetails} name="rulesDetails" id="" cols="30" rows="12" placeholder='Rules, Details, and Guides' className='bg-secondary custom-scrollbar py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none'></textarea>
                        </div>

                    </div>

                    <div className="flex flex-col gap-3 md:col-span-6 col-span-12 bg-openStatus bg-opacity-10 p-3 border-[1px] border-inactive border-opacity-30 rounded-[5px]">

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
                                                        <td className="px-4 py-3 flex items-center gap-3">
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
                    </div>

                </div>

                <button onClick={handleUpdate} className='self-end mt-4 bg-primary w-48 px-3 py-2 rounded-[5px] font-semibold text-secondary'>Update</button>
            </div>
        </div>
    )
}
