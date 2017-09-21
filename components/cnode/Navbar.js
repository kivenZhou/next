import React, { Component } from 'react'

import { Tabs, Badge } from 'antd-mobile'

const TabPane = Tabs.TabPane

export default class NavBar extends Component {
    constructor(props){
        super(props)
    }
    tabClick(key) {
        this.returnTop()
        this.props.callbacks(key)
    }
    returnTop() {
        console.log(document.getElementsByClassName('list-view-section-body'))
        setTimeout(()=> {
            if (document.getElementsByClassName('cnodeHeight')[0])
                document.getElementsByClassName('cnodeHeight')[0].scrollTop = 0;
        }, 100)
    }
    render() {
        return (
            <div>
                <Tabs defaultActiveKey="1" onChange={this.tabClick.bind(this)} pageSize={5}>
                    <TabPane tab='全部' key="1"></TabPane>
                    <TabPane tab='精华' key="2"></TabPane>
                    <TabPane tab='分享' key="3"></TabPane>
                    <TabPane tab='问答' key="4"></TabPane>
                    <TabPane tab='招聘' key="5"></TabPane>
                    <TabPane tab='测试' key="6"></TabPane>
                </Tabs>
            </div>
        )
    }
}