import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export default {
    // addProjectToCompetition(project){
    //     return axios.post(BASE_URL + '/events/add', project)
    // },
    // publishProjects(){
    //     return axios.get(BASE_URL + '/events/publish')
    // },
    addMainEvent(competition){
        return axios.post(BASE_URL + '/events/add-main-event', competition)
    },
    addChildEvent(project){
        return axios.post(BASE_URL + '/events/add-child-event', project)
    },
}
