import React, { Component } from 'react'
import { Progress } from 'antd-mobile'
import Header from '../../header/consumeHead'
import server from '../../server/index'

export default class Info extends Component {
    static async getInitialProps(content) {
        const { id } = content.query
        const res = await server.consumeInfo(id)
        return {
            shows: id,
            importInfo: res
        }
    }
    changeMoney(val) {
        if(val){
            var changeMoney = 0
            const ractMoney = Number(val).toFixed(2)
            changeMoney = ractMoney.split('.');
            changeMoney[0] = changeMoney[0].replace(/(\d)(?=(\d{3})+$)/g,'$1,');
            changeMoney = changeMoney.join('.');
            return changeMoney
        }
    }
    render() {
        const { importInfo } = this.props
        const percentageTotle = parseInt(100 - ((importInfo.leftTenderAmount / importInfo.bidAmount) * 100))
        return (
            <div>
                <Header title="标的详情" />
                <div className="info-contant">
                    <div className="info-top">
                        <h3>{importInfo.bidName}</h3>
                        <p><b>{importInfo.status.message}</b></p>
                    </div>
                    <div className="info-bottom">
                        <ul>
                            <li>
                                <p>剩余可投金额：<span className="red fs15">{importInfo.leftTenderAmount == 0 ? 0 : this.changeMoney(importInfo.leftTenderAmount)}</span> <i>元</i></p>
                            </li>
                            <li className="tabel-cell">
                                <b>进度：</b>
                                <div className="det-info">
                                    <div className="table-cell">
                                        <div className="progress"><Progress percent={percentageTotle} position="normal" /></div>
                                        <div>{percentageTotle}%</div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <p>年化收益：<span className="red fs10">{importInfo.plannedAnnualRate}</span><i>%</i></p>
                            </li>
                            <li>
                                <p>标的期限：<span>{importInfo.leastPeriodValue}</span>{ importInfo.leastPeriodType == 'MONTH' ? '个月' : importInfo.leastPeriodType == 'DAY' ? '天' : '年' }</p>
                            </li>
                            <li>
                                <p>资金用途：{importInfo.loanPurpose.message}</p>
                            </li>
                            <li>
                                <p>起投金额：{importInfo.tenderAmountDown}元</p>
                            </li>
                            <li>
                                <p>还款方式：{importInfo.repaymentType.message}</p>
                            </li>
                            <li>
                                <p>预计起息日：{importInfo.plannedValueDate}</p>
                            </li>
                            <li>
                                <p>通用：质保服务专款计划</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}