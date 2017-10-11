import React, { Component } from 'react'
import server from '../../server/index'
import Header from '../../header/cnodeHead'
import { List, Button, Grid } from 'antd-mobile'
import Router from 'next/router'
import Link from 'next/link'
import Loading from '../../tool/Loading'
import { Toast } from 'antd-mobile'
import { delCookie } from '../../tool/Util'

const Item = List.Item
const Brief = Item.Brief

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: ''
        }
    }
    async componentDidMount() {
        const res = await server.cnodeUser()
        console.log(res)
        this.setState({
            userInfo: res
        })
    }
    eachUrl(el, index) {
        if(index == 0){
            Router.push('/cnode/create')
        }
    }
    layout() {
        delCookie('accesstoken')
        Router.push('/cnode')
    }
    render() {
        const { userInfo } = this.state
        const data = [{icon: '../../static/imgs/add.png', text: '新建主题'}, {icon: '../../static/imgs/favorites.png', text: '我的收藏'}, {text: '发帖'}, {text: '发帖'}]
        if(!userInfo){
            return (
                <div>
                    <Header title="用户中心" />
                    <Loading />
                </div>
            )
        }
        return (
            <div>
                <Header title="用户中心" />
                <div className="cnode-usertop">
                    <img src={userInfo.avatar_url} />
                    <p>{userInfo.loginname}</p>
                    <p>积分：{userInfo.score}</p>
                </div>
                <div className="cnode-grid">
                    <Grid data={data} columnNum={4} onClick={ this.eachUrl }/>
                </div>
                <List renderHeader={() => '最新发布'} className="my-list">
                {
                    userInfo.recent_topics.map((item)=> {
                        return (
                            <Link key={item.id} as={`/cnode/article/${item.id}`} href={`/cnode/article?id=${item.id}`}>
                                <Item arrow="horizontal" multipleLine platform="android" onClick={() => {}}>
                                    {item.title} <Brief>最后回复时间：{item.last_reply_at}</Brief>
                                </Item>
                            </Link>
                        )
                    })
                }
                </List>
                <div className="cnode-padding">
                    <Button type="primary" onClick={ this.layout }>注销</Button>
                </div>
            </div>
        )
    }
}

export default User