import { getFetch, postFetch } from './cFetch'
import urlPath from './api'
import { getCookie } from '../tool/Util'
import { Toast } from 'antd-mobile'


//  散标列表
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

//  散标详情
const consumeInfo = async (code)=> {
    const res = await getFetch(urlPath.consumeList + code, {})
    if(res.code == '200000'){
        return res.data
    }
}

//  cnode首页
const cnodeList = async (index, type)=> {
    const res = await getFetch(urlPath.cnodeList, {
        page: index,
        tab: type,
        limit: 20,
        mdrender: 'false'
    })
    if(res.success){
        return res.data
    }
}

//  cnode文章页
const cnodeArticle = async (id, status)=> {
    const res = await getFetch(urlPath.cnodeArticle + id, {
        mdrender: status,
        accesstoken: getCookie('accesstoken') || ''
    })
    if(res.success){
        return res.data
    }
}

//  cnode用户中心
const cnodeUser = async ()=> {
    const res = await postFetch(urlPath.cnodeUser, {
        accesstoken: getCookie('accesstoken') || ''
    })
    if(res.success){
        const resUser = await getFetch(urlPath.cnodeUserInfo + res.loginname, {})
        if(resUser.success){
            return resUser.data
        }
    }else{
        Toast.info('accesstoken 无效', 1);
    }
}

//  cnode发布主题
const cnodeTopics = async (obj)=> {
    const res = await postFetch(urlPath.cnodeTopics, {
        accesstoken: getCookie('accesstoken') || '',
        title: obj.title,
        tab: obj.tab.join(),
        content: obj.content
    })
    if(res.success){
        return res
    }
}

//  cnode编辑主题
const cnodeUpdate = async (obj)=> {
    const res = await postFetch(urlPath.cnodeUpdate, {
        accesstoken: getCookie('accesstoken') || '',
        topic_id: obj.topic_id,
        title: obj.title,
        tab: obj.tab.join(),
        content: obj.content
    })
    if(res.success){
        return res
    }
}

//  cnode收藏主题
const cnodeCollect = async (obj)=> {
    const res = await postFetch(urlPath.cnodeCollect, {
        accesstoken: getCookie('accesstoken') || '',
        topic_id: obj.topic_id,
    })
    if(res.success){
        return res
    }else{
        Toast.info('收藏失败', 2);
        return {
            success: false
        }
    }
}

//  cnode取消收藏主题
const cnodeDeCollect = async (obj)=> {
    const res = await postFetch(urlPath.cnodeDeCollect, {
        accesstoken: getCookie('accesstoken') || '',
        topic_id: obj.topic_id,
    })
    if(res.success){
        return res
    }
}

//  cnode收藏主题列表
const cnodeCollectList = async (name)=> {
    const res = await getFetch(urlPath.cnodeCollectList + name, {})
    if(res.success){
        return res
    }
}

//  cnode主题评论
const cnodeReply = async (obj)=> {
    const res = await postFetch(urlPath.cnodeReply + obj.topic_id + '/replies', {
        accesstoken: getCookie('accesstoken') || '',
        content: obj.content,
        reply_id: obj.reply_id || ''
    })
    if(res.success){
        return res
    }
}

export default { consumeList, consumeInfo, cnodeList, cnodeArticle, cnodeUser, cnodeTopics, cnodeUpdate, cnodeCollect, cnodeDeCollect, cnodeCollectList, cnodeReply }