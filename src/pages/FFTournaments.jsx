import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FFSquareTournamentCard } from '../components/FFComps/FFSquareTournamentCard'
import LoadingBar from 'react-top-loading-bar'
import { Helmet } from 'react-helmet'
import { ID, database, db_id } from '../../config/Appwrite';
import { useAuth } from '../utils/AuthContext'
import { Query } from 'appwrite'
import { toast } from 'react-toastify'


export const FFTournaments = () => {
  const { user } = useAuth()
  const [progress, setProgress] = useState(0)
  // useEffect(() => {
  //   setProgress(70)
  //   setTimeout(() => {
  //     setProgress(100)
  //   }, 1000)
  // }, [])

  // fetching tournament data
  const [FFtournaments, setFFtournaments] = useState([])
  useEffect(() => {
    setProgress(30)
    const fetchTournaments = async () => {
      try {
        const response = await database.listDocuments(db_id, 'ff_tournaments', [])
        setFFtournaments(response.documents)
        setProgress(60)
      } catch (error) {
        toast.error("An error occurred")
      }
    }
    fetchTournaments()
    setProgress(100)
  }, [])

  // useEffect(() => {
  //   if (FFtournaments)
  //     console.log(FFtournaments);
  // }, [FFtournaments])

  // const FFtournaments = [
  //   {
  //     id: 'op23no90284#nod00',
  //     gameTitle: 'Free Fire',
  //     imgURL: 'https://freefiremobile-a.akamaihd.net/common/web_event/official2.ff.garena.all/img/20228/50dbb24bb2ec17afbcb45f40f37ef414.jpg',
  //     tournTitle: 'EG Summar Clash #1',
  //     max: 48,
  //     min: 25,
  //     joined: 30,
  //     entryFee: 10,
  //     gameMode: 'Clash Squad',
  //     teamType: 'Squad',
  //     rewardType: 'eg_coin',
  //     firstPrize: 70,
  //     secondPrize: 20,
  //     thirdPrize: 10,
  //     startDate: 'May 3, 2024',
  //     startTime: '2:00 PM',
  //     host: 'EsportsGravity',
  //     status: 'Open',
  //     roomID: '',
  //     roomPass: '',
  //     ytLiveURL: '',
  //     // watchLiveURL2: '',
  //     rulesDetails: '',
  //   },
  //   {
  //     id: 'cwvweei829bjkb79',
  //     gameTitle: 'Free Fire',
  //     imgURL: 'https://dl.dir.freefiremobile.com/common/web_event/official2.ff.garena.all/202210/0b8cb561ac88828c2d09bb7d86158255.jpg',
  //     tournTitle: 'EG Summar Clash #1',
  //     max: 48,
  //     min: 30,
  //     joined: 10,
  //     entryFee: 20,  // 0 for Free Entry OR some value for entry fee
  //     gameMode: 'BR',
  //     teamType: 'Solo',
  //     rewardType: 'eg_coin', // "coin"
  //     firstPrize: 250,
  //     secondPrize: 20,
  //     thirdPrize: 10,
  //     startDate: 'May 2, 2024',
  //     startTime: '3:00 PM',
  //     host: 'EsportsGravity',
  //     status: 'Open', // "Open" or "Closed"
  //     roomID: '98987537',
  //     roomPass: '8269418',
  //     ytLiveURL: 'https://www.youtube.com/watch?v=ncTquQE0kuk',
  //     // watchLiveURL2: '',
  //     rulesDetails: `
  //     <section class="rules-details">
  //     <h2>Rules and Details</h2>

  //     <h3>General Rules</h3>
  //     <ul>
  //         <li>All participants must adhere to fair play principles and refrain from using any cheats, hacks, or exploits in-game.</li>
  //         <li>Participants must join the match lobby within the specified time frame. A maximum delay of 3 minutes will be allowed before disqualification.</li>
  //         <li>Players are responsible for ensuring their game settings are configured correctly to avoid any technical issues during the tournament.</li>
  //         <li>Respect other participants and tournament staff. Any form of harassment, abuse, or disruptive behavior will not be tolerated.</li>
  //     </ul>

  //     <h3>Tournament Format</h3>
  //     <p>This is a one-match tournament. The match is scheduled in advance, and participants can see details regarding match timings and lobby details.</p>

  //     <h3>Prizes and Rewards</h3>
  //     <p>Winning teams or players will receive prizes based on their performance. Prizes may include in-game currency, merchandise, or cash rewards.</p>

  //     <h3>Disqualification Criteria</h3>
  //     <p>Participants may be disqualified for the following reasons:</p>
  //     <ul>
  //         <li>Repeated violation of tournament rules.</li>
  //         <li>Failure to comply with match schedules or delays exceeding the allowed time limit.</li>
  //         <li>Unsportsmanlike conduct or disruptive behavior.</li>
  //         <li>Using unauthorized software or tools during matches.</li>
  //     </ul>

  //     <h3>Disclaimer</h3>
  //     <p>The tournament organizers reserve the right to modify rules, disqualify participants, or make decisions based on unforeseen circumstances. All participants are expected to abide by the rules and decisions made by the tournament organizers.</p>
  //     </section>
  //     `,
  //   },

  //   {
  //     id: 'op23no90284#nod00',
  //     gameTitle: 'Free Fire',
  //     imgURL: 'https://dl.dir.freefiremobile.com/common/web_event/official2.ff.garena.all/202210/55b3ad30807b60a84bf9890b9cbdaf70.jpg',
  //     tournTitle: 'EG Summar Clash #1',
  //     max: 48,
  //     min: 25,
  //     joined: 40,
  //     entryFee: 10,
  //     gameMode: 'Clash Squad',
  //     teamType: 'Squad',
  //     rewardType: 'eg_coin',
  //     firstPrize: 70,
  //     secondPrize: 20,
  //     thirdPrize: 10,
  //     startDate: 'May 3, 2024',
  //     startTime: '2:00 PM',
  //     host: 'EsportsGravity',
  //     status: 'Closed',
  //     roomID: '',
  //     roomPass: '',
  //     ytLiveURL: '',
  //     // watchLiveURL2: '',
  //     rulesDetails: '',
  //   },
  //   {
  //     id: 'op23no90284#nod00',
  //     gameTitle: 'Free Fire',
  //     imgURL: 'https://freefiremobile-a.akamaihd.net/common/web_event/official2.ff.garena.all/img/20228/fca500d29fb030c194fa14904ed2de1a.jpg',
  //     tournTitle: 'EG Summar Clash #1',
  //     max: 48,
  //     min: 25,
  //     joined: 30,
  //     entryFee: 10,
  //     gameMode: 'Clash Squad',
  //     teamType: 'Squad',
  //     rewardType: 'eg_coin',
  //     firstPrize: 70,
  //     secondPrize: 20,
  //     thirdPrize: 10,
  //     startDate: 'May 3, 2024',
  //     startTime: '2:00 PM',
  //     host: 'EsportsGravity',
  //     status: 'Open',
  //     roomID: '',
  //     roomPass: '',
  //     ytLiveURL: '',
  //     // watchLiveURL2: '',
  //     rulesDetails: '',
  //   },
  //   {
  //     id: 'op23no90284#nod00',
  //     gameTitle: 'Free Fire',
  //     imgURL: 'https://freefiremobile-a.akamaihd.net/common/web_event/official2.ff.garena.all/img/20228/9f72d23636bc8b9188a21fb62a0d3742.jpg',
  //     tournTitle: 'EG Summar Clash #1',
  //     max: 48,
  //     min: 25,
  //     joined: 40,
  //     entryFee: 10,
  //     gameMode: 'Clash Squad',
  //     teamType: 'Squad',
  //     rewardType: 'eg_coin',
  //     firstPrize: 70,
  //     secondPrize: 20,
  //     thirdPrize: 10,
  //     startDate: 'May 3, 2024',
  //     startTime: '2:00 PM',
  //     host: 'EsportsGravity',
  //     status: 'Closed',
  //     roomID: '',
  //     roomPass: '',
  //     ytLiveURL: '',
  //     // watchLiveURL2: '',
  //     rulesDetails: '',
  //   },

  // ]



  return (
    <>
      <LoadingBar
        color='#F88B26'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Helmet>
        <title>Free Fire Tournaments - EsportsGravity</title>
        <meta name="description" content="Join Free Fire tournaments and matches and win deserving prizes." />
      </Helmet>

      <div className='flex flex-col items-center'>
        <div className='flex flex-col justify-end h-72 w-full bg-[url("/images/free-fire-criminal-bundle-bg.jpg")] bg-cover bg-top'>
          <div className='bg-gradient-to-t from-frameBG to-transparent bg-cover h-full px-6 w-full'></div>
        </div>
        <div className='w-full max-w-[1280px] px-6 self-center flex flex-col'>
          <div className="flex -mt-20 w-full">
            <div className='md:h-44 h-32 w-36 rounded-[5px] bg-[url("/images/FF_DP.jpg")] bg-cover bg-center'></div>
            <div className="flex flex-col ml-4 self-end w-full">
              <h3 className='font-bold md:text-4xl text-2xl text-offWhite'>Garena Free Fire</h3>
              <div className="grid md:grid-cols-5 grid-cols-2 md:gap-4 gap-2 mt-4">
                <div className="flex flex-col col-span-1">
                  <label htmlFor="" className='text-inactive text-sm mb-2 font-semibold'>Entry Fee</label>
                  <select name="entry_fee_drop" id="" className='custom-dropdown'>
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
                <div className="flex flex-col col-span-1">
                  <label htmlFor="" className='text-inactive text-sm mb-2 font-semibold'>Game Mode</label>
                  <select name="game_mode" id="" className='custom-dropdown'>
                    <option value="battle_royale">Battle Royale</option>
                    <option value="clash_squad">Clash Squad</option>
                  </select>
                </div>
                <div className="flex flex-col col-span-1">
                  <label htmlFor="" className='text-inactive text-sm mb-2 font-semibold'>Team Type</label>
                  <select name="team_type" id="" className='custom-dropdown'>
                    <option value="solo">Solo</option>
                    <option value="duo">Duo</option>
                    <option value="squad">Squad</option>
                  </select>
                </div>
                <div className="flex flex-col col-span-1">
                  <label htmlFor="" className='text-inactive text-sm mb-2 font-semibold'>Status</label>
                  <select name="status" id="" className='custom-dropdown'>
                    <option value="open">Open</option>
                    <option value="full">Full</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div className="flex flex-col justify-end col-span-1">
                  <button className='bg-primary text-secondary font-extrabold px-4 py-[9px] rounded-[5px]'>Filter</button>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[0.8px] bg-inactive bg-opacity-20 my-10"></div>

          {/* all tournament cards here  */}
          <div className="w-full grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mb-3 content-center">
            {FFtournaments && FFtournaments.map((tournament, index) => (
              <FFSquareTournamentCard key={index}
                tournament={tournament}
              />
            ))}

          </div>
        </div>
      </div>
    </>

  )
}
