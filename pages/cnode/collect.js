import React, { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import server from '../../server/index'
import Header from '../../header/cnodeHead'
import { Picker, List, InputItem, TextareaItem, Button } from 'antd-mobile'
import { Toast } from 'antd-mobile'

class Collect extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collectList: []
        }
    }
    async componentDidMount() {
        const res = await server.cnodeCollectList(this.props.url.query.name)
        console.log(res)
        if(res.success){
            this.setState({
                collectList: res.data
            })
        }
    }
    render() {
        return (
            <div>
                <Header title="我的收藏" />
                {
                    this.state.collectList.map((item)=> {
                        return(
                            <div key={item.id}>
                                <div className="cnode-container">
                                    <ul>
                                        <li>
                                            <Link as={`/cnode/article/${item.id}`} href={`/cnode/article?id=${item.id}`}>
                                                <div className="cnode-flex">
                                                    <div className="cnode-user">
                                                        <img src={item.author.avatar_url} />
                                                        <span>{item.author.loginname}</span>
                                                    </div>
                                                    <div className="cnode-title">
                                                        <p><span>{item.tab == 'share' ? '分享' : item.tab == 'ask' ? '问答' : item.tab == 'good' ? '精华' : item.tab == 'job' ? '招聘' : '测试'}</span>{item.title}</p>
                                                        <p className="fz025 grey">发布日期：{item.create_at}</p>
                                                        <p className="fz025 grey">回复／浏览量：{item.reply_count + '／' +  item.visit_count}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default Collect