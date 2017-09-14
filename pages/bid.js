import React from 'react';
import { RefreshControl, ListView, Carousel, SwipeAction, Button } from 'antd-mobile';
import { bindActionCreators } from 'redux'
import { initStore, getAllData, getPageTotle } from '../store'
import withRedux from 'next-redux-wrapper'
import { getFetch } from '../server/cFetch'

import Router from 'next/router'

import Header from '../components/Header'

import { localItem , removeLocalItem } from '../tool/Util'
import Loading from '../tool/Loading'

let pageIndex = 1;

//滚动到记录的位置方法
const returnTop = (con)=> {
    if (localItem('scrollPosition')) {
        if (!con.refs.lv) return;
        try {
            con.refs.lv.refs.listview.refs.listviewscroll.refs.ScrollView.scrollTop = localItem('scrollPosition');
        }
        catch (e) {}
        removeLocalItem('scrollPosition');
    }
};

class Demo extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    // this.initData = [];
    // for (let i = 0; i < 20; i++) {
    //   this.initData.push(`r${i}`);
    // }
    this.state = {
        dataSource: dataSource,
        isLoading: true,
        refreshing: false,
        pageTotle: 0,
        hasMore: true,
        height: 0
    }
    // this.state = {
    //   dataSource: dataSource.cloneWithRows(this.initData),
    //   refreshing: false,
    //   isLoading: false,
    // };
  }
//   componentDidMount() {
//     this.props.changeTitle('Stage 1');
//   }
    componentWillMount() {
        if(pageIndex == this.props.pages){
            this.setState({
                isLoading: false,
                hasMore: false,
                
            })
        }
    }
      async componentDidMount() {
        if(this.props.dataList.length == 0){
            const res = await this.resolveData(1)
            const pagesTotle = Math.ceil(res.totalCount / res.pageSize)
            this.props.getPageTotle(pagesTotle)
            this.props.getAllData(res.items)
            this.setState({
                isLoading: false,
                pageTotle: pagesTotle
            })
        }else{
            if(pageIndex >= this.props.pages){
                this.setState({
                    isLoading: false,
                    hasMore: false
                })
            }else{
                this.setState({
                    isLoading: false,
                    hasMore: true
                })
            }
        }
        // this.manuallyRefresh = true;
        // setTimeout(() => this.setState({ refreshing: true }), 10);

        // Set the appropriate height
        returnTop(this);
    }
      async resolveData(page) {
        const res = await getFetch('http://localhost:8080/test/integrationPlatform/bids', {
            keyType: 3,
            keyValue: '',
            status: ['BIDDING'],
            productCategory: 'P001',
            currentPage: 1,
            pageSize: 10,
            currentPage: page
        })
        if(res.code == '200000'){
            return res.data
        }
    }
      //返回记录滚动位置三件套2-针对浏览器返回按钮情况：
    componentDidUpdate() {
        returnTop(this);
    }
  //返回记录滚动位置三件套3-记录离开时的滚动条位置：
    componentWillUnmount() {
        localItem('scrollPosition', this.refs.lv.refs.listview.scrollProperties.offset);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.dataList.length != nextProps.dataList.length);
    }
  onEndReached = async (event) => {
    if(pageIndex >= this.props.pages){
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
    this.setState({ isLoading: true });
    this.setState({ isLoading: true });
    const res = await this.resolveData(++pageIndex)
    this.props.getAllData(res.items)
    this.setState({
        hasMore: true,
        isLoading: false,
        refreshing:false,
    })
  }
  onRefresh = async () => {
    console.log('onRefresh');
    if (!this.manuallyRefresh) {
      this.setState({ refreshing: true });
    } else {
      this.manuallyRefresh = false;
    }
    pageIndex = 1
      const res = await this.resolveData(pageIndex)
    this.props.getAllData([])
    this.rData = res.items
    this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        refreshing: false,
        isLoading: false,
        hasMore: true
    })
  }
  render() {
    if(!this.props.dataList.length){
        return (
            <div>
                <Header title="消费贷" icodown="true"/>
                <Loading />
            </div>
        )
    }
      const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    )
    const row = (rowData, sectionID, rowID) => {
        const { history, percentage } = this.props
        const percentageTotle = (100 - parseInt((rowData.leftTenderAmount / rowData.bidAmount) * 100))+ '%'
        return (
            <div className="view"  key={rowID}>
                <ul id="consumerloans-list" className="xui-list-back marginnone">
                    <li className={rowData.status.code == 'BIDDING' ? '' : 'stoped'}  onClick={()=> {
                                        Router.push({pathname: '/consumes/detail', query: {bidCode:rowData.bidCode}})}}>
                        <h3 className="ew ew-fix">
                            <b className="this-title"><i className="xui-bubble" data-theme="default" data-co="main">消</i>{rowData.bidName}</b>
                            <span className="surplus-a ml ar co-back">剩余可投<span>{rowData.leftTenderAmount}</span>万</span>
                        </h3>
                        <ul className="progress-bar ew nh8x">
                            <li className="col-10"><span className="xui-progress-bar" data-theme="default" data-co="main"><b style={{width: percentageTotle }}></b></span></li>
                            <li className="nl1e nr1x"><span className="xui-bubble" data-theme="arrow" data-pos="left" data-co="main">{percentageTotle}</span></li>
                        </ul>
                        <ul className="this-info ew ew-fix w100 vb-z">
                            <li>
                                <h1 className="co-danger h2e5"><em className="s2e">{rowData.plannedAnnualRate}</em>%</h1>
                                <p className="co-back">年化收益</p>
                            </li>
                            <li>
                                <h1 className="h2e5 vb">{rowData.leastPeriodValue } { rowData.leastPeriodType == 'MONTH' ? '个月' : '' } { rowData.leastPeriodType == 'YEAR' ? '年' : '' } { rowData.leastPeriodType == 'DAY' ? '天' : '' }</h1>
                                <p className="co-back">期限</p>
                            </li>
                            <li className="ar">
                                <button className="tobuy xui-btn lm mb2x" data-co="warn" data-sz="s" onClick={()=> {
                                        Router.push({pathname: '/consumes/detail', query: {bidCode:rowData.bidCode}})
                                }}>立即抢购</button>
                                <div className="surplus-b al">
                                    <h1 className="h2e5 vb">0.00元</h1>
                                    <p className="co-back">剩余可投</p>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    };
    return (
      <div>
      <Header title="消费贷" icodown="true" />
      <ListView
        dataSource={this.state.dataSource.cloneWithRows(this.props.dataList)}
        renderHeader={() => <div>
          <div>ListView + RefreshControl + SwipeAction</div>
          <Button inline onClick={() => {
            this.manuallyRefresh = true;
            this.setState({ refreshing: true });
          }}>refresh data</Button>
        </div>}

        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : 'Loaded'}
        </div>)}
        className="homeList"
        renderRow={row}
            renderSeparator={separator}
        // renderRow={(rowData, sectionID, rowID) => {
        //   return (
        //     <div key={rowID} style={{ padding: 10 }}>
        //       <div>{rowData}</div>
        //       {Number(rowID) % 2 === 0 ? '111' : <SwipeAction
        //         autoClose
        //         right={[
        //           {
        //             text: 'Cancel',
        //             onPress: () => console.log('cancel'),
        //             style: { backgroundColor: '#ddd', color: 'white' },
        //           },
        //           {
        //             text: 'Delete',
        //             onPress: () => console.log('delete'),
        //             style: { backgroundColor: '#F4333C', color: 'white' },
        //           },
        //         ]}
        //       >
        //         <div style={{ padding: 40, backgroundColor: '#f1f1f1' }}>drag left</div>
        //       </SwipeAction>}
        //     </div>
        //   );
        // }}
        // renderSeparator={(sectionID, rowID) => (
        //   <div key={`${sectionID}-${rowID}`} style={{ backgroundColor: '#F5F5F9', height: 8 }} />
        // )}
        // initialListSize={10}
        initialListSize={this.props.dataList.length}
        pageSize={10}
        scrollRenderAheadDistance={200}
        scrollEventThrottle={20}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
        style={{
          height: (document.documentElement.clientHeight - 48) + 'px',
          overflow: 'auto',
          border: '1px solid #ddd'
        }}
        contentContainerStyle={{ position: 'relative' }}
        scrollerOptions={{ scrollbars: true }}
        refreshControl={<RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}ƒ
        />}
      />
      </div>
    );
  }
}

const mapStateToProps = ({ pages, dataList  }) => ({ pages, dataList })

const mapDispatchToProps = (dispatch) => {
  return {
    getAllData: bindActionCreators(getAllData, dispatch),
    getPageTotle: bindActionCreators(getPageTotle, dispatch)
  }
}



export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Demo)
