import {
    SET_LOADING,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    ADD_TO_CART,
    ADD_AMOUNT,
    SUB_AMOUNT,
    SET_AMOUNT,
    REMOVE_FROM_CART,
    DELETE_CART
} from './constants'

export const setLoading = (payload) =>{
    return {
        type: SET_LOADING,
        payload
    }
}
export const loginStart = (payload) =>{
    return {
        type: LOGIN_START,
        payload
    }
}