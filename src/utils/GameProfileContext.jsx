import { createContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const GameProfileContext = createContext();

export const GameProfileProvider = ({ children }) => {
    const { user, userDetails } = useAuth();

    // set game profiles if exist
    const [ffProfile, setFFProfile] = useState(null)
    const [pubgProfile, setPUBGProfile] = useState(null)


    useEffect(() => {
        if (userDetails && userDetails.game_profiles.length > 0) {
            const fprofile = userDetails.game_profiles.find(gprofile => JSON.parse(gprofile).gameID === "freefire")
            if (fprofile) {
                setFFProfile(JSON.parse(fprofile))
            }
            const pubgprofile = userDetails.game_profiles.find(gprofile => JSON.parse(gprofile).gameID === "pubgmobile")
            if (pubgprofile) {
                setPUBGProfile(JSON.parse(pubgprofile))
            }
        }
    }, [user, userDetails])




    return (
        <GameProfileContext.Provider value={{ ffProfile, setFFProfile, pubgProfile, setPUBGProfile }}>
            {children}
        </GameProfileContext.Provider>
    )
}

export default GameProfileContext;