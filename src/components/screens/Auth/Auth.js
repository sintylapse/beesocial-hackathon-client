import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

class Auth extends Component {

    render(){
        return (
            <div>
                <div>
                    Authentification
                </div>
                <Link to = "/create">
                    <Button>
                        Create
                    </Button>
                </Link>
            </div>
        )
    }

}

export default Auth
