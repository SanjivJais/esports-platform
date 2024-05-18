import React, { useEffect, useState } from 'react'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { database, ID, db_id } from '../../../config/Appwrite'
import { useAuth } from '../../utils/AuthContext'
import { toast } from 'react-toastify'


export const CreateFFTourn = ({ onClose }) => {
    const { user } = useAuth()
    // initialization
    const [tournament, setTournament] = useState({
        entryFee: 0,
        gameMode: null,
        host: "EsportsGravity",
        imgURL: null,
        isFeatured: false,
        map: "Random",
        matches: 1,
        max: null,
        min: 1,
        participants: [],
        prizes: [],
        rewardType: "eg_coin",
        roomID: null,
        roomPass: null,
        rulesDetails: null,
        startTime: null,
        status: "Open",
        teamType: "Solo",
        tournTitle: null,
        winners: [],
        ytLiveURL: null
    })

    const handleInput = (e) => {
        e.preventDefault()
        const { name, value, type } = e.target;
        setTournament((prevData) => ({
            ...prevData,
            [name]: type === 'number' ? parseInt(value, 10) : value
        }))
    }

    const [prizesData, setPrizesData] = useState([0]); // Initial state with a number

    const addPrize = () => {
        setPrizesData([...prizesData, 0]); // Add a number (0 in this case) to the prizes array
    };

    useEffect(() => {
        setTournament((prevData) => ({
            ...prevData,
            prizes: prizesData
        }))
    }, [prizesData])

    const handlePrizeChange = (index, value) => {
        const updatedPrizes = [...prizesData];
        updatedPrizes[index] = parseInt(value, 10);
        setPrizesData(updatedPrizes);
    };


    // creating tournament 
    const createTournament = async () => {
        try {
            const response = await database.createDocument(db_id, 'ff_tournaments', ID.unique(), tournament)
            toast.success("Tournament created")

            await database.createDocument(db_id, 'notifications', ID.unique(),
                {
                    recipentType: "all",
                    message: `<p>New Free Fire tournament is here! Check it out with tournament ID &nbsp;<span class='bg-highlighted-text'>${response.$id}</span>.</p>`,
                    recipents: [],
                    targetLink: `${import.meta.env.VITE_ROOT_PATH}/tournaments/freefire`
                }
            )
            onClose()
        } catch (error) {
            toast.error(error.message)
        }

    }




    return (
        <div className='p-4 lg:w-[50vw] md:w-[60vw] w-[90vw] h-[90vh] overflow-x-hidden custom-scrollbar'>
            <div className="flex flex-col gap-4 mt-8 mx-4 pb-8">
                <img src="/images/FF_Long_logo.png" alt="" className='w-36 h-auto self-center' />



                <div className="flex flex-col gap-1">
                    <div>Tournament title <span className='text-red-600'>*</span></div>
                    <input onChange={handleInput} name='tournTitle' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="text" placeholder='Title here (<150 characters)' />
                </div>
                <div className="flex flex-col gap-1">
                    <div>Image URL <span className='text-red-600'>*</span></div>
                    <input onChange={handleInput} name='imgURL' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="url" placeholder='Thumbnail image URL' />
                </div>
                <div className="flex flex-col gap-1">
                    <div>Game Mode <span className='text-red-600'>*</span></div>
                    <input onChange={handleInput} name='gameMode' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="text" placeholder='Eg. Battle Royale' />
                </div>
                <div className="flex flex-col gap-1">
                    <div>Team Type <span className='text-red-600'>*</span></div>
                    <select onChange={handleInput} name="teamType" id="" className='custom-dropdown border-2 border-inactive border-opacity-20 text-offBlue'>
                        <option value="Solo">Solo</option>
                        <option value="Duo">Duo</option>
                        <option value="Squad">Squad</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <div>Map <span className='text-red-600'>*</span></div>
                    <input onChange={handleInput} name='map' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="text" placeholder='Eg. Random' />
                </div>
                <div className="flex flex-col gap-1">
                    <div>Matches <span className='text-red-600'>*</span></div>
                    <input onChange={handleInput} name='matches' min={1} className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="number" placeholder='Eg. 1' />
                </div>
                <div className="flex flex-col gap-1">
                    <div>Max Participants<span className='text-red-600'>*</span></div>
                    <input onChange={handleInput} name='max' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="number" placeholder='Eg. 48' />
                </div>
                <div className="flex flex-col gap-1">
                    <div>Min Participants<span className='text-red-600'>*</span></div>
                    <input onChange={handleInput} name='min' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="number" placeholder='Eg. 20' />
                </div>
                <div className="flex flex-col gap-1">
                    <div>Entry Fee</div>
                    <input onChange={handleInput} name='entryFee' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="number" placeholder='Eg. 0' />
                </div>
                <div className="flex flex-col gap-1">
                    <div>Reward Type <span className='text-red-600'>*</span></div>
                    <select onChange={handleInput} name="rewardType" id="" className='custom-dropdown border-2 border-inactive border-opacity-20 text-offBlue'>
                        <option value="eg_coin">EG Coin</option>
                        {/* <option value="token">Token</option> */}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <div>Prizes <span className='text-red-600'>*</span></div>

                    {prizesData.map((prize, index) => (
                        <div key={index} className="flex gap-2 items-center">
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
                <div className="flex flex-col gap-1">
                    <div>Start Time <span className='text-red-600'>*</span></div>
                    <input onChange={handleInput} name='startTime' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="datetime-local" />
                </div>
                <div className="flex flex-col gap-1">
                    <div>YT Live URL</div>
                    <input onChange={handleInput} name='ytLiveURL' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="url" placeholder='YT Video Link' />
                </div>
                <div className="flex flex-col gap-1">
                    <div>Rules & Details <span className='text-red-600'>*</span></div>
                    <textarea onChange={handleInput} name="rulesDetails" id="" cols="30" placeholder='Rules, Details, and Guides' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none'></textarea>
                </div>
                <div className="flex flex-col gap-1">
                    <div>Is Featured?</div>
                    <select onChange={handleInput} defaultValue={false} name="isFeatured" id="" className='custom-dropdown border-2 border-inactive border-opacity-20 text-offBlue'>
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                </div>

                <button onClick={createTournament} className='bg-primary text-secondary px-3 py-2 rounded font-bold '>Create Tournament</button>
            </div>
        </div>
    )
}
