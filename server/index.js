import { getFetch } from './cFetch'
import urlPath from './api'

const consumeList = async (index)=> {
    const res = await getFetch(urlPath.consumeList, {
        keyType: 3,
        keyValue: '',
        status: '["BIDDING","REPAYING","SATISFIED_BID","REPAY_OVER"]',
        productCategory: 'P001',
        pageSize: 10,
        currentPage: index
    })
    if(res.code == '200000'){
        return res.data
    }
}

export default { consumeList }