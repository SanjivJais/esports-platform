import React, { useState } from 'react'
import { GoSearch } from 'react-icons/go'
import { database, db_id } from '../../config/Appwrite'
import { Query } from 'appwrite'
import { toast } from 'react-toastify'
import LoadingBar from 'react-top-loading-bar'
import { TournCard } from './Tournament/TournCard'


export const Search = () => {

    const [progress, setProgress] = useState(0)

    const [searchData, setSearchData] = useState({
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
            const response = await database.listDocuments(db_id, 'tournaments', [Query.equal('$id', searchData.searchQuery)])
            if (response.documents.length === 0) {
                try {
                    const titleResponse = await database.listDocuments(db_id, 'tournaments', [Query.search('tournTitle', searchData.searchQuery), Query.orderDesc('$createdAt')])
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

            <div className='h-[94vh] w-[98vw] flex flex-col items-center md:px-6 p-3'>
                <h2 className='my-8 font-semibold text-xl text-offBlue'>Search Tournaments</h2>
                <div className="flex items-center mb-10 md:w-[70%] w-[90%] rounded-3xl bg-secondaryLight h-12">
                    <div className="flex gap-2 items-center md:px-6 px-2 py-2 h-full w-full">
                        <input
                            onChange={handleSearchData}
                            name='searchQuery'
                            type="text"
                            className='bg-transparent text-offBlue focus:outline-none w-full placeholder:text-inactive'
                            placeholder='Tournament Code or Title'
                            onKeyDown={handleKeyPress} // Listen for Enter key press
                        />
                    </div>
                    <span className='h-full w-[0.8px] bg-inactive bg-opacity-20'></span>
                    <div onClick={handleSearch} className='md:px-6 px-2 hover:bg-frameBG h-full flex items-center cursor-pointer rounded-tr-3xl rounded-br-3xl transition-colors duration-200'><GoSearch className='text-lg text-inactive' /></div>
                </div>
                {/* search results here  */}

                {tournaments.length > 0 ?
                    <div className="w-full max-w-[1280px] grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 content-center pb-4">

                        {tournaments.map((tournament, index) => (
                            <TournCard key={index}
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
