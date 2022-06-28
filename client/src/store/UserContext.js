import { createContext, useContext, useState } from 'react';


const AuthContext = createContext();


export const useAuth = () => useContext(AuthContext);


// state only
export const useAuthState = () => {
    const [account] = useContext(AuthContext);
    return account;
};


export const AuthProvider = ({children, init}) => {
    const AuthContextValue = useState(init); // [myCtxState, setMyCtxState]
    return <AuthContext.Provider value={AuthContextValue}>{children}</AuthContext.Provider>;
};