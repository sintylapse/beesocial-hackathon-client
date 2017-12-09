import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import AuthContainer from './screens/Auth/AuthContainer.js'
import DashboardContainer from './screens/Dashboard/DashboardContainer.js'

class RoutesContainer extends Component {

    render(){
        return (
            <Switch>
                <Route exact path = {'/'} component = {AuthContainer} />
                <Route path = {'/dashboard'} component = {DashboardContainer} />
            </Switch>
        )
    }

}

export default RoutesContainer
