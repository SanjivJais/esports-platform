import React from 'react'

export const SquareTournamentCard = ({gameTitle, imgURL}) => {
    return (
        <div className='w-96 h-auto rounded-[5px] border-[0.8px] border-inactive border-opacity-40 hover:shadow-card'>
            <div className={`flex flex-col justify-between bg-[url(${imgURL})] bg-cover rounded-[5px] rounded-br-none rounded-bl-none w-full h-52`}>
                <label htmlFor="Game Title" className='self-end bg-secondary h-fit bg-opacity-80 relative text-[12px] px-3 py-[3px] rounded-xl top-2 right-2 text-end'>{gameTitle}</label>
                <div className='bg-secondary bg-opacity-80 px-3 py-3'>
                    <div className="flex justify-between  text-[13px] mb-1">
                        <label htmlFor="" >Players Joined</label>
                        <label htmlFor=""><span>70</span> / <span className='text-primary'>100</span></label>
                    </div>
                    <div className='bg-gray w-full h-2 rounded-lg'>
                        <div className='bg-primary w-[70%] h-2 rounded-lg'></div>
                    </div>
                </div>
            </div>
            <div className="pt-4 pb-3 px-3 text-sm">
                <div className="flex justify-between">
                    <div>
                        <label htmlFor="" className='text-[12px] text-dimText'>ENTRY</label>
                        <div className='font-semibold'>Free Entry</div>
                    </div>
                    <div>
                        <label htmlFor="" className='text-[12px] text-dimText'>MODE</label>
                        <div className='font-semibold'>BR - Solo</div>
                    </div>
                    <div>
                        <label htmlFor="" className='text-[12px] text-dimText'>MIN/MAX</label>
                        <div className='font-semibold'>80 / 100</div>
                    </div>
                    <div>
                        <label htmlFor="" className='text-[12px] text-dimText'>REWARDS</label>
                        <div className='font-semibold flex items-center gap-1'><img className='' src="\src\assets\Coin.svg" alt="" />20</div>
                    </div>
                </div>
                <div className="h-[1px] bg-inactive bg-opacity-40 my-4"></div>
                <div className="flex justify-between">
                    <div>
                        <label htmlFor="" className='text-[12px] text-dimText'>STARTING</label>
                        <div className='font-semibold flex gap-2'><span>May 2, 2024</span> <span>.</span> <span>3:00 PM</span></div>
                    </div>
                    <button className='bg-primary px-5 py-2 text-secondary rounded-[5px] font-bold '>View Details</button>
                </div>

            </div>
        </div>
    )
}
