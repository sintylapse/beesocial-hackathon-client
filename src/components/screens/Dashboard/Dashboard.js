import React, { Component } from 'react'
import { Input, Button, Modal, Card, Icon, Avatar, Tabs } from 'antd'
import { withRouter } from 'react-router-dom'

import { redirectTo } from '../../../api/browserApi.js'

import CreateProject from '../CreateProject/CreateProject.js'

import logo from '../../../assets/logo-registration.png'

const styles = {
    containerStyle: {
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '20px 0px',
    },
}

const gridStyle = {
    width: '100%',
    textAlign: 'center',
};

class App extends Component {

    state = {
        activeMainTab: this.props.location.pathname,
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            const { pathname } = this.props.location

            this.setState({
                activeMainTab: pathname,
            })
        }
    }

    _logout = () => {
        this.props.actions.setUser(null)
        redirectTo('/')

    }

    changeTab = tabKey => {
        redirectTo(tabKey)
    }

    render() {
        return (
            <div style = {styles.containerStyle}>
                <Tabs activeKey = {this.state.activeMainTab} defaultActiveKey = "1" tabBarExtraContent={<Button type = "dashed" icon = "enter" onClick = {this._logout} style = {{ marginTop: 20 }}>Выйти</Button>} onChange = {this.changeTab}>
                    <Tabs.TabPane
                        tab = {
                            <img alt = "BeeSocial" src = {logo} style = {{ width: 40, height: 50 }} />
                        }
                        disabled
                        key = "0"
                    />
                    <Tabs.TabPane tab={<span>Проекты</span>} key="/dashboard/projects">
                        <CreateProject {...this.props} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={<span>Соревнование за гранд</span>} key="/dashboard/competition">
                        Соревнование за гранд
                    </Tabs.TabPane>
                </Tabs>
            </div>
        )
    }

}

export default withRouter(App)
