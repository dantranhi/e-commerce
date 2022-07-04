import { SET_LOADING, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, TOGGLE_CART, ADD_TO_CART, REMOVE_FROM_CART, ADD_ONE, SUB_ONE } from './constants'

const INIT_ACCOUNT = JSON.parse(localStorage.getItem('user')) ?? {}
const INIT_CART = JSON.parse(localStorage.getItem('userCart')) ?? []

export const INIT_STATE = {
    loading: false,
    user: {
        info: INIT_ACCOUNT,
        error: '',
    },
    cart: {
        data: INIT_CART,
        isOpen: false
    }
}

const reducer = (state, { type, payload }) => {
    console.group('REDUCER')
    console.log("PREV STATE: ", state);
    console.log("ACTION: ", type);
    console.groupEnd()
    
    switch (type) {
        case SET_LOADING:
            return {
                ...state,
                loading: payload
            }
        case LOGIN_START:
            return {
                ...state,
                loading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: {
                    info: payload,
                    error: ''
                }
            }
        case LOGIN_FAILED:
            return {
                ...state,
                user: {
                    info: {},
                    error: 'Login failed'
                }
            }
        case TOGGLE_CART:
            return {
                ...state,
                cart: {
                    data: [...state.cart.data],
                    isOpen: !state.cart.isOpen
                }
            }
        case ADD_TO_CART:
            const isInCart = state.cart.data.some(item => item._id === payload._id)
            if (!isInCart)
                return {
                    ...state,
                    cart: {
                        data: [
                            ...state.cart.data,
                            {
                                ...payload,
                                amount: 1
                            }
                        ],
                        isOpen: true
                    }
                }
            const cartCloned = state.cart.data
            const updatedCartItem = cartCloned.find(cartItem => cartItem._id === payload._id)
            updatedCartItem.amount = updatedCartItem.amount + 1
            console.log(updatedCartItem)
            return {
                ...state,
                cart: {
                    data: cartCloned,
                    isOpen: true
                }
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: {
                    data: [...state.cart.data].filter(item => item._id !== payload),
                    isOpen: true
                }
            }
        case ADD_ONE:
            return {
                ...state,
                cart: {
                    data: [...state.cart.data].map(item => {
                        return item._id === payload ? { ...item, amount: item.amount + 1 } : item
                    }),
                    isOpen: true
                }
            }
        case SUB_ONE:
            return {
                ...state,
                cart: {
                    data: [...state.cart.data].map(item => {
                        return item._id === payload && item.amount > 0 ? { ...item, amount: item.amount - 1 } : item
                    }),
                    isOpen: true
                }
            }

        default:
            return state
    }
}

export default reducer