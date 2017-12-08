import React, { Component } from 'react'
import { HashRouter } from 'react-router-dom'

import RoutesContainer from './RoutesContainer.js'

class App extends Component {

    render(){
        return (
            <HashRouter>
                <RoutesContainer />
            </HashRouter>
        )
    }

}

export default App
