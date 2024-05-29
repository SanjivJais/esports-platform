import React, { useEffect, useState } from 'react'
import { CiImageOff } from 'react-icons/ci';

export const CreateTournament = ({ onClose, gameID }) => {


    const [tournament, setTournament] = useState({
        
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



    return (
        <>
            <div className='h-[92vh] lg:w-[70vw] md:w-[80vw] w-[94vw] overflow-x-hidden custom-scrollbar'>
                <div className='lg:h-[40%] md:h-[36%] h-[34%] flex flex-col justify-between' style={{
                    backgroundImage: `url(${tournament.imgURL}`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>

                    {!tournament.imgURL && <CiImageOff className='self-center top-[45%] relative translate-y-[-50%] text-4xl text-inactive' />}

                    <div className='tournModalComponent-custom-gradient h-full flex flex-col justify-end items-start px-4'>
                        <div className="w-full">
                            <div className="flex justify-center md:gap-8 gap-4 md:text-base text-sm custom-scrollbar whitespace-nowrap overflow-x-auto">
                                <div onClick={(e) => handleTabs(e)} className={`tournTab ${activeTab === 0 ? 'md:border-b-2 md:border-primary md:text-offBlue text-primary' : 'text-inactive hover:text-offBlue'}  pb-2 font-semibold cursor-pointer`}>Step 1: Create Tournament</div>
                                <div onClick={(e) => handleTabs(e)} className={`tournTab ${activeTab === 1 ? 'md:border-b-2 md:border-primary md:text-offBlue text-primary' : 'text-inactive hover:text-offBlue'}  pb-2 font-semibold cursor-pointer`}>Step 2: Setup Bracket</div>
                                <div onClick={(e) => handleTabs(e)} className={`tournTab ${activeTab === 2 ? 'md:border-b-2 md:border-primary md:text-offBlue text-primary' : 'text-inactive hover:text-offBlue'}  pb-2 font-semibold cursor-pointer`}>Step 3: Create Matches</div>
                            </div>
                            <div className="h-[1px] bg-inactive bg-opacity-25 w-full"></div>
                        </div>
                    </div>
                </div>
                <div className='w-full px-4 py-6 flex md:flex-row flex-col gap-4'>
                    <div className="lg:w-[64%] md:w-[58%] flex flex-col">

                        {activeTab === 0 &&
                            <></>
                        }

                        {activeTab === 1 &&
                            <></>
                        }
                        {activeTab === 2 &&
                            <>

                            </>
                        }

                    </div>

                </div>
            </div>



        </>
    )
}
