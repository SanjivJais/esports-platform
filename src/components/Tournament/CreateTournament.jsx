import React, { useEffect, useState } from 'react'
import { CiImageOff } from 'react-icons/ci';
import { useAuth } from '../../utils/AuthContext';
import { IoIosAddCircleOutline } from 'react-icons/io';

export const CreateTournament = ({ onClose, gameID }) => {
    const { user } = useAuth()

    const [entryFeeObj, setEntryFeeObj] = useState({
        currencyType: 'eg_token',
        fee: 0
    })
    const [gameDetailsObj, setGameDetailsObj] = useState(null)

    const [tournament, setTournament] = useState({
        gameID: gameID,
        tournTitle: null,
        description: null,
        imgURL: null,
        startDate: null,
        endDate: null,
        entryFee: JSON.stringify(entryFeeObj),
        host: JSON.stringify({ 'hostID': user.$id, 'hostName': user.name }),
        isFeatured: false,
        prizeType: 'eg_token',
        prizePool: [],
        participants: [],
        status: 'Draft',
        ytStreamURL: [],
        rules: null,
        winners: [],
        max: null,
        min: 1,
        gameDetails: JSON.stringify(gameDetailsObj),
        bracket: JSON.stringify({ 'bracketType': 'single_match', 'matchID': null }),
    })


    const tabs = document.getElementsByClassName("tournTab");
    let [activeTab, setActiveTab] = useState(0);
    const handleTabs = (event) => {
        const index = Array.from(tabs).indexOf(event.target);
        setActiveTab(index);
    }

    useEffect(() => (
        setActiveTab(activeTab)
    ), [activeTab])


    const handleInput = (e) => {
        e.preventDefault()
        const { name, value, type } = e.target;
        setTournament((prevData) => ({
            ...prevData,
            [name]: type === 'number' ? parseInt(value, 10) : value
        }))
    }

    const handleEntryFeeInput = (e) => {
        e.preventDefault()
        const { name, value, type } = e.target;
        setEntryFeeObj((prevData) => ({
            ...prevData,
            [name]: type === 'number' ? parseInt(value, 10) : value
        }))

    }

    useEffect(() => {
        setTournament((prevData) => ({
            ...prevData,
            entryFee: JSON.stringify(entryFeeObj)
        }))
    }, [entryFeeObj])


    // prize pool 
    const [prizesData, setPrizesData] = useState([0, 0, 0]); // Initial state with a number

    const addPrize = () => {
        setPrizesData([...prizesData, 0]); // Add a number (0 in this case) to the prizes array
    };

    useEffect(() => {
        setTournament((prevData) => ({
            ...prevData,
            prizePool: prizesData
        }))
    }, [prizesData])

    const handlePrizeChange = (index, value) => {
        const updatedPrizes = [...prizesData];
        updatedPrizes[index] = parseInt(value, 10);
        setPrizesData(updatedPrizes);
    };


    const handleGamedetailsInput = (e) => {
        e.preventDefault()
        const { name, value, type } = e.target;
        setGameDetailsObj((prevData) => ({
            ...prevData,
            [name]: type === 'number' ? parseInt(value, 10) : value
        }))
    }

    useEffect(() => {
        setTournament((prevData) => ({
            ...prevData,
            gameDetails: JSON.stringify(gameDetailsObj)
        }))
    }, [gameDetailsObj])



    const createTournament = async () => {
        console.log(tournament);
    }



    return (
        <>
            <div className='h-[92vh] lg:w-[70vw] md:w-[80vw] w-[94vw] overflow-x-hidden custom-scrollbar'>
                <div className='lg:h-[40%] md:h-[36%] h-[34%] flex flex-col justify-between' style={{
                    backgroundImage: `url(${tournament.imgURL}`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>

                    {!tournament.imgURL && gameID === "freefire" && <img src="/images/FF_Long_logo.png" alt="FF Logo" className='self-center top-[45%] relative translate-y-[-50%] opacity-45 object-cover h-4' />}

                    <div className='tournModalComponent-custom-gradient h-full flex flex-col justify-end items-start px-4'>
                        <div className="w-full">
                            <div className="flex md:justify-center md:gap-8 gap-4 md:text-base text-sm custom-scrollbar whitespace-nowrap overflow-x-auto">
                                <div onClick={(e) => handleTabs(e)} className={`tournTab ${activeTab === 0 ? 'md:border-b-2 md:border-primary md:text-offBlue text-primary' : 'text-inactive hover:text-offBlue'}  pb-2 font-semibold cursor-pointer`}>Step 1: Create Tournament</div>
                                <div onClick={(e) => handleTabs(e)} className={`tournTab ${activeTab === 1 ? 'md:border-b-2 md:border-primary md:text-offBlue text-primary' : 'text-inactive hover:text-offBlue'}  pb-2 font-semibold cursor-pointer`}>Step 2: Setup Bracket</div>
                                <div onClick={(e) => handleTabs(e)} className={`tournTab ${activeTab === 2 ? 'md:border-b-2 md:border-primary md:text-offBlue text-primary' : 'text-inactive hover:text-offBlue'}  pb-2 font-semibold cursor-pointer`}>Step 3: Schedule Matches</div>
                            </div>
                            <div className="h-[1px] bg-inactive bg-opacity-25 w-full"></div>
                        </div>
                    </div>
                </div>
                <div className='w-full p-4 flex-col gap-4'>
                    <div className="w-full flex flex-col">

                        {activeTab === 0 &&
                            <>
                                <h3 className='text-xl text-offBlue font-semibold mb-4'>Create Tournament</h3>
                                <fieldset className='border-2 border-inactive border-opacity-20 rounded-md bg-secondaryLight bg-opacity-30'>
                                    <legend className='px-3 bg-finishedStatus rounded-xl text-sm ml-2'>General Info</legend>
                                    <div className="grid md:grid-cols-2 grid-cols-1 gap-3 px-4 pt-2 pb-4">
                                        <div className="flex flex-col gap-1">
                                            <div>Tournament title <span className='text-red-600'>*</span></div>
                                            <input onChange={handleInput} name='tournTitle' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="text" placeholder='Title here (<150 characters)' />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div>Image URL <span className='text-red-600'>*</span></div>
                                            <input onChange={handleInput} name='imgURL' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="url" placeholder='Thumbnail image URL' />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <div>Description <span className='text-red-600'>*</span></div>
                                            <textarea onChange={handleInput} name="description" id="" cols="30" placeholder='Short tournament description (HTML)' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none'></textarea>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <div>Is Featured?</div>
                                            <select onChange={handleInput} defaultValue={false} name="isFeatured" id="" className='custom-dropdown border-2 border-inactive border-opacity-20 text-offBlue'>
                                                <option value="false">No</option>
                                                <option value="true">Yes</option>
                                            </select>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <div>Max Participants<span className='text-red-600'>*</span></div>
                                            <input onChange={handleInput} name='max' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="number" placeholder='Eg. 48' />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div>Min Participants</div>
                                            <input onChange={handleInput} name='min' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="number" placeholder='Eg. 20' />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div>Entry Fee<span className='text-red-600'>*</span></div>
                                            <div className="flex gap-2">
                                                <div className="flex items-center py-2 pl-3 rounded-[5px] w-full border-2 border-inactive border-opacity-20">
                                                    <input onChange={handleEntryFeeInput} value={entryFeeObj.fee} min={0} name='fee' className='bg-transparent w-full placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="number" placeholder='Eg. 0' />
                                                    <div className='mx-3'><img src={`${entryFeeObj.currencyType === "eg_token" ? '/icons/eg_token.svg' : '/icons/Coin.svg'}`} alt="EG Token" className='h-5 w-auto' /></div>
                                                </div>
                                                <select onChange={handleEntryFeeInput} value={entryFeeObj.currencyType} name="currencyType" id="" className='custom-dropdown'>
                                                    <option value="eg_token">EG Token</option>
                                                    <option value="eg_coin">EG Coin</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div>Prize Type<span className='text-red-600'>*</span></div>
                                            <div className="flex items-center">
                                                <select onChange={handleInput} value={tournament.prizeType || ''} name="prizeType" id="" className='custom-dropdown'>
                                                    <option value="eg_token">EG Token</option>
                                                    <option value="eg_coin">EG Coin</option>
                                                </select>
                                                <div className='ml-3'><img src={`${tournament.prizeType === "eg_token" ? '/icons/eg_token.svg' : '/icons/Coin.svg'}`} alt="EG Token" className='h-5 w-auto' /></div>
                                            </div>

                                        </div>

                                        <div className="flex flex-col gap-2 bg-frameBG bg-opacity-75 p-4 rounded-[5px]">
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

                                        <div className="flex flex-col gap-2 bg-frameBG bg-opacity-75 p-4 rounded-[5px]">
                                            <div className="flex flex-col gap-1">
                                                <div>Start Date/Time <span className='text-red-600'>*</span></div>
                                                <input onChange={handleInput} name='startDate' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="datetime-local" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div>End Date <span className='text-red-600'>*</span></div>
                                                <input onChange={handleInput} name='endDate' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="datetime-local" />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <div>Rules <span className='text-red-600'>*</span></div>
                                            <textarea onChange={handleInput} name="rules" id="" cols="30" placeholder='Rules, Details, and Guides (HTML)' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none'></textarea>
                                        </div>


                                    </div>
                                </fieldset>

                                <fieldset className='border-2 border-inactive border-opacity-20 rounded-md mt-4 bg-secondaryLight bg-opacity-30'>
                                    <legend className='px-3 bg-openStatus text-secondary font-semibold rounded-xl text-sm ml-2'>Game Info</legend>
                                    <div className="grid md:grid-cols-2 grid-cols-1 gap-3 px-4 pt-2 pb-4">
                                        {gameID === "freefire" && <>
                                            <div className="flex flex-col gap-1">
                                                <div>Game Mode <span className='text-red-600'>*</span></div>
                                                <input onChange={handleGamedetailsInput} name='gameMode' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="text" placeholder='Eg. Battle Royale' />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div>Team Size <span className='text-red-600'>*</span></div>
                                                <select onChange={handleGamedetailsInput} name="teamSize" id="" className='custom-dropdown border-2 border-inactive border-opacity-20 text-offBlue'>
                                                    <option value="-1">Choose size</option>
                                                    <option value="Solo">Solo (1)</option>
                                                    <option value="Duo">Duo (2)</option>
                                                    <option value="Squad">Squad (4)</option>
                                                </select>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div>Map <span className='text-red-600'>*</span></div>
                                                <input onChange={handleGamedetailsInput} name='map' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="text" placeholder='Eg. Random' />
                                            </div>
                                        </>}
                                    </div>
                                </fieldset>


                            </>
                        }

                        {activeTab === 1 &&
                            <></>
                        }
                        {activeTab === 2 &&
                            <>

                            </>
                        }

                    </div>

                    <div className="flex justify-between w-full gap-4 items-center mt-4">
                        <button onClick={onClose} className='bg-slate-800 rounded-[5px] px-3 py-1'>Cancel</button>
                        <div className="flex gap-4 items-center">
                            <button onClick={createTournament} className='bg-primary text-secondary font-semibold rounded-[5px] px-3 py-1'>Create Tournament</button>
                            <button className='bg-openStatus text-secondary font-semibold rounded-[5px] px-3 py-1'>Step 2 ⨠</button>

                        </div>
                    </div>
                </div>

            </div>



        </>
    )
}
