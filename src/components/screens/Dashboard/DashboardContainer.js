import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Dashboard from './Dashboard.js'

import * as globalActions from '../../../actions/globalActions.js'

class DashboardContainer extends React.Component {

    render() {
        return <Dashboard {...this.props} />
    }

}

const mapStateToProps = state => ({
    user: state.globalReducer.user,
    projects: state.globalReducer.projects,
    competition: state.globalReducer.competition,
    publishedProjects: state.globalReducer.publishedProjects,
    loading: state.globalReducer.loading,
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(globalActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
