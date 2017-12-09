import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Auth from './Auth.js'

import * as globalActions from '../../../actions/globalActions.js'

class AuthContainer extends React.Component {

    render() {
        return <Auth {...this.props} />
    }

}

const mapStateToProps = state => ({
    user: state.globalReducer.user,
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(globalActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer)
