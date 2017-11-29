// let devHttp = '/'
// if(process.env.NODE_ENV == 'development'){
const devHttp = 'http://localhost:8080/test/'
const cnodeHttp = 'https://cnodejs.org/api/v1'
// }
const urlParams = {
    consumeList: devHttp + '/integrationPlatform/bids/',                            //..借款获取产品详情
    cnodeList: cnodeHttp + '/topics',
    cnodeArticle: cnodeHttp + '/topic/',
    cnodeUser: cnodeHttp + '/accesstoken',
    cnodeUserInfo: cnodeHttp + '/user/',
    cnodeTopics: cnodeHttp + '/topics',
    cnodeUpdate: cnodeHttp + '/topics/update',
    cnodeCollect: cnodeHttp + '/topic_collect/collect',
    cnodeDeCollect: cnodeHttp + '/topic_collect/de_collect',
    cnodeCollectList: cnodeHttp + '/topic_collect/',
    cnodeReply: cnodeHttp + '/topic/',
}
// const repeatUrl = {}
// for(let i in urlParams){
//     urlParams[i] = devHttp + urlParams[i]
// }

export default urlParams