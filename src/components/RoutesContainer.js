import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import Auth from './screens/Auth/Auth.js'
import CreateProject from './screens/CreateProject/CreateProject.js'

class RoutesContainer extends Component {

    render(){
        return (
            <Switch>
                <Route exact path = {'/'} component = {Auth} />
                <Route path = {'/create'} component = {CreateProject} />
            </Switch>
        )
    }

}

export default RoutesContainer
