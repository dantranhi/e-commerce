import {
    SET_LOADING,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT,
    ADD_TO_CART,
    ADD_AMOUNT,
    SUB_AMOUNT,
    SET_AMOUNT,
    REMOVE_FROM_CART,
    DELETE_CART,
    TOGGLE_CART
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

export const loginSuccess = (payload) =>{
    return {
        type: LOGIN_SUCCESS,
        payload
    }
}

export const loginFailed = (payload) =>{
    return {
        type: LOGIN_FAILED,
        payload
    }
}

export const logout = (payload) =>{
    return {
        type: LOGIN_FAILED,
        payload
    }
}

// Cart
export const toggleCart = (payload) =>{
    return {
        type: TOGGLE_CART,
        payload
    }
}

export const addToCart = (payload) =>{
    return {
        type: ADD_TO_CART,
        payload
    }
}