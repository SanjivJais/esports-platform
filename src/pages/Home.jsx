import React from 'react'
import { SquareTournamentCard } from '../components/SquareTournamentCard'

export const Home = () => {
  return (
    <div className='p-6 flex justify-center w-full'>
      <div className="grid grid-cols-3 gap-6">

        <SquareTournamentCard gameTitle={"PUBG Mobile"} imgURL={"https://i.pinimg.com/originals/95/da/12/95da1295673f2bd19a23f3b61ea240a9.jpg"} />
        <SquareTournamentCard gameTitle={"Free Fire"} imgURL={"https://i.pinimg.com/originals/95/da/12/95da1295673f2bd19a23f3b61ea240a9.jpg"} />
        <SquareTournamentCard gameTitle={"Clash of Clans"} imgURL={"https://i.pinimg.com/originals/95/da/12/95da1295673f2bd19a23f3b61ea240a9.jpg"} />
      </div>

    </div>
  )
}
