const initialState = {
    user: null,
    projects: [],
}

export default function globalReducer(state = initialState, action){
    switch (action.type) {
        case 'SET_USER': return { ...state,
            user: action.user,
        }
        case 'SET_PROJECTS': return { ...state,
            projects: action.projects,
        }
        default: return state
    }
}
