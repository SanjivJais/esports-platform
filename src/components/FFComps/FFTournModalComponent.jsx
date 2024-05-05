import React, { useContext, useEffect, useState } from 'react'
import { MdInfo, MdTry } from "react-icons/md";
import { AiFillEyeInvisible } from "react-icons/ai";
import ReactHtmlParser from 'react-html-parser';
import { Modal } from '../Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tooltip } from '../Tooltip';
import { useAuth } from '../../utils/AuthContext'
import GameProfileContext from '../../utils/GameProfileContext';
import { Link } from 'react-router-dom';
import { database, db_id } from '../../../config/Appwrite';
import { Query } from 'appwrite';
import { BiSolidExit } from 'react-icons/bi';
import { FaCircleCheck, FaPeopleGroup, FaRegClock } from 'react-icons/fa6';
import LoadingBar from 'react-top-loading-bar';
import { PiShareFatFill } from 'react-icons/pi';


export const FFTournModalComponent = ({ tournament }) => {
    let totalPrize = 0;
    for (let index = 0; index < tournament.prizes.length; index++) {
        totalPrize += tournament.prizes[index];
    }

    let joinPercent = parseInt((tournament.participants.length * 100) / tournament.max);

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

    const calculateTimeLeft = (targetDateTime) => {
        // Parse the target date and time
        const [dateString, timeString] = targetDateTime.split('T');
        const [year, month, day] = dateString.split('-').map(Number);
        const [hour, minute] = timeString.split(':').map(Number);

        // Create a new Date object using the extracted components
        const targetDate = new Date(year, month - 1, day, hour, minute);

        // Get the current date and time
        const currentDate = new Date();

        // Calculate the time difference in milliseconds
        const timeDifference = targetDate - currentDate;

        // Calculate days and hours left
        const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        return { daysLeft, hoursLeft };
    };

    const [progress, setProgress] = useState(0)

    const tabs = document.getElementsByClassName("tournTab");
    let [activeTab, setActiveTab] = useState(0);
    const handleTabs = (event) => {
        const index = Array.from(tabs).indexOf(event.target);
        setActiveTab(index);
    }

    useEffect(() => (
        setActiveTab(activeTab)
    ), [activeTab])

    // YT video id extraction
    const ytVidExtracter = (url) => {
        let splited = url.split("v=");
        let splitedAgain = splited[1].split("&");
        let videoId = splitedAgain[0];
        return videoId;
    }


    const { user, userDetails, setUserDetails } = useAuth();
    const { ffProfile } = useContext(GameProfileContext);

    const [joinStatus, setJoinStatus] = useState(false)
    useEffect(() => {
        if (user && userDetails) {
            const status = userDetails.ffTournaments.includes(tournament.$id)
            setJoinStatus(status)
        }
    }, [])

    const [joinConfirmationModal, setJoinConfirmationModal] = useState(null);

    const handleJoinConfirmation = () => {
        if (user) {
            if (userDetails && userDetails.username) {
                if (ffProfile) {
                    setJoinConfirmationModal(!joinConfirmationModal);
                } else {
                    toast.info(<>You don't have Free Fire Game Profile. Create it in <Link to={'/profile'} className='text-primary'>Profile Section</Link></>)
                }
            } else {
                toast.info(<>Claim your EsportsGravity username first. Go to <Link to={'/profile'} className='text-primary'>Profile Section</Link></>)
            }
        } else {
            toast.info(<>Please <Link to={'/login'} className='text-primary'>Login</Link> to particpate</>)
        }

    }

    const handleFinalJoin = async () => {
        if (user) {
            setProgress(30)
            try {
                const tourn = await database.getDocument(db_id, 'ff_tournaments', tournament.$id, [Query.select(['max', 'participants', 'entryFee'])])
                const user_details = await database.getDocument(db_id, 'user_details', user.$id, [Query.select(['eg_coin', 'ffTournaments'])])
                if (tourn && user_details) {
                    setProgress(50)
                    if (tourn.participants.length < tourn.max) {
                        if (user_details.eg_coin >= tourn.entryFee) {
                            try {
                                tourn.participants.push(user.$id);
                                let updatedEGCoin = user_details.eg_coin - tournament.entryFee;
                                user_details.ffTournaments.push(tournament.$id)

                                await database.updateDocument(db_id, 'ff_tournaments', tournament.$id, { 'participants': tourn.participants })

                                await database.updateDocument(db_id, 'user_details', user.$id, { 'ffTournaments': user_details.ffTournaments, 'eg_coin': updatedEGCoin })

                                setProgress(80)
                                setJoinConfirmationModal(false)
                                setUserDetails((prevData) => ({
                                    ...prevData,
                                    'eg_coin': updatedEGCoin,
                                    'ffTournaments': user_details.ffTournaments
                                }))
                                toast.success("Tournament joined!");
                                setJoinStatus(true)
                                setProgress(100)
                            } catch (error) {
                                toast.error("Something went wrong")
                            }

                        } else {
                            toast.info("Insufficient funds!")
                        }
                    } else {
                        toast.info("Tournament is already full")
                    }
                } else {
                    setProgress(80)
                }
            } catch (error) {
                console.log(error);
                toast.error("Error occurred")
            }
        }
    }

    const [exitConfirmationModal, setExitConfirmationModal] = useState(false)
    const handleExitConfirmation = async () => {
        setProgress(40)
        try {
            const tournStatus = await database.getDocument(db_id, 'ff_tournaments', tournament.$id, [Query.select(['status'])])
            if (tournStatus.status === "Open") {
                setExitConfirmationModal(true)
            } else {
                toast.info("You can only exit from tournament until its status is Open!")
            }
            setProgress(80)
        } catch (error) {
            toast.error('Something went wrong')
        }
        setProgress(100)
    }

    const handleFinalExitConfirmation = async () => {
        setProgress(40)
        try {
            const tournParticipants = await database.getDocument(db_id, 'ff_tournaments', tournament.$id, [Query.select(['participants', 'entryFee'])])
            const userData = await database.getDocument(db_id, 'user_details', user.$id, [Query.select(['ffTournaments', 'eg_coin'])])

            const updatedParticipants = tournParticipants.participants.filter((participant) => participant !== user.$id)
            const updatedParticipatedTourns = userData.ffTournaments.filter((tourn) => tourn !== tournament.$id)

            await database.updateDocument(db_id, 'ff_tournaments', tournament.$id, { 'participants': updatedParticipants })

            let coin = userData.eg_coin;
            let updatedCoin = coin + Math.floor(tournParticipants.entryFee * 0.90)
            await database.updateDocument(db_id, 'user_details', user.$id, { 'ffTournaments': updatedParticipatedTourns, 'eg_coin': updatedCoin })
            setUserDetails((prevData) => ({
                ...prevData,
                'eg_coin': updatedCoin
            }))
            setProgress(70)

            toast.success("Exited successfully!")
            setJoinStatus(false)
            setExitConfirmationModal(false)
        } catch (error) {
            toast.error("Something went wrong!")
        }
        setProgress(100)

    }


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
                setParticipantDetails(userDetailsData);
            } catch (error) {
                toast.error("Error fetching participant details", error);
            }

        };
        fetchUserDetails();
    }, []);


    // copy tournament ID functionality 
    const handleShareClick = () => {
        navigator.clipboard.writeText(tournament.$id)
            .then(() => {
                toast.success("Tournament ID copied. Please use it for searching this tournament.")
            })
            .catch((error) => toast.error('Error copying tournament ID:', error));
    }



    return (
        <>
            <LoadingBar
                color='#F88B26'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />

            <div className='h-[92vh] md:w-[72vw] w-[90vw] overflow-x-hidden custom-scrollbar'>
                <div className='lg:h-[45%] md:h-[40%] h-[35%] flex flex-col justify-between' style={{
                    backgroundImage: `url("${tournament.imgURL}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                    <div className="flex gap-2 items-center pt-3 pl-3">
                        <div className='bg-secondary h-fit relative text-[13px] px-3 py-[3px] rounded-2xl font-medium flex items-center gap-1'>Free Fire</div>
                        {tournament.status === "Open" && <div title='Time left to start' className='bg-secondary h-fit relative text-[13px] px-3 py-[3px] rounded-2xl font-medium flex items-center gap-1'>Start In: <FaRegClock className='text-openStatus' />{calculateTimeLeft(tournament.startTime).daysLeft}d, {calculateTimeLeft(tournament.startTime).hoursLeft}hrs </div>}
                    </div>
                    <div className='tournModalComponent-custom-gradient h-full flex flex-col justify-end items-start px-4'>
                        <div className="lg:w-[63%] md:w-[58%] w-full">
                            <div className="flex gap-4 items-center mb-4">
                                <h2 className='lg:text-4xl md:text-3xl text-xl font-semibold text-offWhite'>{tournament.tournTitle}</h2>
                                <div onClick={handleShareClick} className='bg-offBlue text-secondary flex items-center justify-center md:h-6 h-5 md:w-6 w-5  rounded cursor-pointer'><PiShareFatFill className='md:text-base text-sm' /></div>
                            </div>
                            <div className="flex max-md:justify-between md:gap-8 gap-4 md:text-base text-sm custom-scrollbar whitespace-nowrap overflow-x-auto">
                                <label htmlFor="" onClick={(e) => handleTabs(e)} className={`tournTab ${activeTab === 0 ? 'md:border-b-2 md:border-primary md:text-offBlue text-primary' : 'text-inactive hover:text-offBlue'}  pb-2 font-semibold cursor-pointer`}>Overview</label>
                                <label htmlFor="" onClick={(e) => handleTabs(e)} className={`tournTab ${activeTab === 1 ? 'md:border-b-2 md:border-primary md:text-offBlue text-primary' : 'text-inactive hover:text-offBlue'}  pb-2 font-semibold cursor-pointer`}>Entry Info</label>
                                <label htmlFor="" onClick={(e) => handleTabs(e)} className={`tournTab ${activeTab === 2 ? 'md:border-b-2 md:border-primary md:text-offBlue text-primary' : 'text-inactive hover:text-offBlue'}  pb-2 font-semibold cursor-pointer`}>Watch</label>
                                <label htmlFor="" onClick={(e) => handleTabs(e)} className={`tournTab ${activeTab === 3 ? 'md:border-b-2 md:border-primary md:text-offBlue text-primary' : 'text-inactive hover:text-offBlue'}  pb-2 font-semibold cursor-pointer`}>Rules & Details</label>
                                <label htmlFor="" onClick={(e) => handleTabs(e)} className={`tournTab ${activeTab === 4 ? 'md:border-b-2 md:border-primary md:text-offBlue text-primary' : 'text-inactive hover:text-offBlue'}  pb-2 font-semibold cursor-pointer`}>Participants</label>
                            </div>
                            <div className="h-[1px] bg-inactive bg-opacity-25 w-full"></div>
                        </div>
                    </div>
                </div>
                <div className='w-full px-4 py-6 flex md:flex-row flex-col gap-4'>
                    <div className="lg:w-[64%] md:w-[58%] flex flex-col">

                        {activeTab === 0 &&
                            <>
                                <div className="grid lg:grid-cols-4 grid-cols-3 gap-x-4 gap-y-8">
                                    <div>
                                        <label htmlFor="" className='text-[13px] text-inactive font-semibold flex items-center gap-1'><span>ENTRY FEE </span></label>
                                        <div className='font-medium flex items-center gap-1'>{tournament.entryFee !== 0 && <img className='' src="/icons/Coin.svg" alt="" />}{tournament.entryFee == 0 ? 'Free Entry' : tournament.entryFee}</div>
                                    </div>
                                    <div>
                                        <label htmlFor="" className='text-[13px] text-inactive font-semibold flex items-center gap-1'><span>MODE </span><Tooltip content={"Mode of the game the tournament will be played in."} children={<MdInfo />} /></label>
                                        <div className='font-medium'>{tournament.gameMode}</div>
                                    </div>
                                    <div>
                                        <label htmlFor="" className='text-[13px] text-inactive font-semibold flex items-center gap-1'><span>MAP </span></label>
                                        <div className='font-medium'>{tournament.map}</div>
                                    </div>
                                    <div>
                                        <label htmlFor="" className='text-[13px] text-inactive font-semibold flex items-center gap-1'><span>TEAM TYPE </span><Tooltip content={"Number of players in a team. This can be solo (1 player), duo (2 players), squad (4 players)."} children={<MdInfo />} /></label>
                                        <div className='font-medium'>{tournament.teamType}</div>
                                    </div>
                                    <div>
                                        <label htmlFor="" className='text-[13px] text-inactive font-semibold flex items-center gap-1'><span>MIN / MAX </span><Tooltip content={"Minimum players refer to minimum players needed to start tournament. "} children={<MdInfo />} /></label>
                                        <div className='font-medium'>{tournament.min} / {tournament.max}</div>
                                    </div>
                                    <div>
                                        <label htmlFor="" className='text-[13px] text-inactive font-semibold flex items-center gap-1'><span>PRIZE POOL </span><Tooltip content={"Total prize to be distributed among top performers."} children={<MdInfo />} /></label>
                                        <div className='font-medium flex items-center gap-1'>{tournament.rewardType === "eg_coin" && <img className='' src="/icons/Coin.svg" alt="" />} {totalPrize}</div>
                                    </div>
                                    <div>
                                        <label htmlFor="" className='text-[13px] text-inactive font-semibold flex items-center gap-1'><span>MATCHES </span><Tooltip content={"Total number of matches to be played to decide winners."} children={<MdInfo />} /></label>
                                        <div className='font-medium flex items-center gap-1'> {tournament.matches}</div>
                                    </div>
                                    <div>
                                        <label htmlFor="" className='text-[13px] text-inactive font-semibold flex items-center gap-1'><span>STARTING </span></label>
                                        <div className='font-medium flex items-center gap-1'>{formatDateTime(tournament.startTime).date}</div>
                                    </div>
                                    <div>
                                        <label htmlFor="" className='text-[13px] text-inactive font-semibold flex items-center gap-1'><span>TIME </span></label>
                                        <div className='font-medium flex items-center gap-1'>{formatDateTime(tournament.startTime).time}</div>
                                    </div>
                                    <div>
                                        <label htmlFor="" className='text-[13px] text-inactive font-semibold flex items-center gap-1'><span>STATUS </span><Tooltip content={"Status shows whether new enrollments in tournament is allowed or not."} children={<MdInfo />} /></label>
                                        <div className={`text-[12px] mt-[2px] font-medium ${tournament.status === "Open" ? 'bg-openStatus' : tournament.status === "Ongoing" ? 'bg-ongoingStatus' : tournament.status === "Finished" ? 'bg-finishedStatus' : 'bg-abortedStatus'} bg-opacity-40 w-fit px-2 py-[2px] rounded-xl`}>{tournament.status}</div>
                                    </div>
                                </div>


                            </>
                        }
                        {activeTab === 1 &&
                            <>

                                {joinStatus ?
                                    <>
                                        {tournament.roomID ?
                                            <div className="grid grid-cols-2 gap-x-4 gap-y-8">
                                                <div>
                                                    <label htmlFor="" className='text-[13px] text-inactive font-semibold'><span>ROOM ID </span></label>
                                                    <div className='font-medium'>{tournament.roomID}</div>
                                                </div>
                                                <div>
                                                    <label htmlFor="" className='text-[13px] text-inactive font-semibold'><span>ROOM PASS </span></label>
                                                    <div className='font-medium'>{tournament.roomPass}</div>
                                                </div>

                                            </div>
                                            :
                                            <div className='flex flex-col gap-6'>
                                                <AiFillEyeInvisible className='text-inactive text-opacity-35 text-[4rem] self-center' />
                                                <p className='text-offBlue text-[0.9rem]'>
                                                    <span className='text-primary'>NOTE: </span>
                                                    Room ID and Room Password will be visible here around
                                                    <span className='text-offWhite'> 10 minutes </span>
                                                    before starting time of match. Please check back in time!
                                                </p>
                                            </div>
                                        }
                                    </>
                                    :
                                    <>
                                        <div className='w-full h-64 border-[0.8px] border-inactive border-opacity-20 rounded-[5px] flex justify-center items-center text-inactive'>
                                            <div className='flex flex-col gap-3 items-center'>
                                                <AiFillEyeInvisible className='text-4xl' />
                                                You haven't joined this tournament!
                                            </div>
                                        </div>
                                    </>
                                }
                            </>
                        }
                        {activeTab === 2 &&
                            <div className='flex flex-col items-center gap-4'>
                                {tournament.ytLiveURL ?
                                    <iframe className='rounded-[10px] md:h-[310px] max-w-[580px] w-full h-auto'
                                        src={`https://www.youtube.com/embed/${ytVidExtracter(tournament.ytLiveURL)}`}
                                        title="YouTube video player"
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen>
                                    </iframe>
                                    :
                                    <div className='text-inactive my-10'>No videos available right now!</div>
                                }
                            </div>
                        }
                        {activeTab === 3 &&
                            <div className='content-area'>
                                {ReactHtmlParser(tournament.rulesDetails)}
                            </div>
                        }
                        {activeTab === 4 &&
                            <div className='flex flex-col gap-4'>

                                {participantDetails.length >= 1 ?
                                    <>
                                        <div className="overflow-auto custom-scrollbar rounded-[5px]">
                                            <table className="table-auto w-full ">
                                                <thead className='bg-secondaryLight text-offBlue text-left'>
                                                    <tr className="">
                                                        <th className="px-4 py-3">#</th>
                                                        <th className="px-4 py-3">Player/Team</th>
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
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                    :
                                    <><div className='w-full h-64 border-[0.8px] border-inactive border-opacity-20 rounded-[5px] flex justify-center items-center text-inactive'>
                                        <div className='flex flex-col gap-3 items-center'>
                                            <FaPeopleGroup className='text-4xl' />
                                            Be the first to join!
                                        </div>
                                    </div></>
                                }
                            </div>
                        }

                        <div className="h-[1px] bg-inactive bg-opacity-25 w-full my-6"></div>
                        <div className="">
                            <h4 className='font-semibold text-xl mb-3'>Hosted By</h4>
                            <div className='flex justify-between items-center'>
                                <div className='flex gap-3'>
                                    <img src="/icons/EsportsGravityIcon.svg" alt="EsportsGravity Logo" className='' />
                                    <div className="flex flex-col justify-center">
                                        <h4 className='flex items-center gap-[6px]'><span>{tournament.host}</span>
                                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M5.55141 0.412125C6.00125 -0.137374 6.84161 -0.137376 7.29151 0.412125L7.84912 1.09323L8.67262 0.782194C9.337 0.531261 10.0647 0.951419 10.1796 1.65225L10.322 2.52093L11.1907 2.6633C11.8915 2.77816 12.3116 3.5059 12.0607 4.17027L11.7496 4.99375L12.4308 5.55139C12.9802 6.00128 12.9802 6.84159 12.4308 7.29148L11.7496 7.84916L12.0607 8.67259C12.3116 9.33698 11.8915 10.0647 11.1907 10.1796L10.322 10.3219L10.1796 11.1906C10.0647 11.8915 9.337 12.3116 8.67262 12.0607L7.84912 11.7497L7.29151 12.4307C6.84161 12.9803 6.00125 12.9803 5.55141 12.4307L4.99375 11.7497L4.17026 12.0607C3.5059 12.3116 2.77816 11.8915 2.6633 11.1906L2.52092 10.3219L1.65224 10.1796C0.951414 10.0647 0.531262 9.33698 0.782195 8.67259L1.09324 7.84916L0.412126 7.29148C-0.137374 6.84159 -0.137376 6.00128 0.412126 5.55139L1.09324 4.99375L0.782195 4.17027C0.531256 3.5059 0.95142 2.77816 1.65225 2.6633L2.52092 2.52093L2.6633 1.65225C2.77816 0.951419 3.5059 0.531261 4.17026 0.782194L4.99375 1.09323L5.55141 0.412125ZM5.97589 8.78678L9.91148 4.8512L9.11638 4.0561L5.57834 7.59413L3.72699 5.74277L2.93188 6.53787L5.18079 8.78678C5.28623 8.89225 5.42924 8.95146 5.57834 8.95146C5.72745 8.95146 5.87048 8.89225 5.97589 8.78678Z" fill="#26B9F8" />
                                            </svg>
                                        </h4>
                                    </div>
                                </div>
                                <div className="flex gap-2 justify-center">
                                    <svg className='' width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.943 0H2.99175C1.34194 0 0 1.34576 0 2.99997V20.9998C0 22.6542 1.34199 24 2.99175 24H20.943C22.5931 24 23.9351 22.6542 23.9351 20.9998V3.00003C23.9351 1.34576 22.5932 0 20.943 0Z" fill="#1B80E4" />
                                        <path d="M20.1952 12H16.4554V9.00001C16.4554 8.17192 17.1257 8.25012 17.9512 8.25012H19.4474V4.5H16.4554C13.9766 4.5 11.9677 6.51439 11.9677 9.00001V12H8.97583V15.7501H11.9677V24H16.4554V15.7501H18.6993L20.1952 12Z" fill="#FCFCFC" />
                                    </svg>
                                    <svg className='' width="21" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.6189 0H3.25122C1.97204 0 0.935059 1.03698 0.935059 2.31616V21.6838C0.935059 22.963 1.97204 24 3.25122 24H22.6189C23.8981 24 24.9351 22.963 24.9351 21.6838V2.31616C24.9351 1.03698 23.8981 0 22.6189 0Z" fill="#ED2524" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M15.6657 11.8272L11.2465 14.2144V10.5388V9.421L13.2405 10.5057L15.6657 11.8272ZM20.9516 8.58737C20.9516 8.58737 20.7953 7.41271 20.3027 6.89643C19.6822 6.21436 18.986 6.20963 18.6639 6.17174C16.3761 6.00122 12.9421 6.00122 12.9421 6.00122H12.9327C12.9327 6.00122 9.49869 6.00122 7.20621 6.17174C6.88886 6.20963 6.19259 6.21436 5.56737 6.89643C5.07951 7.41271 4.91846 8.58737 4.91846 8.58737C4.91846 8.58737 4.75269 9.97043 4.75269 11.3488V11.5193V12.6466C4.75269 14.0249 4.91846 15.408 4.91846 15.408C4.91846 15.408 5.07951 16.5826 5.56737 17.0989C6.19259 17.781 7.00727 17.7573 7.37199 17.8283C8.68401 17.961 12.9374 17.9989 12.9374 17.9989C12.9374 17.9989 16.3761 17.9941 18.6639 17.8236C18.986 17.781 19.6822 17.781 20.3027 17.0989C20.7953 16.5826 20.9516 15.408 20.9516 15.408C20.9516 15.408 21.1174 14.0249 21.1174 12.6466V11.5903V11.3488C21.1174 9.97043 20.9516 8.58737 20.9516 8.58737Z" fill="#FEFEFE" />
                                    </svg>
                                    <svg width="21" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.93506 0H21.9351C23.5851 0 24.9351 1.35 24.9351 3V21C24.9351 22.65 23.5851 24 21.9351 24H3.93506C2.28506 24 0.935059 22.65 0.935059 21V3C0.935059 1.35 2.28506 0 3.93506 0Z" fill="url(#paint0_linear_78_91)" />
                                        <path d="M16.8351 3.75H9.03506C6.63506 3.75 4.68506 5.775 4.68506 8.175V15.825C4.68506 18.225 6.63506 20.25 9.03506 20.25H16.8351C19.2351 20.25 21.1851 18.225 21.1851 15.825V8.175C21.1851 5.775 19.2351 3.75 16.8351 3.75ZM19.6851 15.675C19.6851 17.325 18.3351 18.75 16.6851 18.75H9.18506C7.53506 18.75 6.18506 17.325 6.18506 15.675V8.25C6.18506 6.6 7.46006 5.25 9.18506 5.25H16.6851C18.3351 5.25 19.6851 6.675 19.6851 8.325V15.675Z" fill="white" />
                                        <path d="M12.9352 7.80003C10.6102 7.72503 8.66018 9.60003 8.58518 11.925C8.51018 14.25 10.3852 16.2 12.7102 16.275C15.0352 16.35 16.9852 14.475 17.0602 12.15V12.075C17.1352 9.67503 15.2602 7.80003 12.9352 7.80003ZM12.9352 14.7C11.4352 14.7 10.1602 13.5 10.1602 12C10.1602 10.5 11.3602 9.22503 12.8602 9.22503C14.3602 9.22503 15.6352 10.425 15.6352 11.925V12C15.6352 13.5 14.4352 14.7 12.9352 14.7Z" fill="white" />
                                        <path d="M17.285 8.4749C17.7821 8.4749 18.185 8.03838 18.185 7.4999C18.185 6.96142 17.7821 6.5249 17.285 6.5249C16.788 6.5249 16.385 6.96142 16.385 7.4999C16.385 8.03838 16.788 8.4749 17.285 8.4749Z" fill="white" />
                                        <defs>
                                            <linearGradient id="paint0_linear_78_91" x1="5.28768" y1="25.2456" x2="20.5824" y2="-1.2456" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#FEC053" />
                                                <stop offset="0.327" stopColor="#F2203E" />
                                                <stop offset="0.648" stopColor="#B729A8" />
                                                <stop offset="1" stopColor="#5342D6" />
                                            </linearGradient>
                                        </defs>
                                    </svg>

                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='h-fit lg:w-[36%] md:w-[42%] bg-frameBG rounded-[5px] flex flex-col md:-mt-12'>

                        <div className='bg-secondaryLight py-3 px-4 flex justify-between rounded-tr-[5px] rounded-tl-[5px]'>
                            <h3 className='font-bold text-lg text-offBlue'>{tournament.status === "Finished" ? 'Results' : tournament.status === "Aborted" ? 'Aborted' : 'Prize Pool'}</h3>
                            {(tournament.status === "Open" || tournament.status === "Ongoing") && <div> {formatDateTime(tournament.startTime).time} / {formatDateTime(tournament.startTime).date} </div>}
                            {tournament.status === "Finished" && <div className='font-bold text-lg text-offBlue'>Prizes</div>}
                        </div>

                        {
                            tournament.status === "Finished" ?
                                <>
                                    {tournament.winners && tournament.winners.map((winner, index) => (
                                        <div key={index}>
                                            <div className='py-4 px-4 flex justify-between'>
                                                <h3 className='font-semibold text-md text-offBlue flex gap-2 items-center'>{index == 0 && <img src="/icons/firstTrophy.svg" alt="" />}{index == 1 && <img src="/icons/secondTrophy.svg" alt="" />}{index == 2 && <img src="/icons/thirdTrophy.svg" alt="" />}
                                                    <span>{winner}</span>
                                                </h3>

                                                <div className='flex gap-2 items-center'>{tournament.rewardType === "eg_coin" && <img className='' src="/icons/Coin.svg" alt="" />} {tournament.prizes[index]}</div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                                :
                                tournament.status === "Aborted" ?
                                    <>
                                        <div className='p-4 text-offBlue'>
                                            <p>This tournament has been aborted. This could be due to several reasons such as insufficient participants, technical issues, etc. </p>
                                            <p className='mt-2'>100% Joining fees of participants have been <strong className='text-primary'>refunded</strong>. Apologies for the inconvenience caused.</p>
                                        </div>
                                    </>
                                    :
                                    <>
                                        {tournament.prizes && tournament.prizes.map((prize, index) => (
                                            <div key={index}>
                                                {prize != 0 && <div className='py-4 px-4 flex justify-between'>
                                                    <h3 className='font-semibold text-md text-offBlue flex gap-2 items-center'>{index == 0 && <img src="/icons/firstTrophy.svg" alt="" />}{index == 1 && <img src="/icons/secondTrophy.svg" alt="" />}{index == 2 && <img src="/icons/thirdTrophy.svg" alt="" />} <span>{index + 1}<sup> {index == 0 && <>st</>}{index == 1 && <>nd</>}{index == 2 && <>rd</>}{index > 2 && <>th</>}</sup> Place</span></h3>
                                                    <div className='flex gap-2 items-center'>{tournament.rewardType === "eg_coin" && <img className='' src="/icons/Coin.svg" alt="" />} {prize}</div>
                                                </div>}
                                            </div>
                                        ))}
                                    </>
                        }



                        <div className="h-[1px] bg-black bg-opacity-25"></div>
                        {tournament.status == 'Open' && <div className='py-4 px-4 flex flex-col justify-between rounded-br-[5px] rounded-bl-[5px]'>
                            <div className="flex justify-between text-[14px] mb-1">
                                <label htmlFor="" >Participants Joined</label>
                                <label htmlFor=""><span>{tournament.participants.length}</span> / <span className='text-primary'>{tournament.max}</span></label>
                            </div>
                            <div className='bg-gray w-full h-2 rounded-lg'>
                                <div className={`bg-primary h-2 rounded-lg`} style={{ width: joinPercent + '%' }}></div>
                            </div>
                        </div>}
                        <div className='p-2 flex flex-col justify-between'>
                            {tournament.status == 'Open' && !joinStatus && <button onClick={handleJoinConfirmation} className='bg-primary text-secondary font-bold p-2 rounded-[5px]'>Join Now</button>}
                            {tournament.status == 'Open' && joinStatus &&
                                <div className=''>
                                    <div className='bg-openStatus text-secondary font-bold p-2 rounded-[5px] flex items-center justify-center gap-2'><span>Joined</span><FaCircleCheck /></div>
                                    <div onClick={handleExitConfirmation} className='flex cursor-pointer hover:text-red-500 transition-colors duration-200 font-semibold my-2 justify-center items-center gap-1 text-sm text-offBlue'><span>Exit from this tournament</span><span><BiSolidExit /></span></div>
                                </div>
                            }
                            {tournament.status == 'Ongoing' && <button disabled className='bg-ongoingStatus bg-opacity-50 text-secondary font-bold p-2 rounded-[5px]'>{tournament.status}</button>}
                            {tournament.status == 'Finished' && <button disabled className='bg-finishedStatus bg-opacity-50 text-secondary font-bold p-2 rounded-[5px]'>{tournament.status}</button>}
                            {tournament.status == 'Aborted' && <button disabled className='bg-abortedStatus bg-opacity-50 text-secondary font-bold p-2 rounded-[5px]'>{tournament.status}</button>}

                        </div>

                        {/* confirmation modal  */}
                        <Modal isVisible={joinConfirmationModal} onClose={() => setJoinConfirmationModal(false)}>
                            <div className='p-6 md:w-96 w-72'>
                                <p className='mt-4 flex justify-center'>It will cost you <span className='flex gap-1 justify-center mx-2'><img className='' src="/icons/Coin.svg" alt="" />{tournament.entryFee}</span></p>
                                <div className="flex w-full justify-evenly mt-7">
                                    <button onClick={() => setJoinConfirmationModal(false)} className='bg-transparent rounded-[3px] text-inactive border-[1px] border-inactive px-8 py-2 font-medium'>Cancel</button>
                                    <button onClick={handleFinalJoin} className='bg-primary rounded-[3px] text-secondary border-[1px] border-primary px-8 py-2 font-bold'>Join</button>
                                </div>
                            </div>

                        </Modal>


                        {/* exit confirmation modal  */}
                        <Modal isVisible={exitConfirmationModal} onClose={() => setExitConfirmationModal(false)}>
                            <div className='p-6 md:w-96 w-72'>
                                <p className='mt-4 flex flex-col gap-1 items-center'>
                                    <span> Are you sure?</span>
                                    {tournament.entryFee > 0 && <span className='mx-2 flex items-center gap-1'>You will get <img className='' src="/icons/Coin.svg" alt="" /> {Math.floor(tournament.entryFee * 0.90)} <span className='text-inactive'>(90% of entry fee)</span> as refund!</span>}
                                </p>
                                <div className="flex w-full justify-evenly mt-7">
                                    <button onClick={() => setExitConfirmationModal(false)} className='bg-transparent rounded-[3px] text-inactive border-[1px] border-inactive px-8 py-2 font-medium'>Cancel</button>
                                    <button onClick={handleFinalExitConfirmation} className='bg-primary rounded-[3px] text-secondary border-[1px] border-primary px-8 py-2 font-bold'>Confirm</button>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div >
        </>
    )
}
