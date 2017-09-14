import React, { Component } from 'react'
import Head from 'next/head'
import { NavBar, Icon } from 'antd-mobile'

class Header extends Component {
    constructor() {
        super()
    }
    onLeftClick() {
        console.log('leftback')
    }
    render() {
        return (
            <div>
                <Head>
                    <link rel='stylesheet' type='text/css' href='../static/css/public.css' />
                    <link rel='stylesheet' type='text/css' href='../static/css/consume.css' />
                </Head>
                <NavBar leftContent="返回" mode="light" onLeftClick={this.onLeftClick.bind(this)}
                // rightContent={[<Icon key="0" type="search" />, <Icon key="1" type="ellipsis" />]}
                >消费贷</NavBar>
            </div>
        )
    }
}
export default Header