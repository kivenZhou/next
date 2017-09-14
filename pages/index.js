import React, { Component } from 'react'
import { RefreshControl, ListView, Carousel, SwipeAction, Button, Progress } from 'antd-mobile'
import Loading from '../tool/Loading'
import { getFetch } from '../server/cFetch'
import Header from '../components/Header'
let pageIndex = 1
class Index extends Component {
    constructor(props) {
        super(props)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
        this.initData = [];
        // for (let i = 0; i < 20; i++) {
        // this.initData.push(`r${i}`)
        // }
        this.state = {
            dataSource: dataSource.cloneWithRows(this.initData),
            hasMore: true,
            refreshing: false,
            isLoading: false,
            pages: 0,
            percent: 50
        }
    }
    async componentDidMount() {
        const res = await this.serverList(1)
        const pagesTotle = Math.ceil(res.totalCount / res.pageSize)
        this.initData = res.items
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.initData),
            pages: pagesTotle
        })
    }
    async serverList(index) {
        const res = await getFetch('/time/integrationPlatform/bids',{
            keyType: 3,
            keyValue: '',
            status: '["BIDDING","REPAYING","SATISFIED_BID","REPAY_OVER"]',
            productCategory: 'P001',
            currentPage: 1,
            pageSize: 10,
            currentPage: index
        })
        if(res.code == '200000'){
            return res.data
        }
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     return (this.state.refreshing != nextState.refreshing);
    // }
    onEndReached = async (event) => {
        if(pageIndex >= this.state.pages){
            this.setState({
                hasMore: false,
                isLoading: false
            })
            return
        }
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && this.state.hasMore) {
            return;
        }
        console.log('reach end', event, this.state.dataSource);
        await this.setState({ isLoading: true });

        const res = await this.serverList(++pageIndex)
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
        const res = await this.serverList(pageIndex)
        this.initData = res.items
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.initData),
            refreshing: false
        });
        console.log('onRefresh');
    }
    render() {
        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID}>
                    <div className="con-container">
                        <ul>
                            <li>
                                <div className="con-listtop">
                                    <p><i className="con-xiao">消</i>{rowData.bidName}</p>
                                    <span>剩余可投：{rowData.leftTenderAmount}</span>
                                </div>
                                <div className="show-info">
                                    <div className="progress"><Progress percent={this.state.percent} position="normal" /></div>
                                    <div>{this.state.percent}%</div>
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
                                    <div className="con-flexright">
                                        <Button>立即抢购</Button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        }
        if(this.initData.length == 0){
            return (
                <div>
                    <Header />
                    <Loading />加载中
                </div>
            )
        }
        return (
            <div>
                <Header />
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
                        height: (document.documentElement.clientHeight - 48) + 'px',
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

export default Index