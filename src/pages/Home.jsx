import React from 'react'
import { SquareTournamentCard } from '../components/SquareTournamentCard'
import { Slider } from '../components/Slider'

export const Home = () => {
  const tournaments = [
    {
      gameTitle: 'Free Fire',
      imgURL: 'https://dl.dir.freefiremobile.com/common/web_event/official2.ff.garena.all/202210/0b8cb561ac88828c2d09bb7d86158255.jpg',
      maxPlayers: 48,
      minPlayers: 30,
      joinedPlayers: 10,
      entryFree: 20,  // 0 for Free Entry OR some value for entry fee
      gameMode: 'BR',
      gameType: 'Solo',
      rewardType: 'coin', // "coin"
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
      watchLiveURL2: '',
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
      gameTitle: 'PUBG Mobile',
      imgURL: 'https://i.pinimg.com/originals/95/da/12/95da1295673f2bd19a23f3b61ea240a9.jpg',
      maxPlayers: 100,
      minPlayers: 80,
      joinedPlayers: 90,
      entryFree: 0,
      gameMode: 'BR',
      gameType: 'Squad',
      rewardType: 'coin',
      firstPrize: 50,
      secondPrize: 20,
      thirdPrize: 0,
      startDate: 'May 4, 2024',
      startTime: '3:30 PM',
      host: 'EsportsGravity',
      status: 'Closed',
      roomID: '',
      roomPass: '',
      ytLiveURL: 'https://www.youtube.com/watch?v=5x8vvKlwWsU&t=3s',
      watchLiveURL2: '',
      rulesDetails: '',
    },
    {
      gameTitle: 'Free Fire',
      imgURL: 'https://dl.dir.freefiremobile.com/common/web_event/official2.ff.garena.all/202210/0b8cb561ac88828c2d09bb7d86158255.jpg',
      maxPlayers: 48,
      minPlayers: 25,
      joinedPlayers: 30,
      entryFree: 10,
      gameMode: 'Clash Squad',
      gameType: 'Squad',
      rewardType: 'coin',
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
      watchLiveURL2: '',
      rulesDetails: '',
    },
    {
      gameTitle: 'PUBG Mobile',
      imgURL: 'https://w0.peakpx.com/wallpaper/189/508/HD-wallpaper-pubg-squad.jpg',
      maxPlayers: 100,
      minPlayers: 80,
      joinedPlayers: 90,
      entryFree: 0,
      gameMode: 'BR',
      gameType: 'Squad',
      rewardType: 'coin',
      firstPrize: 50,
      secondPrize: 20,
      thirdPrize: 10,
      startDate: 'May 4, 2024',
      startTime: '3:30 PM',
      host: 'EsportsGravity',
      status: 'Open',
      roomID: '',
      roomPass: '',
      ytLiveURL: '',
      watchLiveURL2: '',
      rulesDetails: '',
    },

  ]

  return (
    <div className='py-4 flex flex-col items-center w-full'>
      <div className='mb-2 w-full'><Slider /></div>
      <div className="h-[0.8px] bg-inactive bg-opacity-20 w-full"></div>
      <div className="grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-6">
        {tournaments && tournaments.map((tournament, index) => (
          <SquareTournamentCard key={index}
            tournament={tournament}
          />
        ))}
      </div>
    </div>
  )
}
