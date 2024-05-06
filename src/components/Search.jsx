import React, { useState } from 'react'
import { FFSquareTournamentCard } from './FFComps/FFSquareTournamentCard'
import { GoSearch } from 'react-icons/go'
import { database, db_id } from '../../config/Appwrite'
import { Query } from 'appwrite'
import { toast } from 'react-toastify'
import LoadingBar from 'react-top-loading-bar'


export const Search = () => {

    const [progress, setProgress] = useState(0)

    const [searchData, setSearchData] = useState({
        'gameSelection': 'ff_tournaments',
        'searchQuery': ''
    })
    const handleSearchData = (e) => {
        e.preventDefault()
        setSearchData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const [tournaments, setTournaments] = useState([])

    const handleSearch = async () => {
        setProgress(70)
        try {
            const response = await database.listDocuments(db_id, searchData.gameSelection, [Query.equal('$id', searchData.searchQuery)])
            if (response.documents.length === 0) {
                try {
                    const titleResponse = await database.listDocuments(db_id, searchData.gameSelection, [Query.search('tournTitle', searchData.searchQuery), Query.orderDesc('$createdAt')])
                    setTournaments(titleResponse.documents)
                } catch (error) {
                    toast.error("Something went wrong!")
                }
            } else {
                setTournaments(response.documents);
            }
        } catch (error) {
            toast.error("Something went wrong!")
        }
        setProgress(100)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter')
            handleSearch()
    }

    return (
        <>
            <LoadingBar
                color='#F88B26'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <div className='md:w-[75vw] w-[90vw] h-[95vh] flex flex-col items-center md:px-6 p-3'>
                <div className="flex items-center mt-16 mb-10 md:w-[70%] w-[90%] rounded-3xl bg-secondaryLight h-12">
                    <select onChange={handleSearchData} name="gameSelection" id="" className='bg-transparent focus:outline-none text-offBlue md:mx-6 mx-1'>
                        <option value="ff_tournaments" className='bg-secondaryLight'>Free Fire</option>
                        {/* <option value="pubg_tournaments" className='bg-secondaryLight'>PUBG Mobile</option> */}
                    </select>
                    <span className='h-full w-[0.8px] bg-inactive bg-opacity-30'></span>
                    <div className="flex gap-2 items-center md:px-6 px-2 py-2 h-full w-full">
                        <input
                            onChange={handleSearchData}
                            name='searchQuery'
                            type="text"
                            className='bg-transparent text-offBlue focus:outline-none w-full placeholder:text-inactive'
                            placeholder='Tournament ID or Title'
                            onKeyDown={handleKeyPress} // Listen for Enter key press
                        />
                    </div>
                    <span className='h-full w-[0.8px] bg-inactive bg-opacity-20'></span>
                    <div onClick={handleSearch} className='md:px-6 px-2 hover:bg-frameBG h-full flex items-center cursor-pointer rounded-tr-3xl rounded-br-3xl transition-colors duration-200'><GoSearch className='text-lg text-inactive' /></div>
                </div>
                {/* search results here  */}
                {tournaments.length > 0 ?
                    <div className='overflow-auto mb-6 grid md:grid-cols-2 grid-cols-1 w-full gap-8 custom-scrollbar md:px-10 px-2'>
                        {tournaments.map((tournament, index) => (
                            <FFSquareTournamentCard key={index}
                                tournament={tournament}
                            />
                        ))}
                    </div>
                    :
                    <><div className='w-full h-64  flex justify-center items-center text-inactive'>
                        <div className='flex flex-col gap-3 items-center text-xl font-bold '>
                            No Results!
                        </div>
                    </div></>
                }
            </div>
        </>
    )
}
