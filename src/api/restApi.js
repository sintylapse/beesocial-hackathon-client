import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export default {
    addProjectToCompetition(project){
        return axios.post(BASE_URL + '/add', project)
    },
    publishProjects(){
        return axios.get(BASE_URL + '/publish')
    },
}
