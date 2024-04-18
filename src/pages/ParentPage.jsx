import { React, useState } from 'react'
import { Sidebar } from '../components/Sidebar'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export const ParentPage = ({ Page }) => {

    const [sideOpen, setSideopen] = useState(true)
    const [mobSideOpen, setMobSideopen] = useState(false)

    const toggleSidebar = () => {
        setSideopen(!sideOpen);
    }
    const mobToggleSidebar = () => {
        setMobSideopen(!mobSideOpen);
    }

    return (
        <>
            <div className='flex'>
                <Sidebar sideOpen={sideOpen} mobSideOpen={mobSideOpen} mobToggleSidebar={mobToggleSidebar} />
                <div className="flex flex-col w-full">
                    <Navbar toggleSidebar={toggleSidebar} mobToggleSidebar={mobToggleSidebar} />
                    <div className='mb-6 max-w-[1280px] self-center'>
                        {Page}
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

