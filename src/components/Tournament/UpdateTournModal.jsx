import React, { useEffect, useState } from 'react'
import { useAuth } from '../../utils/AuthContext';
import { toast } from 'react-toastify';
import { database, ID, db_id } from '../../../config/Appwrite';
import LoadingBar from 'react-top-loading-bar';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FaPeopleGroup } from 'react-icons/fa6';
import { Query } from 'appwrite';
import { Modal } from '../Modal';


export const UpdateTournModal = ({ tournament, onClose }) => {
    const { user } = useAuth()
    const [progress, setProgress] = useState(0)


    const [entryFeeObj, setEntryFeeObj] = useState(JSON.parse(tournament.entryFee))

    const [gameDetailsObj, setGameDetailsObj] = useState(JSON.parse(tournament.gameDetails))

    const [updatedTournament, setUpdatedTournament] = useState({
        gameID: tournament.gameID,
        tournTitle: tournament.tournTitle,
        description: tournament.description,
        imgURL: tournament.imgURL,
        startDate: tournament.startDate,
        endDate: tournament.endDate,
        entryFee: JSON.parse(tournament.entryFee),
        host: tournament.host,
        isFeatured: tournament.isFeatured,
        prizeType: tournament.prizeType,
        prizePool: tournament.prizePool,
        participants: tournament.participants,
        status: tournament.status,
        ytStreamURL: tournament.ytStreamURL,
        rules: tournament.rules,
        winners: tournament.winners,
        max: tournament.max,
        min: tournament.min,
        gameDetails: JSON.parse(tournament.gameDetails),
        bracket: tournament.bracket,
    })

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

    const tabs = document.getElementsByClassName("tournTab");
    let [activeTab, setActiveTab] = useState(0);
    const handleTabs = (event) => {
        const index = Array.from(tabs).indexOf(event.target);
        setActiveTab(index);
    }

    useEffect(() => (
        setActiveTab(activeTab)
    ), [activeTab])




    const handleInputChange = (e) => {
        e.preventDefault()
        let { name, value, type } = e.target;
        setUpdatedTournament((prevData) => ({
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
        setUpdatedTournament((prevData) => ({
            ...prevData,
            entryFee: JSON.stringify(entryFeeObj)
        }))
    }, [entryFeeObj])


    // prize pool 
    const [prizesData, setPrizesData] = useState(tournament.prizePool); // Initial state with a number

    const addPrize = () => {
        setPrizesData([...prizesData, 0]); // Add a number (0 in this case) to the prizes array
    };

    useEffect(() => {
        setUpdatedTournament((prevData) => ({
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
        setUpdatedTournament((prevData) => ({
            ...prevData,
            gameDetails: JSON.stringify(gameDetailsObj)
        }))
    }, [gameDetailsObj])


    // ytStreamURLs 
    const [ytStreamData, setYtStreamData] = useState(tournament.ytStreamURL); // Initial state

    const addYtURL = () => {
        setYtStreamData([...ytStreamData, '']); // Add a string (empty string in this case) to the stream url array
    };

    useEffect(() => {
        setUpdatedTournament((prevData) => ({
            ...prevData,
            ytStreamURL: ytStreamData.filter(url => url !== '')
        }))
    }, [ytStreamData])

    const handleYtStreamURLChange = (index, value) => {
        const updatedStreamURL = [...ytStreamData];
        updatedStreamURL[index] = value;
        setYtStreamData(updatedStreamURL);
    };



    const [participantDetails, setParticipantDetails] = useState([])
    useEffect(() => {
        setProgress(40)
        const fetchUserDetails = async () => {
            try {
                const userDetailsPromises = tournament.participants.map(async participantId => {
                    const userDetail = await database.getDocument(db_id, 'user_details', participantId, [Query.select(['prof_pic_url', 'username', 'game_profiles'])]);
                    return userDetail;
                });
                const userDetailsData = await Promise.all(userDetailsPromises);

                setParticipantDetails(userDetailsData);
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

    const validateFields = () => {
        if (updatedTournament.tournTitle && updatedTournament.tournTitle.length > 3) {
            if (updatedTournament.imgURL) {
                if (updatedTournament.max && updatedTournament.max >= 2) {
                    if (updatedTournament.min >= 2) {
                        if (JSON.parse(updatedTournament.entryFee).fee >= 0) {
                            if (updatedTournament.prizePool.every(prize => prize >= 0)) {
                                if (updatedTournament.startDate && updatedTournament.endDate) {
                                    if (updatedTournament.rules) {
                                        // validating game info
                                        if (tournament.gameID === 'freefire') {
                                            if (gameDetailsObj.gameMode) {
                                                if (gameDetailsObj.teamSize !== "-1") {
                                                    if (gameDetailsObj.map) {
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


    const [confirmationModal, setConfirmationModal] = useState(false)
    const handleUpdate = () => {
        if (validateFields()) {
            console.log(updatedTournament);
            if (updatedTournament.status === "Finished") {
                if (updatedTournament.winners.filter(item => item.trim() !== '').length == updatedTournament.prizePool.length) {
                    let usernameArray = participantDetails.map(user => user.username)
                    let count = 0;
                    for (let i = 0; i < winnerData.length; i++) {
                        if (usernameArray.includes(winnerData[i]))
                            ++count;
                    }
                    if (count === winnerData.length) {
                        setConfirmationModal(true)
                    } else {
                        toast.error(`At least one winner is not in participants list, please recheck!`)
                    }
                } else {
                    toast.info("All winners must be specified")
                }
            } else {
                setConfirmationModal(true)
            }
        }
    }


    const handleFinalUpdate = async () => {
        setProgress(40)
        if (updatedTournament.status === "Finished") {
            try {
                const prizeValues = await database.getDocument(db_id, 'tournaments', tournament.$id, [Query.select('prizePool')])
                for (let index = 0; index < winnerData.length; index++) {
                    const winnerUsername = winnerData[index];
                    const userData = await database.listDocuments(db_id, 'user_details', [Query.equal('username', winnerUsername), Query.select(['eg_coin', 'eg_token', '$id', 'notifications'])])

                    if (userData.total === 1) {
                        let coin = userData.documents[0].eg_coin;
                        let token = userData.documents[0].eg_token;
                        let prize = prizeValues.prizePool[index]

                        let updatedCurrency = 0;
                        if (tournament.prizeType === 'eg_coin') {
                            updatedCurrency = coin + prize;
                            await database.updateDocument(db_id, 'user_details', userData.documents[0].$id, { 'eg_coin': updatedCurrency })
                        } else {
                            updatedCurrency = token + prize;
                            await database.updateDocument(db_id, 'user_details', userData.documents[0].$id, { 'eg_token': updatedCurrency })
                        }

                        toast.success(`${winnerUsername} => ${prize} ${tournament.prizeType === 'eg_coin' ? 'EG Coins' : 'EG Tokens'} (Prize#${index + 1})`, {
                            autoClose: false,
                        })

                        // let notif = await database.createDocument(db_id, 'notifications', ID.unique(),
                        //     {
                        //         recipentType: "specific",
                        //         message: `🎉 Congratulations! You got <span class="text-primary">rank ${index + 1} </span>in tournament <span class="text-offBlue">${updatedTournament.tournTitle} (T-Code: ${tournament.$id})</span>. <span class="text-primary">${prize} ${tournament.prizeType === 'eg_coin' ? 'EG Coins' : 'EG Tokens'}</span> credited to your account.`,
                        //         recipents: [
                        //             JSON.stringify(
                        //                 {
                        //                     user: userData.documents[0].$id,
                        //                     read: false
                        //                 }
                        //             )
                        //         ],
                        //         targetLink: null
                        //     }
                        // )
                        // let updatedNotifications = userData.documents[0].notifications.push(notif.$id)
                        // await database.updateDocument(db_id, 'user_details', userData.documents[0].$id, { 'notifications': [updatedNotifications] })

                    } else {
                        toast.error(`User '${winnerUsername}' not found!`, { autoClose: false, })
                    }
                }

            } catch (error) {
                toast.error(error.message)
            }
        }

        if (updatedTournament.status === "Aborted") {
            if (JSON.parse(tournament.entryFee).fee > 0) {
                try {
                    const response = await database.getDocument(db_id, 'tournaments', tournament.$id, [Query.select(['participants'])])
                    if (response.participants.length > 0) {
                        let count = 0;
                        for (let i = 0; i < response.participants.length; i++) {
                            const participantID = response.participants[i];
                            try {
                                const userRes = await database.getDocument(db_id, 'user_details', participantID, [Query.select(['eg_coin', 'eg_token', 'username', 'notifications'])])

                                let coin = userRes.eg_coin;
                                let token = userRes.eg_token;

                                let updatedCurrency = 0;
                                try {
                                    if (JSON.parse(tournament.entryFee).currencyType === 'eg_coin') {
                                        updatedCurrency = coin + JSON.parse(tournament.entryFee).fee;
                                        await database.updateDocument(db_id, 'user_details', participantID, { 'eg_coin': updatedCurrency })
                                    } else {
                                        updatedCurrency = token + JSON.parse(tournament.entryFee).fee;
                                        await database.updateDocument(db_id, 'user_details', participantID, { 'eg_token': updatedCurrency })
                                    }
                                    ++count;



                                    // let notif = await database.createDocument(db_id, 'notifications', ID.unique(),
                                    //     {
                                    //         recipentType: "specific",
                                    //         message: `You got a refund of ${JSON.parse(tournament.entryFee).fee} ${JSON.parse(tournament.entryFee).currencyType === 'eg_coin' ? 'EG Coins' : 'EG Tokens'} as tournament <span class="text-offBlue">${updatedTournament.tournTitle} (T-Code: ${tournament.$id})</span> has been aborted! `,
                                    //         recipents: [
                                    //             JSON.stringify(
                                    //                 {
                                    //                     user: participantID,
                                    //                     read: false
                                    //                 }
                                    //             )
                                    //         ],
                                    //         targetLink: null
                                    //     }
                                    // )


                                    // let updatedNotifications = userRes.notifications.push(notif.$id)
                                    // await database.updateDocument(db_id, 'user_details', participantID, { 'notifications': [updatedNotifications] })



                                } catch (error) {
                                    toast.error(`Error updating funds of participant '${userRes.username}'`, { autoClose: false })
                                }



                            } catch (error) {
                                toast.error(`Error fetching funds of participant '${userRes.username}'`, { autoClose: false })
                            }
                        }

                        if (count === response.participants.length)
                            toast.success(`Entry fees of ALL participants refunded successfully!`)
                    }
                } catch (error) {
                    toast.error(error.message)
                }

            }
        }
        try {
            await database.updateDocument(db_id, 'tournaments', tournament.$id, updatedTournament)
            toast.success("Tournament updated")
        } catch (error) {
            toast.error(error.message)
        }
        setConfirmationModal(false)
        onClose();
        setProgress(100)
        let pauseTime = 2500
        if (updatedTournament.status === "Finished" || updatedTournament.status === "Aborted") {
            pauseTime = 40000
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
            <div className='h-[92vh] lg:w-[70vw] md:w-[80vw] w-[94vw] overflow-x-hidden custom-scrollbar'>
                <div className='lg:h-[40%] md:h-[36%] h-[34%] flex flex-col justify-between' style={{
                    backgroundImage: `url(${updatedTournament.imgURL}`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>

                    <div className='tournModalComponent-custom-gradient h-full flex flex-col justify-end items-start px-4'>
                        <div className="w-full">
                            <div className="flex md:justify-center md:gap-8 gap-4 md:text-base text-sm custom-scrollbar whitespace-nowrap overflow-x-auto">
                                <div onClick={(e) => handleTabs(e)} className={`tournTab ${activeTab === 0 ? 'md:border-b-2 md:border-primary md:text-offBlue text-primary' : 'text-inactive hover:text-offBlue'}  pb-2 font-semibold cursor-pointer`}>Tournament</div>
                                <div onClick={(e) => handleTabs(e)} className={`tournTab ${activeTab === 1 ? 'md:border-b-2 md:border-primary md:text-offBlue text-primary' : 'text-inactive hover:text-offBlue'}  pb-2 font-semibold cursor-pointer`}>Matches</div>
                            </div>
                            <div className="h-[1px] bg-inactive bg-opacity-25 w-full"></div>
                        </div>
                    </div>
                </div>
                <div className='w-full p-4 flex-col gap-4'>
                    <div className="w-full flex flex-col">


                        {activeTab === 0 &&
                            <>
                                <h3 className='text-xl text-offBlue font-semibold '>Update Tournament Details</h3>
                                <div className='text-sm text-offBlue my-4 border-2 border-finishedStatus border-opacity-45 bg-inactive bg-opacity-10 px-3 py-2 rounded-[5px]'>
                                    <p>Please double-check entered details.</p>
                                </div>

                                <fieldset className='border-2 border-inactive border-opacity-20 rounded-md bg-secondaryLight bg-opacity-30'>
                                    <legend className='px-3 bg-finishedStatus rounded-xl text-sm ml-2'>General Info</legend>
                                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 px-4 pt-2 pb-4">

                                        <div className="flex flex-col gap-3">
                                            <div className="flex flex-col gap-1">
                                                <div>Tournament Title <span className='text-red-500 font-semibold text-lg'>*</span></div>
                                                <input onChange={(e) => handleInputChange(e)} disabled={tournament.status === "Finished"} name='tournTitle' type="text" value={updatedTournament.tournTitle} className='bg-secondary py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div>Thumbnail URL <span className='text-red-500 font-semibold text-lg'>*</span></div>
                                                <input onChange={(e) => handleInputChange(e)} name='imgURL' type="url" value={updatedTournament.imgURL} className='bg-secondary py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div>Description</div>
                                                <textarea onChange={(e) => handleInputChange(e)} name='description' value={updatedTournament.description || ''} className='bg-secondary py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' placeholder='Eg: Solo single-match tournament in which winners are the top scorers based on a single match.'></textarea>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div>Max Participants <span className='text-red-500 font-semibold text-lg'>*</span></div>
                                                <input onChange={(e) => handleInputChange(e)} disabled={tournament.status !== "Open"} name='max' type="number" value={updatedTournament.max} className='bg-secondary py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div>Min Participants</div>
                                                <input onChange={(e) => handleInputChange(e)} disabled={tournament.status !== "Open"} name='min' type="number" value={updatedTournament.min} className='bg-secondary py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <div>Is Featured?</div>
                                                <select onChange={(e) => handleInputChange(e)} name="isFeatured" id="" value={updatedTournament.isFeatured} className='custom-dropdown border-2 border-inactive border-opacity-20 text-offBlue'>
                                                    <option value="false">No</option>
                                                    <option value="true">Yes</option>
                                                </select>
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <div>Entry Fee <span className='text-red-500 font-semibold text-lg'>*</span></div>
                                                <div className="flex gap-2">
                                                    <div className="flex items-center py-2 pl-3 rounded-[5px] w-full border-2 border-inactive border-opacity-20">
                                                        <input onChange={(e) => handleEntryFeeInput(e)} disabled={participantDetails.length > 0} value={entryFeeObj.fee} step={1} min={0} name='fee' className='bg-transparent w-full placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="number" placeholder='Eg. 0' />
                                                        <div className='mx-3'><img src={`${entryFeeObj.currencyType === "eg_token" ? '/icons/eg_token.svg' : '/icons/Coin.svg'}`} alt="EG Token" className='h-5 w-auto' /></div>
                                                    </div>
                                                    <select onChange={(e) => handleEntryFeeInput(e)} disabled={participantDetails.length > 0} value={entryFeeObj.currencyType} name="currencyType" id="" className='custom-dropdown'>
                                                        <option value="eg_token">EG Token</option>
                                                        <option value="eg_coin">EG Coin (premium)</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div>Prize Type <span className='text-red-500 font-semibold text-lg'>*</span></div>
                                                <div className="flex items-center">
                                                    <select onChange={(e) => handleInputChange(e)} disabled={participantDetails.length > 0} value={updatedTournament.prizeType || ''} name="prizeType" id="" className='custom-dropdown'>
                                                        <option value="eg_token">EG Token</option>
                                                        <option value="eg_coin">EG Coin (premium)</option>
                                                    </select>
                                                    <div className='ml-3'><img src={`${updatedTournament.prizeType === "eg_token" ? '/icons/eg_token.svg' : '/icons/Coin.svg'}`} alt="EG Token" className='h-5 w-auto' /></div>
                                                </div>

                                            </div>

                                            <div className='flex flex-col gap-1'>
                                                <div>Prizes <span className='text-red-500 font-semibold text-lg'>*</span></div>
                                                <div className="flex flex-col gap-2">
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
                                                                disabled={tournament.status === "Finished" || participantDetails.length > 0 && tournament.prizePool[index] != null}
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

                                            <div className="flex flex-col gap-1">
                                                <div>Start Date <span className='text-red-500 font-semibold text-lg'>*</span></div>
                                                <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                                                    <input onChange={(e) => handleInputChange(e)} disabled={participantDetails.length > 0 || tournament.status === "Finished"} name='startDate' type="datetime-local" className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                                                    <div className='bg-secondaryLight py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none'>{formatDateTime(updatedTournament.startDate).date} / {formatDateTime(updatedTournament.startDate).time} </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div>End Date <span className='text-red-500 font-semibold text-lg'>*</span></div>
                                                <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                                                    <input onChange={(e) => handleInputChange(e)} disabled={participantDetails.length > 0 || tournament.status === "Finished"} name='endDate' type="datetime-local" className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' />
                                                    <div className='bg-secondaryLight py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none'>{formatDateTime(updatedTournament.endDate).date}</div>
                                                </div>
                                            </div>


                                            <div className="flex flex-col gap-1">
                                                <div>Rules & Details <span className='text-red-500 font-semibold text-lg'>*</span></div>
                                                <textarea onChange={(e) => handleInputChange(e)} disabled={tournament.status === "Finished"} value={updatedTournament.rules} name="rules" id="" cols="30" rows="6" placeholder='Rules, Details, and Guides' className='bg-secondary custom-scrollbar py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none'></textarea>
                                            </div>

                                            <div className='flex flex-col gap-1'>
                                                <div>YT Stream URLs</div>
                                                <div className="flex flex-col gap-2">
                                                    {ytStreamData.map((ytStream, index) => (
                                                        <div key={index} className='flex gap-2 items-center'>
                                                            <div className='text-inactive font-bold '>#{index + 1}</div>
                                                            <input
                                                                className='w-full bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none'
                                                                type="url"
                                                                placeholder={`URL ${index + 1}`}
                                                                value={ytStream}
                                                                onChange={(e) => handleYtStreamURLChange(index, e.target.value)}
                                                            />
                                                            {index === ytStreamData.length - 1 && (
                                                                <div onClick={addYtURL} className='w-14 h-11 text-xl flex justify-center items-center bg-secondaryLight cursor-pointer rounded'>
                                                                    <IoIosAddCircleOutline />
                                                                </div>
                                                            )}
                                                        </div>

                                                    ))}
                                                    {ytStreamData.length === 0 &&
                                                        <div className='flex gap-2 items-center'>
                                                            <div onClick={addYtURL} className='w-full h-11 text-xl flex justify-center items-center bg-secondaryLight hover:bg-slate-800 cursor-pointer rounded'>
                                                                <IoIosAddCircleOutline />
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <div>Bracket <span className='text-red-500 font-semibold text-lg'>*</span></div>
                                                <select disabled name="bracket" id="" className='custom-dropdown border-2 border-inactive border-opacity-20 text-offBlue'>
                                                    <option value="single_match">Single Match</option>
                                                </select>
                                            </div>


                                        </div>

                                        <div className="flex flex-col gap-3">

                                            <div className="flex flex-col gap-1">
                                                <div>Participants</div>
                                                {participantDetails && participantDetails.length >= 1 ?
                                                    <>
                                                        <div className="overflow-auto max-h-[80vh] custom-scrollbar bg-secondary rounded-[5px]">
                                                            <table className="table-auto min-w-96 overflow-x-auto">
                                                                <thead className='bg-secondaryLight text-offBlue text-left'>
                                                                    <tr className="">
                                                                        <th className="px-4 py-3">#</th>
                                                                        <th className="px-4 py-3">Player/Team</th>
                                                                        {tournament.gameID === "freefire" && <>
                                                                            <th className="px-4 py-3">FF Name</th>
                                                                            <th className="px-4 py-3">FF UID</th>
                                                                        </>}
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

                                                                            {tournament.gameID === "freefire" && <>

                                                                                <td className='px-4 py-3'>
                                                                                    {
                                                                                        participant.game_profiles.map(gprofile => {
                                                                                            const profile = JSON.parse(gprofile);
                                                                                            if (profile.gameID === 'freefire') {
                                                                                                return profile.nickname
                                                                                            }
                                                                                        })
                                                                                    }
                                                                                </td>
                                                                                <td className='px-4 py-3'>
                                                                                    {
                                                                                        participant.game_profiles.map(gprofile => {
                                                                                            const profile = JSON.parse(gprofile);
                                                                                            if (profile.gameID === 'freefire') {
                                                                                                return profile.uid
                                                                                            }
                                                                                        })
                                                                                    }
                                                                                </td>
                                                                            </>

                                                                            }

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
                                                    {tournament.prizePool.map((prize, index) => (
                                                        <div key={index} className="flex gap-3 items-center bg-secondary rounded-[5px] border-2 border-inactive border-opacity-20">
                                                            <div className='ml-3'>#{index + 1}</div>
                                                            <input disabled={updatedTournament.status !== "Finished" || tournament.status === "Finished"} value={winnerData[index] || ''} onChange={(e) => handleWinnerChange(index, e.target.value)} type="text" placeholder={`EG Username of #${index + 1}`} className='bg-transparent w-full py-2 px-3  placeholder:text-sm placeholder:text-inactive focus:outline-none' />
                                                        </div>
                                                    ))}


                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <div>Status</div>
                                                <select disabled={tournament.status === "Finished" || tournament.status === "Aborted"} onChange={handleInputChange} name="status" id="" value={updatedTournament.status} className='custom-dropdown border-2 border-inactive border-opacity-20 text-offBlue'>
                                                    <option value="Open">Open</option>
                                                    <option value="Ongoing">Ongoing</option>
                                                    <option value="Finished">Finished</option>
                                                    <option value="Aborted">Aborted</option>
                                                </select>
                                            </div>

                                        </div>



                                    </div>
                                </fieldset>

                                <fieldset className='border-2 border-inactive border-opacity-20 rounded-md mt-4 bg-secondaryLight bg-opacity-30'>
                                    <legend className='px-3 bg-openStatus text-secondary font-semibold rounded-xl text-sm ml-2'>Game Info</legend>

                                    <div className="grid md:grid-cols-2 grid-cols-1 gap-3 px-4 pt-2 pb-4">
                                        {tournament.gameID === "freefire" && <>
                                            <div className="flex flex-col gap-1">
                                                <div>Game Mode <span className='text-red-500 font-semibold text-lg'>*</span></div>
                                                <input onChange={(e) => handleGamedetailsInput(e)} disabled name='gameMode' type="text" value={gameDetailsObj.gameMode} className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' placeholder='Eg: Battle Royale' />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div>Team Size <span className='text-red-500 font-semibold text-lg'>*</span></div>
                                                <select onChange={(e) => handleGamedetailsInput(e)} disabled name="teamSize" id="" value={gameDetailsObj.teamSize} className='custom-dropdown border-2 border-inactive border-opacity-20 text-offBlue'>
                                                    <option value="Solo">Solo</option>
                                                    <option value="Duo">Duo</option>
                                                    <option value="Squad">Squad</option>
                                                </select>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div>Map <span className='text-red-500 font-semibold text-lg'>*</span></div>
                                                <input onChange={(e) => handleGamedetailsInput(e)} disabled={participantDetails.length !== 0 || tournament.status === "Finished"} name='map' type="text" value={gameDetailsObj.map} className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-70 focus:outline-none' placeholder='Eg: Random' />
                                            </div>
                                        </>}
                                    </div>


                                </fieldset>

                                <div className="flex justify-center gap-4 items-center">

                                    {<button onClick={onClose} className={`self-center mt-4 bg-slate-800 transition-colors text-offWhite duration-300  w-48 px-3 py-2 rounded-[5px] font-medium `}>Cancel</button>}
                                    {tournament.status !== "Aborted" && <button onClick={handleUpdate} className={`mt-4 bg-primary transition-colors text-secondary duration-300  w-48 px-3 py-2 rounded-[5px] font-bold `}>Update</button>}
                                </div>

                            </>
                        }

                        {activeTab === 1 &&
                            <>
                                Match updates
                            </>
                        }


                    </div>




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
