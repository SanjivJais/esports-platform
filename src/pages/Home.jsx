import React from 'react'
import { FFSquareTournamentCard } from '../components/FFComps/FFSquareTournamentCard'
import { PubgSquareTournamentCard } from '../components/PUBGComps/PubgSquareTournamentCard'
import { Slider } from '../components/Slider'
import { FaTrophy } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export const Home = () => {
  const FFtournaments = [
    {
      id: 'op23no90284#nod00',
      gameTitle: 'Free Fire',
      imgURL: 'https://freefiremobile-a.akamaihd.net/common/web_event/official2.ff.garena.all/img/20228/50dbb24bb2ec17afbcb45f40f37ef414.jpg',
      tournTitle:'EG Summar Clash #1',
      max: 48,
      min: 25,
      joined: 30,
      entryFee: 10,
      gameMode: 'Clash Squad',
      teamType: 'Squad',
      rewardType: 'eg_coin',
      firstPrize: 70,
      secondPrize: 20,
      thirdPrize: 10,
      startDate: 'May 3, 2024',
      startTime: '2:00 PM',
      host: 'EsportsGravity',
      status: 'Open',
      roomID: '',
      roomPass: '',
      ytLiveURL: '',
      // watchLiveURL2: '',
      rulesDetails: '',
    },
    {
      id: 'cwvweei829bjkb79',
      gameTitle: 'Free Fire',
      imgURL: 'https://dl.dir.freefiremobile.com/common/web_event/official2.ff.garena.all/202210/0b8cb561ac88828c2d09bb7d86158255.jpg',
      tournTitle:'EG Summar Clash #1',
      max: 48,
      min: 30,
      joined: 10,
      entryFee: 20,  // 0 for Free Entry OR some value for entry fee
      gameMode: 'BR',
      teamType: 'Solo',
      rewardType: 'eg_coin', // "eg_coin" or "token"
      firstPrize: 250,
      secondPrize: 20,
      thirdPrize: 10,
      startDate: 'May 2, 2024',
      startTime: '3:00 PM',
      host: 'EsportsGravity',
      status: 'Open', // "Open" or "Closed"
      roomID: '98987537',
      roomPass: '8269418',
      ytLiveURL: 'https://www.youtube.com/watch?v=ncTquQE0kuk',
      // watchLiveURL2: '',
      rulesDetails: `
      <section class="rules-details">
      <h2>Rules and Details</h2>

      <h3>General Rules</h3>
      <ul>
          <li>All participants must adhere to fair play principles and refrain from using any cheats, hacks, or exploits in-game.</li>
          <li>Participants must join the match lobby within the specified time frame. A maximum delay of 3 minutes will be allowed before disqualification.</li>
          <li>Players are responsible for ensuring their game settings are configured correctly to avoid any technical issues during the tournament.</li>
          <li>Respect other participants and tournament staff. Any form of harassment, abuse, or disruptive behavior will not be tolerated.</li>
      </ul>

      <h3>Tournament Format</h3>
      <p>This is a one-match tournament. The match is scheduled in advance, and participants can see details regarding match timings and lobby details.</p>

      <h3>Prizes and Rewards</h3>
      <p>Winning teams or players will receive prizes based on their performance. Prizes may include in-game currency, merchandise, or cash rewards.</p>

      <h3>Disqualification Criteria</h3>
      <p>Participants may be disqualified for the following reasons:</p>
      <ul>
          <li>Repeated violation of tournament rules.</li>
          <li>Failure to comply with match schedules or delays exceeding the allowed time limit.</li>
          <li>Unsportsmanlike conduct or disruptive behavior.</li>
          <li>Using unauthorized software or tools during matches.</li>
      </ul>

      <h3>Disclaimer</h3>
      <p>The tournament organizers reserve the right to modify rules, disqualify participants, or make decisions based on unforeseen circumstances. All participants are expected to abide by the rules and decisions made by the tournament organizers.</p>
      </section>
      `,
    },
    
    {
      id: 'op23no90284#nod00',
      gameTitle: 'Free Fire',
      imgURL: 'https://freefiremobile-a.akamaihd.net/common/web_event/official2.ff.garena.all/img/20228/9f72d23636bc8b9188a21fb62a0d3742.jpg',
      tournTitle:'EG Summar Clash #1',
      max: 48,
      min: 25,
      joined: 40,
      entryFee: 10,
      gameMode: 'Clash Squad',
      teamType: 'Squad',
      rewardType: 'eg_coin',
      firstPrize: 70,
      secondPrize: 20,
      thirdPrize: 10,
      startDate: 'May 3, 2024',
      startTime: '2:00 PM',
      host: 'EsportsGravity',
      status: 'Closed',
      roomID: '',
      roomPass: '',
      ytLiveURL: '',
      // watchLiveURL2: '',
      rulesDetails: '',
    },
  ]

  const PUBGtournaments = [
    {
      id: 'biwoifh32##nco',
      gameTitle: 'PUBG Mobile',
      imgURL: 'https://i.pinimg.com/originals/95/da/12/95da1295673f2bd19a23f3b61ea240a9.jpg',
      tournTitle:'EG Summar Clash #1',
      max: 100,
      min: 80,
      joined: 90,
      entryFee: 0,
      gameMode: 'BR',
      teamType: 'Squad',
      rewardType: 'eg_coin',
      firstPrize: 50,
      secondPrize: 20,
      thirdPrize: 0,
      startDate: 'May 4, 2024',
      startTime: '3:30 PM',
      host: 'EsportsGravity',
      status: 'Open',
      roomID: '',
      roomPass: '',
      ytLiveURL: 'https://www.youtube.com/watch?v=5x8vvKlwWsU&t=3s',
      // watchLiveURL2: '',
      rulesDetails: '',
    },
    {
      id: 'iwef67jbo#bui',
      gameTitle: 'PUBG Mobile',
      imgURL: 'https://w0.peakpx.com/wallpaper/189/508/HD-wallpaper-pubg-squad.jpg',
      tournTitle:'EG Summar Clash #1',
      max: 100,
      min: 80,
      joined: 90,
      entryFee: 0,
      gameMode: 'BR',
      teamType: 'Squad',
      rewardType: 'eg_coin',
      firstPrize: 50,
      secondPrize: 20,
      thirdPrize: 10,
      startDate: 'May 4, 2024',
      startTime: '3:30 PM',
      host: 'EsportsGravity',
      status: 'Closed',
      roomID: '',
      roomPass: '',
      ytLiveURL: '',
      // watchLiveURL2: '',
      rulesDetails: '',
    },
    {
      id: 'iwef67jbo#bui',
      gameTitle: 'PUBG Mobile',
      imgURL: 'https://images.hdqwalls.com/wallpapers/pubg-2023-5k-65.jpg',
      tournTitle:'EG Summar Clash #1',
      max: 100,
      min: 80,
      joined: 75,
      entryFee: 60,
      gameMode: 'BR',
      teamType: 'Squad',
      rewardType: 'eg_coin',
      firstPrize: 510,
      secondPrize: 200,
      thirdPrize: 100,
      startDate: 'May 4, 2024',
      startTime: '3:30 PM',
      host: 'EsportsGravity',
      status: 'Closed',
      roomID: '',
      roomPass: '',
      ytLiveURL: '',
      // watchLiveURL2: '',
      rulesDetails: '',
    },
  ]

  return (
    <div className='py-4 px-4 flex flex-col items-center self-center w-full max-w-[1440px]'>
      <div className='mb-2 w-full'><Slider /></div>
      <div className="h-[0.8px] bg-inactive bg-opacity-20 w-full"></div>
      <div className="flex justify-between items-center mt-6 w-full self-start"><span className='flex items-center gap-2 font-semibold md:text-[24px] text-xl text-offBlue'><FaTrophy /><h3>Free Fire Tournaments</h3></span><Link to={'/tournaments/freefire'} className='text-primary text-sm'>View All »</Link></div>
      <div className="w-full grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 my-4 content-center">
        {FFtournaments && FFtournaments.map((tournament, index) => (
          <FFSquareTournamentCard key={index}
            tournament={tournament}
          />
        ))}
      </div>
      {/* promotional banner homepage  */}
      <div className='h-[120px] w-full mt-4 bg-[url("/images/promotionalBanner1.png")] bg-cover bg-left rounded-[5px]'></div>

      <div className="flex justify-between items-center mt-6 w-full self-start"><span className='flex items-center gap-2 font-semibold md:text-[24px] text-xl text-offBlue'><FaTrophy /><h3>PUBG Tournaments</h3></span><Link to={'/tournaments/pubg'} className='text-primary text-sm'>View All »</Link></div>
      <div className="w-full grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 my-4 content-center">
        {PUBGtournaments && PUBGtournaments.map((tournament, index) => (
          <PubgSquareTournamentCard key={index}
            tournament={tournament}
          />
        ))}
      </div>
    </div>
  )
}
