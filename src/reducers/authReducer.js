const initialState = {
    user: null,
}

export default function authReducer(state = initialState, action){
    switch (action.type) {
        case 'SET_USER': return { ...state,
            user: action.user,
        }
        default: return state
    }
}
