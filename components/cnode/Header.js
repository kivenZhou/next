import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile'

export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            selected: ''
        }
    }
    login() {
        alert('11')
    }
    onLeftClick() {
        window.history.back()
    }
    render() {
        return (
            <NavBar leftContent="返回" mode="dark" onLeftClick={this.onLeftClick.bind(this)}
                rightContent={[<span key="1" onClick={ this.login }>accesstoken</span>]}
                >{ this.props.title }</NavBar>
        )
    }
}