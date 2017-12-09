import moment from 'moment'
import shortid from 'shortid'

import restApi from '../api/restApi.js'

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

export const addProjectToCompetition = project => async (dispatch, getState) => {
    const { user } = getState().globalReducer

    try {
        await restApi.addProjectToCompetition({
            username: user,
            projectname: user + '_' + project.title,
            ...project
        })

        console.warn("project was added")

        await restApi.publishProjects()

        console.warn("project was published")
    } catch (error) {
        console.error('addProjectToCompetition:', error)
    }
}
