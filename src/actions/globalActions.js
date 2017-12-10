import moment from 'moment'
import shortid from 'shortid'
import io from 'socket.io-client'
import golos from 'golos'

import restApi from '../api/restApi.js'

const socket = io('http://localhost:3000')

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

export function setCompetition(competition){
    return {
        type: 'SET_COMPETITION', competition,
    }
}

export function setPublishedProjects(publishedProjects){
    return {
        type: 'SET_PUBLISHED_PROJECTS', publishedProjects,
    }
}

export function setLoading(loading){
    return {
        type: 'SET_LOADING', loading,
    }
}

export function setLinks(links){
    return {
        type: 'SET_LINKS', links,
    }
}

export function setWillPay(willPay){
    return {
        type: 'SET_WILL_PAY', willPay,
    }
}

export const addProject = project => (dispatch, getState) => {
    const { projects } = getState().globalReducer

    dispatch(setProjects([project, ...projects]))
}

export const initializeCompetition = competition => (dispatch, getState) => {
    dispatch(setCompetition(competition))
    dispatch(addMainEvent())
}

export const addMainEvent = () => async (dispatch, getState) => {
    const { competition } = getState().globalReducer

    try {
        const response = await restApi.addMainEvent(competition)

        console.warn("main event added")
        console.warn(response)
    } catch (error) {
        console.error('addMainEvent:', error)
    }
}

export const addProjectToCompetition = project => async (dispatch, getState) => {
    console.warn("project", project)
    try {
        const response = await restApi.addChildEvent(project)

        console.warn("child event added")
        console.warn(response)
    } catch (error) {
        console.error('addChildEvent:', error)
    }
}

export const distributeGrant = () => async (dispatch, getState) => {
    const { links } = getState().globalReducer

    const result = await Promise.all(links.map(comments => {
        return new Promise((resolve, reject) => {
            golos.api.getContent('uarlouski', comments.link, (err, result) => {
                err ? reject(err) : resolve({
                    author: 'uarlouski',
                    title: result.title,
                    body: result.body,
                    permlink: comments.link,
                    votesQuantity: result.active_votes.length,
                    // tags: result.tags,
                });
            });
        })
    }))

    function pay(amount, obj) {
        let sum = obj.reduce(function (l, r) {
            return r.votesQuantity == null ? l : l + r.votesQuantity;
        }, 0);

        obj.forEach((element) => {
            let percent = element.votesQuantity * 100 / sum;
            element.amountToPay = percent / 100 * amount;
        })
        return obj;
    }

    console.warn("distributeGrant result", result)

    const willPay = pay(100, result)

    dispatch(setWillPay(willPay))
}

export const emmitPublish = () => (dispatch, getState) => {
    const { competition } = getState().globalReducer

    socket.emit('publish', { organization: competition.organization })

    dispatch(setLoading(true))

    socket.on('published', async data => {
        dispatch(setLinks(data.links))

        const result = await Promise.all(data.links.map(comments => {
            return new Promise((resolve, reject) => {
                golos.api.getContent('uarlouski', comments.link, (err, result) => {
                    err ? reject(err) : resolve({
                        title: result.title,
                        body: result.body,
                        // tags: result.tags,
                    });
                });
            })
        }))

        dispatch(setLoading(false))

        dispatch(setPublishedProjects(result))
    })
}
