import React from 'react'
import { SquareTournamentCard } from '../components/SquareTournamentCard'

export const Home = () => {
  const tournaments = [
    {
      gameTitle: 'Free Fire',
      imgURL: 'https://dl.dir.freefiremobile.com/common/web_event/official2.ff.garena.all/202210/0b8cb561ac88828c2d09bb7d86158255.jpg',
      maxPlayers: 48,
      minPlayers: 30,
      joinedPlayers: 10,
      entryFree: 20,
      gameMode: 'BR',
      gameType: 'Solo',
      rewardType: 'coin',
      firstPrize: 250,
      secondPrize: 20,
      thirdPrize: 10,
      startDate: 'May 2, 2024',
      startTime: '3:00 PM',
      host: 'EsportsGravity',
      status: 'Open',
      roomID: '98987537',
      roomPass: '8269418',
      ytLiveURL: 'https://www.youtube.com/watch?v=ncTquQE0kuk',
      watchLiveURL2: '',
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
      status: 'Open',
      roomID: '',
      roomPass: '',
      ytLiveURL: 'https://www.youtube.com/watch?v=5x8vvKlwWsU&t=3s',
      watchLiveURL2: '',
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
    },

  ]

  return (
    <div className='p-6 flex flex-col items-center w-full'>
      <div className="grid grid-cols-3 gap-8">
        {tournaments && tournaments.map((tournament, index) => (
          <SquareTournamentCard key={index}
            tournament={tournament}
          // gameTitle={tournament.gameTitle}
          // imgURL={tournament.imgURL}
          // minPlayers={tournament.minPlayers}
          // maxPlayers={tournament.maxPlayers}
          // joinedPlayers={tournament.joinedPlayers}
          // entryFree={tournament.entryFree}
          // gameMode={tournament.gameMode}
          // rewardType={tournament.rewardType}
          // rewardAmount={tournament.rewardAmount}
          // startDate={tournament.startDate}
          // startTime={tournament.startTime}
          />
        ))}
      </div>
    </div>
  )
}
