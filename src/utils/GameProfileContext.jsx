import { createContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import { database, db_id } from "../../config/Appwrite";


const GameProfileContext = createContext();

export const GameProfileProvider = ({ children }) => {
    const { user, userDetails } = useAuth();

    // fetch game profiles if exist
    const [ffProfile, setFFProfile] = useState(null)
    const [pubgProfile, setPUBGProfile] = useState(null)
    useEffect(() => {
        if (userDetails && userDetails.ff_profile) {
            const getFFProfile = async () => {
                try {
                    const ffprofile = await database.getDocument(db_id, 'ff_profiles', user.$id)
                    setFFProfile(ffprofile);
                } catch (error) {
                    toast.error(error.message)
                }
            }
            getFFProfile();
        }
        if (userDetails && userDetails.pubg_profile) {
            const getPubgProfile = async () => {
                try {
                    const pubgprofile = await database.getDocument(db_id, 'pubg_profiles', user.$id)
                    setPUBGProfile(pubgprofile);
                } catch (error) {
                    toast.error(error.message)
                }
            }
            getPubgProfile();
        }

    }, [user, userDetails])
    return (
        <GameProfileContext.Provider value={{ ffProfile, setFFProfile, pubgProfile, setPUBGProfile }}>
            {children}
        </GameProfileContext.Provider>
    )
}

export default GameProfileContext;