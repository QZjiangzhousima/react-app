import React, { Component } from 'react'
import { loginSuccessSync } from '@redux/actions/login'
import { connect } from 'react-redux'



@connect()
class Oauth extends Component {
    componentDidMount () {
        console.log(window.location);
        const token = window.location.search.split('=')[1]
        this.props.dispatch(loginSuccessSync({ token }))
        localStorage.setItem('user_token', token)
        this.props.history.replace('/')
    }
    render () {
        return (
            <div>
                git授权登录
            </div>
        )
    }
}

export default Oauth