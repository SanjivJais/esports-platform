import { useContext, useState, useEffect, createContext } from "react";
import { account, ID } from "../../config/Appwrite";
import { useNavigate } from "react-router-dom";
import HashLoader from 'react-spinners/HashLoader'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    checkUserStatus()
  }, [])

  const loginUser = async (userInfo) => {
    try {
      const response = await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      )
      let accountDetails = await account.get();
      setUser(accountDetails);
      navigate('/');
      toast.success("Login successfull", { position: "top-center" });
    } catch (error) {
      if (error.code === 401)
        toast.error("Invalid details, please check your email/password.")
      else
        toast.error(error.message);

    }
  }

  const googleSignin = async (e) => {
    try {
      account.createOAuth2Session(
        'google',
        "http://localhost:5173/",
        "http://localhost:5173/login"
      );
      const session = await account.getSession('current');
      const accessToken = session.providerAccessToken;
      console.log(accessToken);
      await fetchGoogleUserInfo(accessToken);

    } catch (error) {
      toast.error(error.message);
    }
  }

  async function fetchGoogleUserInfo(accessToken) {
    try {
      const response = await fetch('https://people.googleapis.com/v1/people/me?personFields=emailAddresses,names,photos', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user info from Google.');
      }
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      
    }
  }

  const logoutUser = () => {
    account.deleteSession('current')
    setUser(null)
  }
  const registerUser = async (userInfo) => {
    try {
      const response = await account.create(
        ID.unique(),
        userInfo.email,
        userInfo.password,
        userInfo.name,
      );
      navigate('/login');
      toast.success("Account created successfully!");
    } catch (error) {
      if (error.code === 409)
        toast.error("Account already exists!")
      else
        toast.error(error.message);
    }
  }

  const checkUserStatus = async () => {
    try {
      let accoutDetails = await account.get()
      setUser(accoutDetails);
    } catch (error) {

    }
    setLoading(false)
  }

  const contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
    googleSignin,
  }

  return (
    <AuthContext.Provider value={contextData} >
      {loading ? <div className="flex justify-center items-center h-[100vh] w-screen"><HashLoader color="#F88B26" /></div> : children}
      <ToastContainer hideProgressBar theme="dark" />
    </AuthContext.Provider>
  )
}

export const useAuth = () => { return useContext(AuthContext) }

export default AuthContext
