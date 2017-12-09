import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Input, Icon } from 'antd'

import { redirectTo } from '../../../api/browserApi.js'

const logo = require('../../../assets/logo-registration.png')

const styles = {
    loginContainer: {
        maxWidth: 400,
        margin: '0 auto',
        padding: '20px 0px',
    },
    header: {
        // margin: '0 auto',
        textAlign: 'center',
        marginBottom: 20,
    },
}

class Auth extends Component {

    state = {
        createProjectModalVisible: false,
        username: '',
        password: '',
    }

    createOnChangeHandler = inputType => e => this.setState({
        [inputType]: e.target.value,
    })

    _login = () => {
        this.props.actions.setUser(this.state.username)
        redirectTo('/dashboard/projects')
    }

    render(){
        return (
            <div className = "fadeInDown animated" style = {styles.loginContainer}>
                <div style = {styles.header}>
                    <img src = {logo} alt = "BeeSocial" />
                    <h1 style = {{ fontWeight: 'normal' }}>
                        Войти в аккаунт
                    </h1>
                </div>
                <Form>
                    <Form.Item label = "Название проекта">
                        <Input
                            prefix = {<Icon type = "user" style = {{ color: 'rgba(0,0,0,.25)' }} />}
                            value = {this.state.username}
                            onChange = {this.createOnChangeHandler('username')}
                            placeholder = "Логин"
                        />
                    </Form.Item>
                    <Form.Item label = "Описание проекта">
                        <Input
                            prefix = {<Icon type = "lock" style = {{ color: 'rgba(0,0,0,.25)' }} />}
                            value = {this.state.password}
                            onChange = {this.createOnChangeHandler('password')}
                            placeholder = "Пароль"
                            type = "password"
                        />
                    </Form.Item>
                </Form>
                <Button onClick = {this._login}>
                    Войти
                </Button>
            </div>
        )
    }

}

export default Auth
