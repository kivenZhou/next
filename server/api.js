var devHttp = 'http://localhost:8080/time/'
if(process.env.NODE_ENV != 'development'){
    devHttp = '/'
}
const urlParams = {
    consumeList: 'integrationPlatform/bids'                              //..借款获取产品详情
}
const repeatUrl = {}
for(let i in urlParams){
    urlParams[i] = devHttp + urlParams[i]
}
export default urlParams