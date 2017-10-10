import React, { Component } from 'react'
import server from '../../server/index'
import Header from '../../header/cnodeHead'

export default class Article extends Component {
    static async getInitialProps(content) {
        const { id } = content.query
        const res = await server.cnodeArticle(id)
        return {
            articleObj: res
        }
    }
    render() {
        const list = this.props.articleObj
        return (
            <div>
                <Header title="文章详情" />
                <div className="cnode-content">
                    <div className="cnode-atop">
                        <h3>{list.title}</h3>
                        <div className="cnode-tip">
                            <span className={ list.top ? 'redbg' : 'hide' }>置顶</span><span className={ list.good ? 'redbg' : 'hide' }>精华</span><span>{list.tab == 'share' ? '分享' : list.tab == 'ask' ? '问答' : list.tab == 'good' ? '精华' : '招聘'}</span>
                            <b><i className="blue">{list.author.loginname}</i>  {list.create_at.substr(0,10)} 发布</b>
                            <p>{list.visit_count}条访问量  {list.reply_count}条回复</p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div dangerouslySetInnerHTML={{ __html: list.content }}></div>
                </div>
                <div className="cnode-discuss">
                    <h3>{list.reply_count}条评论</h3>
                    <ul>
                        {
                            list.replies.map((item)=>{
                                return(
                                    <li key={item.id}>
                                        <img src={item.author.avatar_url} />
                                        <div className="cnode-dis">
                                            <p><span>{item.author.loginname}</span> {item.create_at.substr(0,10)}</p>
                                            <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                        
                    </ul>
                </div>
            </div>
        )
    }
}