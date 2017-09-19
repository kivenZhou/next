import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile'

export default class Header extends Component {
    onLeftClick() {
        window.history.back()
    }
    render() {
        return (
            <NavBar leftContent="返回" mode="light" onLeftClick={this.onLeftClick.bind(this)}
                // rightContent={[<Icon key="0" type="search" />, <Icon key="1" type="ellipsis" />]}
                >{ this.props.title }</NavBar>
        )
    }
}