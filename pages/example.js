import React from 'react';
import { RefreshControl, ListView, Carousel, SwipeAction, Button } from 'antd-mobile';
import Header from '../components/Header'

let pageIndex = 0;

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.initData = [];
    for (let i = 0; i < 20; i++) {
      this.initData.push(`r${i}`);
    }
    this.state = {
      dataSource: dataSource.cloneWithRows(this.initData),
      refreshing: false,
      isLoading: false,
    };
  }
//   componentDidMount() {
//     this.props.changeTitle('Stage 1');
//   }
    // shouldComponentUpdate(nextProps, nextState) {
    //     return (this.state.refreshing != nextState.refreshing);
    // }
  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event, this.state.dataSource);
    this.setState({ isLoading: true });
    setTimeout(() => {
      for (let index = 0; index < 5; index++) {
        this.initData = this.initData.concat(`onLoadData Data ${pageIndex++}`);
      }
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.initData),
        isLoading: false,
      });
    }, 1000);
  }
  onRefresh = () => {
    console.log('onRefresh');
    if (!this.manuallyRefresh) {
      this.setState({ refreshing: true });
    } else {
      this.manuallyRefresh = false;
    }
    setTimeout(() => {
      this.initData = [`onRefresh Data ${pageIndex++}`, ...this.initData];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.initData),
        refreshing: false,
      });
    }, 1000);


  }
  render() {
    return (
        <div>
            <Header />
            <ListView
                dataSource={this.state.dataSource}
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
                renderRow={(rowData, sectionID, rowID) => {
                return (
                    <div key={rowID} style={{ padding: 10 }}>
                    <div>{rowData}</div>
                    <p>11</p> 
                    </div>
                );
                }}
                renderSeparator={(sectionID, rowID) => (
                <div key={`${sectionID}-${rowID}`} style={{ backgroundColor: '#F5F5F9', height: 8 }} />
                )}
                initialListSize={10}
                pageSize={5}
                scrollRenderAheadDistance={200}
                scrollEventThrottle={20}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
                style={{
                height: '500px',
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
