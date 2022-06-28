const INIT_STATE = {
    loading: false,
    user: {
        info: {},
        error: '',
    }, 
}

export default reducer = (state, action) => {
    switch (action.type){
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }

        default:
            return state
    }
}