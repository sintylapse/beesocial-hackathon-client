import moment from 'moment'
import shortid from 'shortid'

export function setUser(user){
    return {
        type: 'SET_USER', user,
    }
}

export function setProjects(projects){
    return {
        type: 'SET_PROJECTS', projects,
    }
}

export const addProject = project => (dispatch, getState) => {
    const { projects } = getState().globalReducer

    dispatch(setProjects([project, ...projects]))
}
