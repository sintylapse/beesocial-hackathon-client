import moment from 'moment'
import shortid from 'shortid'

export function setUser(user){
    return {
        type: 'SET_USER', user,
    }
}
