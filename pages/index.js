import React, { Component } from 'react'
import Router from 'next/router'
import { List } from 'antd-mobile'

const Item = List.Item
class Index extends Component {
    routerGo() {
        Router.push('/consume')
    }
    render() {
        return (
            <div>
                <List renderHeader={() => 'Project List'} className="my-list">
                    <Item arrow="horizontal" onClick={ this.routerGo }>
                        Consume Page
                    </Item>
                </List>
            </div>
        )
    }
}

export default Index