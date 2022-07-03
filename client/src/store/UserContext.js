import { createContext, useContext, useState, useReducer } from 'react';
import reducer, { INIT_STATE } from './reducer'


const Context = createContext();


// export const useAuth = () => useContext(Context)
export const useStore = () => useContext(Context)


// state only
export const useAuthState = () => {
    const [account] = useContext(Context);
    return account;
};


// export const Provider = ({children, init}) => {
//     const ContextValue = useState(init); // [myCtxState, setMyCtxState]
//     return <Context.Provider value={ContextValue}>{children}</Context.Provider>;
// };
export const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE); // [myCtxState, setMyCtxState]
    return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
};