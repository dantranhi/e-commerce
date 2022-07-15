import { createContext, useContext, useReducer } from 'react';
import reducer, { INIT_STATE } from './reducer'


const Context = createContext();

export const useStore = () => useContext(Context)


export const useCurrentUser = () => {
    const {user: {info}} = useContext(Context);
    return info;
};

export const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE); // [myCtxState, setMyCtxState]
    return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
};