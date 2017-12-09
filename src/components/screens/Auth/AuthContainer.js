import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Auth from './Auth.js'

import * as authActions from '../../../actions/authActions.js'

class AuthContainer extends React.Component {

    componentDidMount(){
        this.props.actions.setUser({
            name: 'John',
        })
    }

    render() {
        return <Auth {...this.props} />
    }

}

const mapStateToProps = state => ({
    user: state.authReducer.user,
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(authActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer)
