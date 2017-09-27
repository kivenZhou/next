import React, { Component } from 'react'
import { RefreshControl, ListView, Carousel, SwipeAction, Button, Progress, Toast } from 'antd-mobile'
import Router from 'next/router'
import Link from 'next/link'
import Loading from '../../tool/Loading'
import server from '../../server/index'
import Header from '../../header/cnodeHead'
import Navbar from '../../components/cnode/Navbar'

let pageIndex = 1
let type = 'all'
export default class Index extends Component {
    static async getInitialProps() {
        // Toast.loading('加载中...', 5, () => {});
        const res = await server.cnodeList(1, 'all')
        // const ooo = res.data
        Toast.hide()
        return {
            shows: res
        }
    }
    constructor(props) {
        super(props)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
        this.initData = this.props.shows;
        this.state = {
            dataSource: dataSource.cloneWithRows(this.initData),
            hasMore: true,
            refreshing: false,
            isLoading: false,
            // pages: this.props.pages,
            percent: 50,
            height: 0,
            scrollTop: 0
        }
    }
    async componentDidMount() {
        this.setState({
            height: document.documentElement.clientHeight - 90 
        })
    }
    componentDidUpdate() {
        
    }
    async onTabCallback(key) {
        this.refs.lv.refs.listview.scrollTo(0, 0)
        this.refs.lv.scrollTo(0, 0)
        // setTimeout(() => this.refs.lv.refs.listview.scrollTo(0, 0), 800); // also work
        // setTimeout(() => this.refs.lv.scrollTo(0, 0), 800); // recommend usage
        Toast.loading('加载中...', 5, () => {})
        switch (key) {
            case '1':
                type = 'all'
                break;
            case '2':
                type = 'good'
                break;
            case '3':
                type = 'share'
                break
            case '4':
                type = 'ask'
                break;
            case '5':
                type = 'job'
                break;
            case '6':
                type = 'dev'
                break;
            default:
        }
        pageIndex = 1
        const res = await server.cnodeList(pageIndex, type)
        Toast.hide()
        this.initData = [...res]
        await this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.initData),
        });
    }
    onEndReached = async (event) => {
        //  首先判断出this.state.pages(总页数)，然后根据当前页去做比较，判断是否还有下一页
        // if(pageIndex >= this.state.pages){
        //     this.setState({
        //         hasMore: false,
        //         isLoading: false
        //     })
        //     return
        // }
        console.log(this.refs.lv.refs.listview.scrollProperties.offset)
        if (this.state.isLoading && this.state.hasMore) {
            return;
        }
        await this.setState({ isLoading: true });
        const res = await server.cnodeList(++pageIndex, type)
        this.initData = this.initData.concat(res)
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.initData),
            isLoading: false
        });
    }
    onRefresh = async () => {
        if (!this.manuallyRefresh) {
            this.setState({ refreshing: true });
        } else {
            this.manuallyRefresh = false;
        }
        pageIndex = 1
        const res = await server.cnodeList(pageIndex, type)
        this.initData = res
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.initData),
            refreshing: false
        });
        console.log('onRefresh');
    }
    onContentSizeChange = async ()=> {
        console.log(222)
    }
    render() {
        if(this.initData.length == 0){
            return (
                <div>
                    <Header />
                    <Navbar callbacks={ this.onTabCallback.bind(this) } />
                    <Loading />加载中
                </div>
            )
        }
        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID}>
                    <div className="cnode-container">
                        <ul>
                            <li>
                                <div className="cnode-user">
                                    <img src={rowData.author.avatar_url} />
                                    <span>{rowData.author.loginname}</span>
                                </div>
                                <div className="cnode-title">
                                    <p><span className={ rowData.top ? 'redbg' : 'hide' }>置顶</span><span>{rowData.tab == 'share' ? '分享' : rowData.tab == 'ask' ? '问答' : rowData.tab == 'good' ? '精华' : '招聘'}</span>{rowData.title}</p>
                                    <p className="fz02 grey">发布日期：{rowData.create_at}</p>
                                    <p className="grey">回复／浏览量：{rowData.reply_count + '／' +  rowData.visit_count}</p>
                                </div>
                                
                            </li>
                        </ul>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <Header title="cNode" />
                <Navbar callbacks={ this.onTabCallback.bind(this) } />
                <ListView
                    ref="lv"
                    className="cnodeHeight"
                    dataSource={this.state.dataSource}
                    renderFooter={() => (<div style={{ padding: 10, textAlign: 'center' }}>
                    {this.state.isLoading ? '加载中...' : '没有更多数据'}
                    </div>)}
                    renderRow={row}
                    renderSeparator={(sectionID, rowID) => (
                    <div key={`${sectionID}-${rowID}`} style={{ backgroundColor: '#F5F5F9', height: 8 }} />
                    )}
                    initialListSize={10}
                    pageSize={10}
                    scrollRenderAheadDistance={2000}
                    scrollEventThrottle={20}
                    onEndReached={this.onEndReached.bind(this)}
                    onEndReachedThreshold={1000}
                    style={{
                        height: this.state.height + 'px',
                        overflow: 'auto'
                    }}
                    contentContainerStyle={{ position: 'relative' }}
                    scrollerOptions={{ scrollbars: true }}
                    refreshControl={<RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh.bind(this)}
                    />}
                />
            </div>
        )
    }
}