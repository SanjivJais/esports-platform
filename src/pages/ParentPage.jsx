import { React, useState } from 'react'
import { Sidebar } from '../components/Sidebar'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { useAuth } from '../utils/AuthContext'
import LoadingBar from 'react-top-loading-bar'
import { toast } from 'react-toastify'

export const ParentPage = ({ Page }) => {

    const { user, userVerification } = useAuth();
    const [progress, setProgress] = useState(0);


    const [sideOpen, setSideopen] = useState(true)
    const [mobSideOpen, setMobSideopen] = useState(false)

    const toggleSidebar = () => {
        setSideopen(!sideOpen);
    }
    const mobToggleSidebar = () => {
        setMobSideopen(!mobSideOpen);
    }

    const sendVerificationMail = async () => {
        setProgress(50)
        await userVerification();
        setProgress(100)
        toast.success("Verification link sent to your email!")
    }

    return (
        <>
            <LoadingBar color='#F88B26' progress={progress} onLoaderFinished={() => setProgress(0)} />



            <div className='flex'>
                <Sidebar sideOpen={sideOpen} mobSideOpen={mobSideOpen} mobToggleSidebar={mobToggleSidebar} />
                <div className="flex flex-col w-full">
                    <Navbar toggleSidebar={toggleSidebar} mobToggleSidebar={mobToggleSidebar} />
                    <div className='mb-6 w-full max-w-[1600px] flex flex-col self-center'>
                        {!user.emailVerification && <div className="flex items-center px-6 py-3 bg-primary text-secondary font-medium">
                            Please&nbsp; <button onClick={sendVerificationMail} disabled={progress % 100 !== 0} className='underline underline-offset-2 decoration-dotted cursor-pointer font-semibold'>verify your email</button>&nbsp;to enjoy all features!
                        </div>}
                        {Page}
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

