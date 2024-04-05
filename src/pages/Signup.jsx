import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../custom.css'
import { IoMdClose } from "react-icons/io";
import { useAuth } from '../utils/AuthContext';
import { Alert } from '../components/Alert';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import ClipLoader  from 'react-spinners/ClipLoader';



export const Signup = () => {

  const [countryCheck, setCountryCheck] = useState(null)
  const fetchCountryFromIP = async () => {
    try {
      let cachedData = localStorage.getItem('userCountryData');
      if (cachedData) {
        cachedData = JSON.parse(cachedData);
        const { country, timestamp } = cachedData;
        const expirationTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        if (Date.now() - timestamp < expirationTime) {
          return country === 'NP'; // Check if country is Nepal
        } else {
          localStorage.removeItem('userCountryData'); // Remove expired data from storage
        }
      }
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      const country = data.country; // Get country code from API response
      cachedData = {
        country,
        timestamp: Date.now()
      };
      localStorage.setItem('userCountryData', JSON.stringify(cachedData));
      return country === 'NP'; // Check if country is Nepal
    } catch (error) {
      console.error('Error fetching IP address:', error);
      return false; // Default to false if there's an error
    }
  };

  useEffect(() => {
    fetchCountryFromIP().then(isUserFromNepal => {
      setCountryCheck(isUserFromNepal);
    });
  }, []); // Empty dependency array to run the effect once on component mount


  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    if (countryCheck !== null && countryCheck) {
      setLoading(true)
      await registerUser(userData);
      setLoading(false)
    }

  };

  const { registerUser } = useAuth();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  })


  const handleInputs = (event) => {
    event.preventDefault();
    setUserData((prevData) => ({
      ...prevData,
      [event.target.name]: String(event.target.value),
    }))

  }




  return (
    <>
      <div className="grid md:grid-cols-10 grid-cols-1 h-screen  text-offBlue">
        <div className="bg-[url('..\src\assets\EsportsBG4.jpg')] bg-cover bg-center md:flex flex-col lg:col-span-6 md:col-span-4 hidden items-center justify-end">
          <div className='relative bottom-[12%] text-center'>
            <h2 className='font-bold text-xl mb-4 flex flex-col lg:gap-6 gap-4'>WELCOME TO
              <br />
              <span className='font-extrabold lg:text-[68px] md:text-4xl text-primary'>Hamro Esports</span>
            </h2>
            <h3 className='mt-8 italic'>Nepal's <span className='text-primary'>#1</span> Esports Platform</h3>
            <div className="flex gap-2 justify-center mt-8">
              <svg className='' width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.943 0H2.99175C1.34194 0 0 1.34576 0 2.99997V20.9998C0 22.6542 1.34199 24 2.99175 24H20.943C22.5931 24 23.9351 22.6542 23.9351 20.9998V3.00003C23.9351 1.34576 22.5932 0 20.943 0Z" fill="#1B80E4" />
                <path d="M20.1952 12H16.4554V9.00001C16.4554 8.17192 17.1257 8.25012 17.9512 8.25012H19.4474V4.5H16.4554C13.9766 4.5 11.9677 6.51439 11.9677 9.00001V12H8.97583V15.7501H11.9677V24H16.4554V15.7501H18.6993L20.1952 12Z" fill="#FCFCFC" />
              </svg>
              <svg className='' width="26" height="25" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.6189 0H3.25122C1.97204 0 0.935059 1.03698 0.935059 2.31616V21.6838C0.935059 22.963 1.97204 24 3.25122 24H22.6189C23.8981 24 24.9351 22.963 24.9351 21.6838V2.31616C24.9351 1.03698 23.8981 0 22.6189 0Z" fill="#ED2524" />
                <path fillRule="evenodd" clipRule="evenodd" d="M15.6657 11.8272L11.2465 14.2144V10.5388V9.421L13.2405 10.5057L15.6657 11.8272ZM20.9516 8.58737C20.9516 8.58737 20.7953 7.41271 20.3027 6.89643C19.6822 6.21436 18.986 6.20963 18.6639 6.17174C16.3761 6.00122 12.9421 6.00122 12.9421 6.00122H12.9327C12.9327 6.00122 9.49869 6.00122 7.20621 6.17174C6.88886 6.20963 6.19259 6.21436 5.56737 6.89643C5.07951 7.41271 4.91846 8.58737 4.91846 8.58737C4.91846 8.58737 4.75269 9.97043 4.75269 11.3488V11.5193V12.6466C4.75269 14.0249 4.91846 15.408 4.91846 15.408C4.91846 15.408 5.07951 16.5826 5.56737 17.0989C6.19259 17.781 7.00727 17.7573 7.37199 17.8283C8.68401 17.961 12.9374 17.9989 12.9374 17.9989C12.9374 17.9989 16.3761 17.9941 18.6639 17.8236C18.986 17.781 19.6822 17.781 20.3027 17.0989C20.7953 16.5826 20.9516 15.408 20.9516 15.408C20.9516 15.408 21.1174 14.0249 21.1174 12.6466V11.5903V11.3488C21.1174 9.97043 20.9516 8.58737 20.9516 8.58737Z" fill="#FEFEFE" />
              </svg>
              <svg width="26" height="25" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.93506 0H21.9351C23.5851 0 24.9351 1.35 24.9351 3V21C24.9351 22.65 23.5851 24 21.9351 24H3.93506C2.28506 24 0.935059 22.65 0.935059 21V3C0.935059 1.35 2.28506 0 3.93506 0Z" fill="url(#paint0_linear_78_91)" />
                <path d="M16.8351 3.75H9.03506C6.63506 3.75 4.68506 5.775 4.68506 8.175V15.825C4.68506 18.225 6.63506 20.25 9.03506 20.25H16.8351C19.2351 20.25 21.1851 18.225 21.1851 15.825V8.175C21.1851 5.775 19.2351 3.75 16.8351 3.75ZM19.6851 15.675C19.6851 17.325 18.3351 18.75 16.6851 18.75H9.18506C7.53506 18.75 6.18506 17.325 6.18506 15.675V8.25C6.18506 6.6 7.46006 5.25 9.18506 5.25H16.6851C18.3351 5.25 19.6851 6.675 19.6851 8.325V15.675Z" fill="white" />
                <path d="M12.9352 7.80003C10.6102 7.72503 8.66018 9.60003 8.58518 11.925C8.51018 14.25 10.3852 16.2 12.7102 16.275C15.0352 16.35 16.9852 14.475 17.0602 12.15V12.075C17.1352 9.67503 15.2602 7.80003 12.9352 7.80003ZM12.9352 14.7C11.4352 14.7 10.1602 13.5 10.1602 12C10.1602 10.5 11.3602 9.22503 12.8602 9.22503C14.3602 9.22503 15.6352 10.425 15.6352 11.925V12C15.6352 13.5 14.4352 14.7 12.9352 14.7Z" fill="white" />
                <path d="M17.285 8.4749C17.7821 8.4749 18.185 8.03838 18.185 7.4999C18.185 6.96142 17.7821 6.5249 17.285 6.5249C16.788 6.5249 16.385 6.96142 16.385 7.4999C16.385 8.03838 16.788 8.4749 17.285 8.4749Z" fill="white" />
                <defs>
                  <linearGradient id="paint0_linear_78_91" x1="5.28768" y1="25.2456" x2="20.5824" y2="-1.2456" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FEC053" />
                    <stop offset="0.327" stopColor="#F2203E" />
                    <stop offset="0.648" stopColor="#B729A8" />
                    <stop offset="1" stopColor="#5342D6" />
                  </linearGradient>
                </defs>
              </svg>

            </div>
          </div>
        </div>

        {/* input fields section  */}

        <div className="bg-secondary flex flex-col lg:col-span-4 md:col-span-6 col-span-1 md:px-10 px-6 py-10">
          <div className="flex justify-end"><Link to={'/'}><IoMdClose className='text-xl' /></Link></div>
          <div className="flex md:hidden font-extrabold text-3xl text-primary justify-center my-1 mb-6">Hamro Esports</div>
          <h2 className='font-extrabold text-2xl'>Sign Up</h2>


          <div className="flex flex-col gap-3 mt-5">
            {!countryCheck && (
              <Alert type={"error"} message={"Your country is not yet supported! Please check back later :)"} />
            )}
            <div className="flex border-[0.8px] border-inactive rounded-[3px]">
              <div className='px-4 self-center'>
                <svg width="13" height="18.2" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.68116 4.52943C8.68116 3.43953 8.23921 2.45301 7.52576 1.73957C6.81153 1.02533 5.82501 0.583374 4.73511 0.583374C3.64521 0.583374 2.6587 1.02533 1.94447 1.73957C1.23102 2.45301 0.789062 3.43953 0.789062 4.52943C0.789062 5.61932 1.23102 6.60584 1.94447 7.31928C2.6587 8.03352 3.64521 8.47548 4.73511 8.47548C5.82501 8.47548 6.81153 8.03352 7.52576 7.31928C8.23921 6.60584 8.68116 5.61932 8.68116 4.52943Z" fill="#6C81A2" />
                  <path d="M0 12.4216C0 13.2108 1.77572 14 4.73526 14C7.5117 14 9.47052 13.2108 9.47052 12.4216C9.47052 10.8432 7.61272 9.26477 4.73526 9.26477C1.77572 9.26477 0 10.8432 0 12.4216Z" fill="#6C81A2" />
                </svg>
              </div>
              <input type="text" name='name' onChange={handleInputs} placeholder='Name' className='w-full rounded-[3px] bg-transparent outline-none border-l-[0.8px] border-inactive  p-3 placeholder:opacity-70' />
            </div>
            <div className="flex border-[0.8px] border-inactive rounded-[3px]">
              <div className='px-4 self-center'>
                <svg width="13" height="14" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.4 10.4H7.2V11.7H1.2V1.3H7.2V1.95H8.4V0H0V13H8.4V10.4Z" fill="#6C81A2" />
                  <path d="M5.4 9.75H3V11.05H5.4V9.75Z" fill="#6C81A2" />
                  <path d="M9.74405 8.44998H12V2.59998H4.80005V8.44998H6.60005V10.153L9.74405 8.44998Z" fill="#6C81A2" />
                </svg>
              </div>
              <input type="email" name="email" onChange={handleInputs} id="" placeholder='Email' className='w-full rounded-[3px] bg-transparent outline-none border-l-[0.8px] border-inactive  p-3 placeholder:opacity-70' />
            </div>
            <div className="flex border-[0.8px] border-inactive rounded-[3px]">
              <div className='px-4 self-center'>
                <svg width="10" height="15.5" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.26923 5.38462V2.87179C7.26923 2.11015 6.97747 1.3797 6.45814 0.841129C5.93881 0.302563 5.23445 0 4.5 0C3.76555 0 3.06119 0.302563 2.54186 0.841129C2.02253 1.3797 1.73077 2.11015 1.73077 2.87179C1.73077 3.06221 1.80371 3.24482 1.93354 3.37946C2.06337 3.5141 2.23947 3.58974 2.42308 3.58974C2.60669 3.58974 2.78278 3.5141 2.91261 3.37946C3.04245 3.24482 3.11538 3.06221 3.11538 2.87179C3.11538 2.49097 3.26126 2.12575 3.52093 1.85646C3.7806 1.58718 4.13278 1.4359 4.5 1.4359C4.86722 1.4359 5.21941 1.58718 5.47907 1.85646C5.73874 2.12575 5.88462 2.49097 5.88462 2.87179V5.38462H1.73077C1.27174 5.38462 0.831513 5.57372 0.506931 5.91032C0.182348 6.24692 0 6.70346 0 7.17949V12.2051C0 12.6812 0.182348 13.1377 0.506931 13.4743C0.831513 13.8109 1.27174 14 1.73077 14H7.26923C7.72826 14 8.16849 13.8109 8.49307 13.4743C8.81765 13.1377 9 12.6812 9 12.2051V7.17949C9 6.70346 8.81765 6.24692 8.49307 5.91032C8.16849 5.57372 7.72826 5.38462 7.26923 5.38462ZM5.19231 10.5682V10.7692C5.19231 10.9596 5.11937 11.1423 4.98954 11.2769C4.8597 11.4115 4.68361 11.4872 4.5 11.4872C4.31639 11.4872 4.1403 11.4115 4.01046 11.2769C3.88063 11.1423 3.80769 10.9596 3.80769 10.7692V10.5682C3.59842 10.4429 3.42442 10.263 3.30296 10.0464C3.18151 9.82974 3.11684 9.58392 3.11538 9.33333C3.11538 8.95251 3.26126 8.58728 3.52093 8.318C3.7806 8.04872 4.13278 7.89744 4.5 7.89744C4.86722 7.89744 5.21941 8.04872 5.47907 8.318C5.73874 8.58728 5.88462 8.95251 5.88462 9.33333C5.88316 9.58392 5.81849 9.82974 5.69704 10.0464C5.57558 10.263 5.40158 10.4429 5.19231 10.5682Z" fill="#6C81A2" />
                </svg>
              </div>
              <input type="password" name='password' onChange={handleInputs} placeholder='Create password' className='w-full rounded-[3px] bg-transparent outline-none border-l-[0.8px] border-inactive  p-3 placeholder:opacity-70' />
            </div>
            <div className="flex items-start my-2 text-sm">
              <input type="checkbox" name="" id="" className='bg-transparent cursor-pointer' />
              <p className='ml-2 -mt-1'>I'm at least 16 years of age and confirm to the <a href='#' className='text-primary underline underline-offset-4'>Terms & Conditions</a> and <a href='#' className='text-primary underline underline-offset-4'>Privacy Policy</a>.</p>
            </div>
            <button onClick={signUp} className='bg-primary w-full my-2 text-secondary font-bold text-lg py-2 rounded-[3px] flex items-center justify-center gap-2'><span>Sign Up</span>{loading && <ClipLoader size={22} color="#080F18" />}</button>
            <label htmlFor="" className='text-sm'>Already have an account? <Link to={'/login'} className='text-primary underline-offset-4 underline'>Login here</Link></label>
          </div>
        </div>
      </div>
    </>
  )
}




