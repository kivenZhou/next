import React, { Component } from 'react'
import Router from 'next/router'
import server from '../../server/index'
import Header from '../../header/cnodeHead'
import { Picker, List, InputItem, TextareaItem, Button } from 'antd-mobile'
import { Toast } from 'antd-mobile'

class Create extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            tab: ['dev'],
            content: ''
        }
        this.handleTitle = this.handleTitle.bind(this)
        this.handleContent = this.handleContent.bind(this)
        this.publish = this.publish.bind(this)
    }
    async publish() {
        // console.log(this.state)
        const res = await server.cnodeTopics(this.state)
        if(res.success){
            await Toast.info('发布成功', 2);
            Router.push('/cnode/user')
        }
    }
    handleTitle(val) {
        console.log(val)
        this.setState({
            title: val
        })
    }
    handleContent(val) {
        console.log(val)
        this.setState({
            content: val
        })
    }
    render() {
        const district = [{
            label: '问答',
            value: 'ask'
        },{
            label: '分享',
            value: 'share'
        },{
            label: '求职',
            value: 'job'
        },{
            label: '测试',
            value: 'dev'
        }]
        return (
            <div className="new-topic">
                <Header title="新建主题" />
                <List renderHeader={() => '请按照规范新建主题'}>
                <InputItem
                  placeholder="请输入主题名称"
                  autoFocus
                  value={this.state.title}
                  onChange={this.handleTitle}
                >主题名称</InputItem>
                <Picker data={district} cols={1} className="forss" 
                    value={this.state.tab}
                    onChange={v => this.setState({ tab: v })}>
                    <List.Item arrow="horizontal">选择分类</List.Item>
                </Picker>
              </List>
              <List renderHeader={() => '主题内容'}>
                <TextareaItem
                    rows={6}
                    value={this.state.content}
                    onChange={this.handleContent}
                    placeholder="输入主题内容"
                />
                </List>
                <div className="cnode-padding">
                    <Button type="primary" onClick={ this.publish }>发布</Button>
                </div>
            </div>
        )
    }
}

export default Create