const initialState = {
    user: null,
    projects: [],
    competition: null,
    publishedProjects: [],
    loading: false,
    links: [],
    willPay: [],
}

export default function globalReducer(state = initialState, action){
    switch (action.type) {
        case 'SET_USER': return { ...state,
            user: action.user,
        }
        case 'SET_PROJECTS': return { ...state,
            projects: action.projects,
        }
        case 'SET_COMPETITION': return { ...state,
            competition: action.competition,
        }
        case 'SET_PUBLISHED_PROJECTS': return { ...state,
            publishedProjects: action.publishedProjects,
        }
        case 'SET_LOADING': return { ...state,
            loading: action.loading,
        }
        case 'SET_LINKS': return { ...state,
            links: action.links,
        }
        case 'SET_WILL_PAY': return { ...state,
            willPay: action.willPay,
        }
        default: return state
    }
}
