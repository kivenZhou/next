import React, { Component } from 'react'
import { NavBar, Icon, Modal, Button, Toast } from 'antd-mobile'
import { getCookie } from '../../tool/Util'
import Router from 'next/router'

const prompt = Modal.prompt;

export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: false
        }
    }
    componentDidMount() {
        console.log(getCookie('accesstoken'))
        if(getCookie('accesstoken')){
            this.setState({
                isLogin: true
            })
        }else{
            this.setState({
                isLogin: false
            })
        }
    }
    onLeftClick() {
        window.history.back()
    }
    userInfo() {
        Router.push('/cnode/user')
    }
    render() {
        return (
            <NavBar leftContent="返回" mode="dark" onLeftClick={this.onLeftClick.bind(this)}
                rightContent={[<span key="1" className={this.state.isLogin ? 'none':'display'} onClick={() => prompt('请输入accesstoken', '官网登陆获取的accesstoken',
                [
                  { text: '取消' },
                  {
                    text: '登陆',
                    onPress: value => new Promise((resolve) => {
                        if(value == '' || value.length != 36){
                            Toast.info('accesstoken 无效', 1);
                            return
                        }
                        setTimeout(() => {
                            resolve();
                            var expires = new Date();
                            expires.setTime(expires.getTime() + 30 * 60 * 1000);
                            document.cookie="accesstoken=" + value+ ";expires=" + expires.toGMTString();
                            console.log(`value:${value}`);
                            this.setState({
                                isLogin: true
                            })
                        }, 1000);
                    }),
                  },
                ], 'default', null, ['accesstoken'])}
              >Login</span>, <Icon type="koubei-o"  key='2' onClick={ this.userInfo } className={this.state.isLogin && this.props.show ? 'display':'none'} />]}
                >{ this.props.title }</NavBar>
        )
    }
}