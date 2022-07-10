import { createContext, useContext, useReducer } from 'react';
import reducer, { INIT_STATE } from './reducer'


const Context = createContext();

export const useStore = () => useContext(Context)


export const useAuthState = () => {
    const [account] = useContext(Context);
    return account;
};

export const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE); // [myCtxState, setMyCtxState]
    return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
};