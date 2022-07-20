import { SET_LOADING, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, TOGGLE_CART, ADD_TO_CART, REMOVE_FROM_CART, ADD_ONE, SUB_ONE, CLEAR_CART_ERROR, DELETE_CART } from './constants'

const INIT_CART = JSON.parse(localStorage.getItem('userCart')) ?? []

export const INIT_STATE = {
    loading: false,
    userData: {},
    cart: {
        data: INIT_CART,
        isOpen: false,
        error: ''
    }
}

const reducer = (state, { type, payload }) => {
    // console.group('REDUCER')
    // console.log("PREV STATE: ", state);
    // console.log("ACTION: ", type);
    // console.groupEnd()

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
            localStorage.setItem('user', JSON.stringify(payload))
            return { ...state, loading: false, userData: payload };
        case LOGIN_FAILED:
            localStorage.removeItem('user')
            return state
        case LOGOUT: {
            localStorage.removeItem('user')
            return { ...state, loading: false, userData: {} }
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
            if (payload.stock === 0) return state
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
            if (updatedCartItem.amount > payload.stock) return {
                ...state,
                cart: {
                    ...state.cart,
                    error: 'Số lượng sản phẩm vượt quá số lượng tồn'
                }
            }
            return {
                ...state,
                cart: {
                    data: cartCloned,
                    isOpen: true
                }
            }
        case CLEAR_CART_ERROR:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    error: ''
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
                        return item._id === payload && item.amount + 1 <= item.stock ? { ...item, amount: item.amount + 1 } : item
                    }),
                    isOpen: true
                }
            }
        case DELETE_CART:
            localStorage.removeItem('userCart')
            return {
                ...state,
                cart: {
                    data: [],
                    isOpen: false
                }
            }
        case SUB_ONE:
            const subItem = state.cart.data.find(item => item._id === payload)
            if (subItem.amount <= 1) return {
                ...state,
                cart: {
                    ...state.cart,
                    data: [...state.cart.data].filter(item => item._id !== payload)
                }
            }

            return {
                ...state,
                cart: {
                    data: [...state.cart.data].map(item => {
                        return item._id === payload ? { ...item, amount: item.amount - 1 } : item
                    }),
                    isOpen: true
                }
            }


        default:
            return state
    }
}

export default reducer