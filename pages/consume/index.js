import React, { Component } from 'react'
import { RefreshControl, ListView, Carousel, SwipeAction, Button, Progress } from 'antd-mobile'
import Router from 'next/router'
import Link from 'next/link'
import Loading from '../../tool/Loading'
import server from '../../server/index'
import { getFetch } from '../../server/cFetch'
import Api from '../../server/api'
import Header from '../../header/consumeHead'
import fetch from 'isomorphic-fetch'

let pageIndex = 1
export default class Index extends Component {
    static async getInitialProps() {
        const res = await server.consumeList(1)
        const pagesTotle = Math.ceil(res.totalCount / res.pageSize)
        return {
            pages: pagesTotle,
            shows: res.items
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
            pages: this.props.pages,
            percent: 50,
            height: 0
        }
    }
    async componentDidMount() {
        this.setState({
            height: document.documentElement.clientHeight - 45
        })
    }
    onEndReached = async (event) => {
        if(pageIndex >= this.state.pages){
            this.setState({
                hasMore: false,
                isLoading: false
            })
            return
        }
        if (this.state.isLoading && this.state.hasMore) {
            return;
        }
        await this.setState({ isLoading: true });
        const res = await server.consumeList(++pageIndex)
        this.initData = this.initData.concat(res.items)
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
        const res = await server.consumeList(pageIndex)
        this.initData = res.items
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.initData),
            refreshing: false
        });
        console.log('onRefresh');
    }
    render() {
        if(this.initData.length == 0){
            return (
                <div>
                    <Header />
                    <Loading />加载中
                </div>
            )
        }
        const row = (rowData, sectionID, rowID) => {
            const percentageTotle = parseInt(100 - ((rowData.leftTenderAmount / rowData.bidAmount) * 100))
            return (
                <div key={rowID}>
                    <div className="con-container">
                        <ul>
                            <li className={rowData.status.code == 'BIDDING' ? '' : 'stoped'}>
                                <Link as={`/consume/info/${rowData.bidCode}`} href={`/consume/info?id=${rowData.bidCode}`}>
                                    <div>    
                                <div className="con-listtop">
                                        <p><i className="con-xiao">宜</i>{rowData.bidName}</p>
                                        <span>剩余可投：{rowData.leftTenderAmount}</span>
                                    </div>
                                    <div className="show-info">
                                        <div className="progress"><Progress percent={percentageTotle} position="normal" /></div>
                                        <div>{percentageTotle}%</div>
                                    </div>
                                    <div className="con-flex">
                                        <div className="con-flexleft">
                                            <b>{rowData.plannedAnnualRate}<i>%</i></b>
                                            <span>年化收益</span>
                                        </div>
                                        <div className="con-flexcenter">
                                            <b>{rowData.leastPeriodValue} {rowData.leastPeriodType == 'MONTH' ? '个月' : rowData.leastPeriodType == 'DAY' ? '天' : '年'}</b>
                                            <span>期限</span>
                                        </div>
                                        <div className="con-flexcenter disnone">
                                            <b>0.00元</b>
                                            <span>剩余可投</span>
                                        </div>
                                        <div className="con-flexright disblock">
                                            <Button>立即抢购</Button>
                                        </div>
                                    </div>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        }
        
        return (
            <div>
                <Header title="新宜贷" />
                <ListView
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
                        overflow: 'auto',
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