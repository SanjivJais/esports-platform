import React from 'react'
import { SquareTournamentCard } from '../components/SquareTournamentCard'

export const Home = () => {
  const tournaments = [
    {
      gameTitle: 'Free Fire',
      imgURL: 'https://lh3.googleusercontent.com/proxy/T3X_yIUe0gd7vg5RZBzXU08_7vN6a2xtPdr4W6Rtd5CXUfN8Rv2Rcjh3ym0UfmNmRBqTXIuAbvkPWJyC0_NdAJ13lFfb8TXR89RBWyFd7QSsa81nn4u7XcQvJZL2cHJuEOEq8N9ByH_YNqDGQA',
      maxPlayers: 48,
      minPlayers: 30,
      joinedPlayers: 10,
      entryFree: 20,
      gameMode: 'BR - Squad',
      rewardType: 'coin',
      rewardAmount: 250,
      startDate: 'May 2, 2024',
      startTime: '3:00 PM',
    },
    {
      gameTitle: 'PUBG Mobile',
      imgURL: 'https://i.pinimg.com/originals/95/da/12/95da1295673f2bd19a23f3b61ea240a9.jpg',
      maxPlayers: 100,
      minPlayers: 80,
      joinedPlayers: 90,
      entryFree: 0,
      gameMode: 'BR - Solo',
      rewardType: 'coin',
      rewardAmount: 50,
      startDate: 'May 4, 2024',
      startTime: '3:30 PM',

    },
    {
      gameTitle: 'Free Fire',
      imgURL: 'https://dl.dir.freefiremobile.com/common/web_event/official2.ff.garena.all/202210/0b8cb561ac88828c2d09bb7d86158255.jpg',
      maxPlayers: 48,
      minPlayers: 25,
      joinedPlayers: 30,
      entryFree: 10,
      gameMode: 'BR - Solo',
      rewardType: 'coin',
      rewardAmount: 70,
      startDate: 'May 3, 2024',
      startTime: '2:00 PM',
    },
    
  ]

  return (
    <div className='p-6 flex flex-col items-center w-full'>
      <div className="grid grid-cols-3 gap-8">
        {tournaments && tournaments.map((tournament, index) => (
          <SquareTournamentCard key={index}
            gameTitle={tournament.gameTitle}
            imgURL={tournament.imgURL}
            minPlayers={tournament.minPlayers}
            maxPlayers={tournament.maxPlayers}
            joinedPlayers={tournament.joinedPlayers}
            entryFree={tournament.entryFree}
            gameMode={tournament.gameMode}
            rewardType={tournament.rewardType}
            rewardAmount={tournament.rewardAmount}
            startDate={tournament.startDate}
            startTime={tournament.startTime}
          />
        ))}
      </div>
    </div>
  )
}
