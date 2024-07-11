import React, { useEffect, useState } from 'react'
import { useAuth } from '../../utils/AuthContext';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { toast } from 'react-toastify';
import { TbTournament } from 'react-icons/tb';
import { database, ID, db_id } from '../../../config/Appwrite';
import LoadingBar from 'react-top-loading-bar';
import { formatDateTime } from '../../utils/DateUtils';


export const CreateTourn = ({ onClose, tournamentDraft }) => {
    const { user } = useAuth()

    const tabs = document.getElementsByClassName("tournTab");
    let [activeTab, setActiveTab] = useState(0);
    // const handleTabs = (event) => {
    //     const index = Array.from(tabs).indexOf(event.target);
    //     setActiveTab(index);
    // }

    useEffect(() => (
        setActiveTab(activeTab)
    ), [activeTab])



    const [gameID, setGameID] = useState(null)

    const [entryFeeObj, setEntryFeeObj] = useState(null)

    const [gameDetailsObj, setGameDetailsObj] = useState(null)

    const [tournament, setTournament] = useState(null)
    // prize pool 
    const [prizesData, setPrizesData] = useState([0, 0, 0]); // Initiate state with three default prizes
    const [pubStatus, setPubStatus] = useState("Open")



    useEffect(() => {
        setEntryFeeObj({
            currencyType: 'eg_token',
            fee: 0
        })

        setGameDetailsObj(null)

        setTournament({
            gameID: gameID,
            tournTitle: null,
            description: null,
            imgURL: null,
            regStart: null,
            regEnd: null,
            entryFee: JSON.stringify(entryFeeObj),
            host: user.$id,
            isFeatured: false,
            prizeType: 'eg_token',
            prizePool: [],
            participants: [],
            status: 'Draft',
            ytStreamURL: [],
            rules: null,
            winners: [],
            max: null,
            min: null,
            gameDetails: JSON.stringify(gameDetailsObj),
            bracket: null,
        })

        setPrizesData([0, 0, 0])
        setPubStatus("Open")

    }, [gameID])









    const handleStatusChange = (e) => {
        setPubStatus(e.target.value)
    }







    const handleInput = (e) => {
        e.preventDefault()
        const { name, value, type } = e.target;
        setTournament((prevData) => ({
            ...prevData,
            [name]: type === 'number' ? parseInt(value, 10) : (name === 'isFeatured' ? value === 'true' : value)
        }))
    }

    const handleEntryFeeInput = (e) => {
        e.preventDefault();
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




    const addPrize = () => {
        setPrizesData([...prizesData, 0]); // Add a number (0 in this case) to the prizes array
    };

    useEffect(() => {
        setTournament((prevData) => ({
            ...prevData,
            prizePool: prizesData.filter(prize => prize > 0)
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




    const validateFields = () => {
        if (tournament.tournTitle && tournament.tournTitle.length > 3) {
            if (tournament.imgURL) {
                if (tournament.max && tournament.max >= 2) {
                    if (tournament.min >= 2) {
                        if (JSON.parse(tournament.entryFee).fee >= 0) {
                            if (tournament.prizePool.length > 0) {
                                if (tournament.prizePool.every(prize => prize >= 0)) {
                                    if (tournament.startDate && tournament.endDate) {
                                        if (tournament.rules) {
                                            // validating game info
                                            if (gameID === 'freefire') {
                                                let ffGameDetails = document.getElementsByClassName('ffGameDetails');
                                                if (ffGameDetails[0].value) {
                                                    if (ffGameDetails[1].value !== "-1") {
                                                        if (ffGameDetails[2].value) {
                                                            return true;
                                                        } else {
                                                            toast.info("Invalid map!")
                                                        }
                                                    } else {
                                                        toast.info("Invalid team size!")
                                                    }
                                                } else {
                                                    toast.info("Invalid game mode!")
                                                }
                                            }
                                        } else {
                                            toast.info("Enter tournament rules!")
                                        }
                                    } else {
                                        toast.info("Missing start and/or end dates!")
                                    }
                                } else {
                                    toast.info("Invalid prize pool!")
                                }
                            } else {
                                toast.info("Enter at least one prize!")

                            }
                        } else {
                            toast.info("Invalid entry fee!")
                        }
                    } else {
                        toast.info("Invalid min participants!")
                    }
                } else {
                    toast.info("Invalid max participants!")
                }
            } else {
                toast.info("Enter a valid Image URL!")
            }
        } else {
            toast.info("Title cannot be less than 3 characters!")
        }
        return false
    }

    const [progress, setProgress] = useState(0)


    const [newlyCreatedTournament, setNewlyCreatedTournament] = useState(null)


    useState(() => {
        if (tournamentDraft) {
            setNewlyCreatedTournament(tournamentDraft)
            setActiveTab(1)
        }
    }, [])



    const createTournament = async () => {
        if (validateFields()) {

            console.log(tournament);

            // setProgress(60)
            // try {
            //     const res = await database.createDocument(db_id, 'tournaments', ID.unique(), tournament)
            //     toast.success("Tournament created successfully!")
            //     setNewlyCreatedTournament(res)
            // } catch (error) {
            //     toast.error(error.message)
            // }
            // setProgress(100)
        }
    }

    useEffect(() => {
        if (newlyCreatedTournament) {

            setMatchDetails((prevData) => ({
                ...prevData,
                tournamentID: newlyCreatedTournament.$id
            }))
        }
    }, [newlyCreatedTournament])


    // applicable to single_match tourns only
    const [matchDetails, setMatchDetails] = useState({
        tournamentID: '',
        matchParticipants: [],
        matchName: 'Match 1',
        scheduledTime: null,
        matchResults: [],
        entryDetails: gameID === "freefire" ? JSON.stringify({
            roomID: null,
            roomPass: null
        }) : null,
        matchStatus: 'Scheduled'
    })

    const handleMatchInput = (e) => {
        e.preventDefault()
        const { name, value, type } = e.target;
        setMatchDetails((prevData) => ({
            ...prevData,
            [name]: type === 'number' ? parseInt(value, 10) : value
        }))
    }

    const setScheduledTime = (e) => {
        if (newlyCreatedTournament) {

            if (e.target.checked) {
                setMatchDetails((prevData) => ({
                    ...prevData,
                    scheduledTime: newlyCreatedTournament.startDate
                }))
            } else {
                setMatchDetails((prevData) => ({
                    ...prevData,
                    scheduledTime: null
                }))
            }
        } else {
            toast.error("Something went wrong!")
        }
    }

    const [scheduledMatch, setScheduledMatch] = useState(null)
    useState(() => {
        if (tournamentDraft) {

            if (JSON.parse(tournamentDraft.bracket).matchID) {
                setScheduledMatch(true)
            }
        }
    }, [])
    const scheduleMatch = async () => {
        if (matchDetails.matchName.length >= 3) {
            if (matchDetails.scheduledTime) {
                setProgress(60)
                try {
                    const res = await database.createDocument(db_id, 'matches', ID.unique(), matchDetails)
                    setScheduledMatch(res)
                    let updatedBracket = { ...JSON.parse(newlyCreatedTournament.bracket), matchID: res.$id }
                    await database.updateDocument(db_id, 'tournaments', newlyCreatedTournament.$id, { 'bracket': JSON.stringify(updatedBracket) })
                    toast.success("Match scheduled!")

                } catch (error) {
                    toast.error(error.message)
                }
                setProgress(100)
            } else {
                toast.info("Invalid schedule time!")
            }
        } else {
            toast.info("Match name must be at least 3 characters!")
        }
    }

    const publishTournament = async () => {
        if (newlyCreatedTournament && scheduledMatch) {
            setProgress(70)
            try {
                await database.updateDocument(db_id, 'tournaments', newlyCreatedTournament.$id, { 'status': pubStatus })
                toast.success("Tournament published!")
                onClose()
            } catch (error) {
                toast.error(error.message)
            }
            setProgress(100)

        }
    }




    return (
        <>
            <LoadingBar
                color='#F88B26'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />


            <div className="flex flex-col gap-4 mx-3 mt-6 mb-12 w-full">
                <h3 className='text-xl font-bold text-offBlue'>Select game</h3>
                <div className="flex gap-4 w-full">
                    <div className="flex gap-8 w-full">
                        {/* pass gameID in setGameID */}
                        <div onClick={() => setGameID('freefire')} className="flex flex-col gap-2 items-center group hover:cursor-pointer">
                            <div className={`${gameID === 'freefire' ? '' : 'bg-secondary bg-opacity-60'} h-40 w-32 tournModalComponent-custom-gradient absolute flex flex-col justify-end items-center pb-2 text-offBlue font-semibold`}>Free Fire</div>
                            <img src="/images/FF_DP.jpg" alt="" className={`h-40 w-32 rounded-lg border-2 group-hover:border-primary ${gameID === 'freefire' ? 'border-primary ' : 'border-inactive border-opacity-40'} object-cover`} />
                        </div>
                        <div onClick={() => setGameID('pubgmobile')} className="flex flex-col gap-2 items-center group hover:cursor-pointer">
                            <div className={`${gameID === 'pubgmobile' ? '' : 'bg-secondary bg-opacity-60'} h-40 w-32 tournModalComponent-custom-gradient absolute flex flex-col justify-end items-center pb-2 text-offBlue font-semibold`}>PUBG Mobile</div>
                            <img src="/images/PUBG_DP.jpg" alt="" className={`h-40 w-32 rounded-lg border-2 group-hover:border-primary ${gameID === 'pubgmobile' ? 'border-primary ' : 'border-inactive border-opacity-40'} object-cover`} />
                        </div>
                    </div>

                </div>
            </div>



            {gameID && <div className=''>
                <div className='lg:h-56 md:h-48 h-40 flex flex-col justify-between rounded-lg'
                    style={{
                        backgroundImage: `url(${tournament.imgURL}`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >

                    {!tournament.imgURL && gameID === "freefire" && <img src="/images/FF_Long_logo.png" alt="FF Logo" className='self-center top-[40%] relative translate-y-[-50%] opacity-45 object-cover h-4' />}
                    {!tournament.imgURL && gameID === "pubgmobile" && <div className='self-center top-[40%] relative translate-y-[-50%] text-inactive font-bold text-lg'>Coming Soon!</div>}

                    <div className='tournModalComponent-custom-gradient h-full flex flex-col justify-end items-start px-4'>
                        <div className="w-full">
                            <div className="flex md:gap-8 gap-4 md:text-base text-sm custom-scrollbar whitespace-nowrap overflow-x-auto">
                                <div className={`tournTab ${activeTab === 0 ? 'md:border-b-2 md:border-primary md:text-offBlue text-primary' : 'text-inactive'}  pb-2 font-semibold`}>Step 1: Create Tournament</div>
                                <div className={`tournTab ${activeTab === 1 ? 'md:border-b-2 md:border-primary md:text-offBlue text-primary' : 'text-inactive'}  pb-2 font-semibold`}>Step 2: Setup Bracket</div>
                                <div className={`tournTab ${activeTab === 2 ? 'md:border-b-2 md:border-primary md:text-offBlue text-primary' : 'text-inactive'}  pb-2 font-semibold`}>Step 3: Schedule Matches</div>
                            </div>
                            <div className="h-[1px] bg-inactive bg-opacity-25 w-full"></div>
                        </div>
                    </div>
                </div>

                <div className='w-full p-4 flex-col gap-4'>
                    <div className="w-full flex flex-col">

                        {activeTab === 0 &&
                            <>
                                <h3 className='text-xl text-offBlue font-semibold '>Create Tournament</h3>
                                <div className='text-sm text-offBlue my-4 border-2 border-finishedStatus border-opacity-35 bg-inactive bg-opacity-10 px-3 py-2 rounded-[5px]'>
                                    <p>Please double-check entered details.</p>
                                </div>

                                <fieldset className='border-2 border-inactive border-opacity-20 rounded-md bg-secondaryLight bg-opacity-30'>
                                    <legend className='px-3 bg-primary text-secondary font-semibold py-1 rounded-2xl text-sm ml-2'>General</legend>
                                    <div className="grid md:grid-cols-2 grid-cols-1 gap-3 px-4 pt-2 pb-4">
                                        <div className="flex flex-col gap-1">
                                            <div>Tournament title <span className='text-red-500 font-semibold text-lg'>*</span></div>
                                            <input onChange={handleInput} value={tournament.tournTitle || ""} name='tournTitle' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="text" placeholder='Title here (<150 characters)' />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div>Image URL <span className='text-red-500 font-semibold text-lg'>*</span></div>
                                            <input onChange={handleInput} value={tournament.imgURL || ""} name='imgURL' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="url" placeholder='Thumbnail image URL' />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <div>Description</div>
                                            <textarea onChange={handleInput} value={tournament.description || ""} name="description" id="" cols="30" placeholder='Short tournament description (HTML)' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none'></textarea>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <div>Is Featured?</div>
                                            <select onChange={handleInput} value={tournament.isFeatured} name="isFeatured" id="" className='custom-dropdown border-2 border-inactive border-opacity-20 text-offBlue'>
                                                <option value="false">No</option>
                                                <option value="true">Yes</option>
                                            </select>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <div>Max Participants<span className='text-red-500 font-semibold text-lg'>*</span></div>
                                            <input onChange={handleInput} value={tournament.max || ""} name='max' min={2} className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="number" placeholder='Min. 2' />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div>Min Participants<span className='text-red-500 font-semibold text-lg'>*</span></div>
                                            <input onChange={handleInput} value={tournament.min || ""} name='min' min={2} className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="number" placeholder='Min. 2' />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div>Entry Fee<span className='text-red-500 font-semibold text-lg'>*</span></div>
                                            <div className="flex gap-2">
                                                <div className="flex items-center py-2 pl-3 rounded-[5px] w-full border-2 border-inactive border-opacity-20">
                                                    <input onChange={handleEntryFeeInput} value={entryFeeObj.fee} step={1} min={0} name='fee' className='bg-transparent w-full placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="number" placeholder='Eg. 0' />
                                                    <div className='mx-3'><img src={`${entryFeeObj.currencyType === "eg_token" ? '/icons/eg_token.svg' : '/icons/Coin.svg'}`} alt="EG Token" className='h-5 w-auto' /></div>
                                                </div>
                                                <select onChange={handleEntryFeeInput} value={entryFeeObj.currencyType} name="currencyType" id="" className='custom-dropdown'>
                                                    <option value="eg_token">EG Token</option>
                                                    <option value="eg_coin">EG Coin (premium)</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div>Prize Type<span className='text-red-500 font-semibold text-lg'>*</span></div>
                                            <div className="flex items-center">
                                                <select onChange={handleInput} value={tournament.prizeType} name="prizeType" id="" className='custom-dropdown'>
                                                    <option value="eg_token">EG Token</option>
                                                    <option value="eg_coin">EG Coin (premium)</option>
                                                </select>
                                                <div className='ml-3'><img src={`${tournament.prizeType === "eg_token" ? '/icons/eg_token.svg' : '/icons/Coin.svg'}`} alt="EG Token" className='h-5 w-auto' /></div>
                                            </div>

                                        </div>

                                        <div className="flex flex-col gap-2 bg-frameBG bg-opacity-75 p-4 rounded-[5px]">
                                            <div>Prizes <span className='text-red-500 font-semibold text-lg'>*</span></div>

                                            {prizesData.map((prize, index) => (
                                                <div key={index} className="flex gap-2 items-center">
                                                    <div className='text-inactive font-bold '>#{index + 1}</div>
                                                    <input
                                                        className='w-full bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none'
                                                        type="number"
                                                        step={1}
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
                                                <div>Registration Start<span className='text-red-500 font-semibold text-lg'>*</span></div>
                                                <input onChange={handleInput} value={tournament.regStart || ""} name='regStart' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="datetime-local" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div>Registration End <span className='text-red-500 font-semibold text-lg'>*</span></div>
                                                <input onChange={handleInput} value={tournament.regEnd || ""} name='regEnd' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="datetime-local" />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <div>Rules <span className='text-red-500 font-semibold text-lg'>*</span></div>
                                            <textarea onChange={handleInput} value={tournament.rules || ""} name="rules" id="" cols="30" placeholder='Rules, Details, and Guides (HTML)' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none'></textarea>
                                        </div>

                                        {/* <div className="flex flex-col gap-1">
                                            <div>Bracket</div>
                                            <select disabled name="bracket" id="" className='custom-dropdown border-2 border-inactive border-opacity-20 text-offBlue'>
                                                <option value="single_match">Single Match</option>
                                            </select>
                                        </div> */}

                                        <div className="flex flex-col gap-1">
                                            <div>Status</div>
                                            <select onChange={handleStatusChange} value={pubStatus} id="" className='custom-dropdown border-2 border-inactive border-opacity-20 text-offBlue'>
                                                <option value="Open">Open</option>
                                                <option value="Upcoming">Upcoming</option>
                                            </select>
                                        </div>


                                    </div>
                                </fieldset>

                                <fieldset className='border-2 border-inactive border-opacity-20 rounded-md mt-4 bg-secondaryLight bg-opacity-30'>
                                    <legend className='px-3 py-1 bg-adminColor text-secondary font-semibold rounded-2xl text-sm ml-2'>Game details</legend>
                                    <div className="grid md:grid-cols-2 grid-cols-1 gap-3 px-4 pt-2 pb-4">
                                        {gameID === "freefire" && <>
                                            <div className="flex flex-col gap-1">
                                                <div>Game Mode <span className='text-red-500 font-semibold text-lg'>*</span></div>
                                                <select onChange={handleGamedetailsInput} defaultValue={"battle_royale"} name="gameMode" className='ffGameDetails custom-dropdown border-2 border-inactive border-opacity-20 text-offBlue'>
                                                    <option value="battle_royale">Battle Royale</option>
                                                    <option value="clash_squad">Clash Squad</option>
                                                </select>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div>Team Size <span className='text-red-600'>*</span></div>
                                                <select onChange={handleGamedetailsInput} defaultValue={"-1"} name="teamSize" className='ffGameDetails custom-dropdown border-2 border-inactive border-opacity-20 text-offBlue'>
                                                    <option value="-1">Choose size</option>
                                                    <option value="1">1 (Solo)</option>
                                                    <option value="4">4 (Squad)</option>
                                                </select>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div>Map <span className='text-red-600'>*</span></div>
                                                <input onChange={handleGamedetailsInput} name='map' className='ffGameDetails bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="text" placeholder='Eg. Random' />
                                            </div>
                                        </>}
                                    </div>
                                </fieldset>


                            </>
                        }

                        {activeTab === 1 &&
                            <>
                                {JSON.parse(newlyCreatedTournament.bracket).bracketType === "single_match" &&
                                    <>
                                        <h5 className='flex gap-2 items-center'><TbTournament className='text-primary' /> Single Match</h5>
                                        <p className='text-offBlue my-2'><span className='text-ongoingStatus font-bold'>Top {newlyCreatedTournament.prizePool.length} </span>participants based on a single match competition will share the Prize Pool as specified! </p>
                                    </>
                                }
                            </>
                        }
                        {activeTab === 2 &&
                            <>
                                {!scheduledMatch && <div className="flex flex-col">
                                    <div className="grid md:grid-cols-2 grid-cols-1 mb-3 gap-4">
                                        <div className="flex flex-col gap-1">
                                            <div>Match1 name <span className='text-red-500 font-semibold text-lg'>*</span></div>
                                            <input onChange={handleMatchInput} value={matchDetails.matchName} name='matchName' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="text" placeholder='Eg. Match 1 (<50 chars)' />
                                        </div>
                                        <div className="flex flex-col gap-1 justify-end">
                                            <div>Match1 time: {matchDetails.scheduledTime && <span className='text-inactive'>{formatDateTime(matchDetails.scheduledTime).time} - {formatDateTime(matchDetails.scheduledTime).date}</span>}</div>
                                            <div className='flex items-center gap-2'><input onChange={setScheduledTime} type="checkbox" id='matchTimeSameAsTourn' /><label htmlFor="matchTimeSameAsTourn">Same as tournament start time</label></div>
                                        </div>

                                    </div>
                                    {!scheduledMatch && <button onClick={scheduleMatch} className='bg-secondaryLight px-3 py-2 rounded hover:bg-slate-800 transition-colors duration-200'>Schedule Match</button>}
                                    {/* {JSON.parse(newlyCreatedTournament.bracket).bracketType !== "single_match" && <div className="flex justify-end"><button className='bg-secondaryLight px-3 py-2 rounded hover:bg-slate-800 transition-colors duration-200 flex items-center gap-2'><MdAddBox /><span>Create Match</span> </button></div>} */}


                                </div>}
                            </>
                        }

                    </div>



                    <div className="flex justify-between w-full gap-4 items-center mt-4">
                        <button onClick={onClose} className='bg-slate-800 rounded-[5px] px-3 py-1'>{newlyCreatedTournament ? 'Close' : 'Cancel'}</button>
                        <div className="flex gap-4 items-center">
                            {activeTab > 0 && activeTab !== 1 && !tournamentDraft && <button onClick={() => setActiveTab(activeTab - 1)} disabled={!newlyCreatedTournament} className={`${newlyCreatedTournament ? 'bg-slate-800 text-offBlue block' : 'hidden text-secondary'}  font-semibold rounded-[5px] px-3 py-1`}>‹ Back</button>}
                            {activeTab === 0 && !newlyCreatedTournament && <button onClick={createTournament} disabled={newlyCreatedTournament} className={`${newlyCreatedTournament ? 'bg-inactive' : ' bg-primary'} text-secondary font-semibold rounded-[5px] px-3 py-1`}>Create Tournament</button>}
                            {activeTab === 2 && newlyCreatedTournament && <button onClick={publishTournament} disabled={!scheduledMatch} className={`${scheduledMatch ? 'bg-openStatus' : 'bg-slate-800'}  text-secondary font-semibold rounded-[5px] px-3 py-1`}>Publish Tournament</button>}
                            {activeTab < 2 && <button onClick={() => setActiveTab(activeTab + 1)} disabled={!newlyCreatedTournament} className={`${newlyCreatedTournament ? 'bg-openStatus' : 'bg-inactive'}  text-secondary font-semibold rounded-[5px] px-3 py-1`}>Step {activeTab + 2} ›</button>}

                        </div>
                    </div>
                    {newlyCreatedTournament && <div className='text-sm text-offBlue mt-4 border-2 border-inactive border-opacity-65 bg-inactive bg-opacity-10 px-3 py-2 rounded-[5px]'>
                        <p>Tournament drafted. It will be 'Open' after setting up bracket (step 2) and matches (step 3).</p>
                    </div>}
                </div>

            </div>}



        </>
    )
}
