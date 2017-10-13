import React, { Component } from 'react'
import server from '../../server/index'
import Header from '../../header/cnodeHead'
import { List, TextareaItem, Toast, Button } from 'antd-mobile'

export default class Article extends Component {
    static async getInitialProps(content) {
        const { id } = content.query
        const res = await server.cnodeArticle(id, true)
        return {
            articleObj: res
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            articleObj: this.props.articleObj,
            is_collect: false,
            content: ''
        }
        this.collection = this.collection.bind(this)
        this.sendReply = this.sendReply.bind(this)
        this.textareaEntry = this.textareaEntry.bind(this)
    }
    componentDidMount() {
        this.setState({
            is_collect: this.state.articleObj.is_collect
        })
    }
    //  重新获取信息
    async serverReload() {
        // const { id } = content.query
        const res = await server.cnodeArticle(this.state.articleObj.id, true)
        this.setState({
            articleObj: res,
            content: ''
        })
    }
    //  点击收藏
    async collection() {
        const collect = {
            topic_id: this.state.articleObj.id
        }
        if(this.state.is_collect){
            const res = await server.cnodeDeCollect(collect)
            if(res.success){
                this.setState({
                    is_collect: false
                })
                Toast.info('已取消', 2)
            }
        }else{
            const res = await server.cnodeCollect(collect)
            if(res.success){
                this.setState({
                    is_collect: true
                })
                Toast.info('收藏成功', 2)
            }
        }
    }
    //  评论
    async sendReply() {
        const replyParam = {
            topic_id: this.state.articleObj.id,
            content: this.state.content
        }
        const res = await server.cnodeReply(replyParam)
        if(res.success){
            Toast.info('评论成功', 2)
            this.serverReload()
        }
    }
    textareaEntry(val) {
        this.setState({
            content: val
        })
    }
    render() {
        const list = this.state.articleObj
        return (
            <div>
                <Header title="文章详情" />
                <div className="cnode-content">
                    <div className="cnode-atop">
                        <h3 className="cnode-firsttip"><span className={ list.top ? 'redbg' : 'hide' }>置顶</span><span className={ list.good ? 'redbg' : 'hide' }>精华</span><span>{list.tab == 'share' ? '分享' : list.tab == 'ask' ? '问答' : list.tab == 'good' ? '精华' : list.tab == 'job' ? '招聘' : '测试'}</span>{list.title}</h3>
                        <div className="cnode-tip">
                            <span onClick={ this.collection } className={ this.state.is_collect ? 'graybg' : '' }>{ this.state.is_collect ? '已收藏' : '点击收藏' }</span>
                            <b><i className="blue">{list.author.loginname}</i>  {list.create_at.substr(0,10)} 发布</b>
                            <p>{list.visit_count}条访问量  {list.reply_count}条回复</p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div dangerouslySetInnerHTML={{ __html: list.content }}></div>
                </div>
                <List renderHeader={() => '评论'}>
                    <TextareaItem
                        rows={5}
                        value={ this.state.content }
                        onChange={ this.textareaEntry }
                        placeholder='此处填写评论'
                    />
                </List>
                <div className="cnode-padding">
                    <Button type="primary" onClick={ this.sendReply }>提交评论</Button>
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