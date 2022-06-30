import { SET_LOADING, LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, TOGGLE_CART, ADD_TO_CART } from './constants'

const INIT_ACCOUNT = JSON.parse(localStorage.getItem('user')) ?? {}

export const INIT_STATE = {
    loading: false,
    user: {
        info: INIT_ACCOUNT,
        error: '',
    },
    cart: {
        data: [{
            name: 'Ram',
            photo: 'https://dl.airtable.com/.attachments/14ac9e946e1a02eb9ce7d632c83f742f/4fd98e64/product-1.jpeg',
            price: 500000,
            amount: 5
        }],
        isOpen: false
    }
}

const reducer = (state, {type, payload}) => {
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
            return {
                ...state,
                cart: {
                    data: [
                        ...state.cart.data,
                        {
                            name: payload.name,
                            photo: payload.photo,
                            price: payload.price,
                            amount: 1
                        }
                    ],
                    isOpen: true
                }
        }

        default:
            return state
    }
}

export default reducer