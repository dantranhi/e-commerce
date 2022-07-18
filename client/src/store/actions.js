import {
    SET_LOADING,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT,
    ADD_TO_CART,
    ADD_ONE,
    SUB_ONE,
    SET_AMOUNT,
    REMOVE_FROM_CART,
    DELETE_CART,
    TOGGLE_CART,
    CLEAR_CART_ERROR,
    SET_LOGIN_TYPE
} from './constants'

export const setLoading = (payload) => {
    return {
        type: SET_LOADING,
        payload
    }
}

export const loginStart = (payload) => {
    return {
        type: LOGIN_START,
        payload
    }
}

export const loginSuccess = (payload) => {
    return {
        type: LOGIN_SUCCESS,
        payload
    }
}

export const loginFailed = (payload) => {
    return {
        type: LOGIN_FAILED,
        payload
    }
}

export const logout = (payload) => {
    return {
        type: LOGOUT,
        payload
    }
}

// Cart
export const toggleCart = (payload) => {
    return {
        type: TOGGLE_CART,
        payload
    }
}

export const addToCart = (payload) => {
    return {
        type: ADD_TO_CART,
        payload
    }
}

export const removeFromCart = (payload) => {
    return {
        type: REMOVE_FROM_CART,
        payload
    }
}

export const addOne = (payload) => {
    return {
        type: ADD_ONE,
        payload
    }
}

export const subOne = (payload) => {
    return {
        type: SUB_ONE,
        payload
    }
}

export const clearCartError = (payload) => {
    return {
        type: CLEAR_CART_ERROR,
        payload
    }
}

export const deleteCart = (payload) => {
    return {
        type: DELETE_CART,
        payload
    }
}

// Login
export const setLoginType = (payload) => {
    return {
        type: SET_LOGIN_TYPE,
        payload
    }
}