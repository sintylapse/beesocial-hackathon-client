import React, { Component } from 'react'
import { HashRouter } from 'react-router-dom'

import Routes from './Routes.js'

class App extends Component {

    render(){
        return (
            <HashRouter>
                <Routes />
            </HashRouter>
        )
    }

}

export default App
