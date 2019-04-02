import axios from './http'

export const getAuthorizeUserInfoUrl = params => {
    return axios({
        url: '/weChatAuth/getAuthorizeUserInfoUrl',
        method: 'get',
        params: params
    })
}

export const getToken = params => {
    return axios({
        url: '/weChatAuth/getToken',
        method: 'get',
        params: params
    })
}

export const getUserInfo = params => {
    return axios({
        url: '/weChatAuth/getUserInfo',
        method: 'get',
        params: params
    })
}

//---------------------------------- 首页 ----------------------------------------
export const getNewestArticleList = params => {
    return axios({
        url: '/index/getNewestArticleList',
        method: 'get',
        params: params
    })
}

export const getArticleDetail = params => {
    return axios({
        url: '/index/getArticleDetail',
        method: 'get',
        params: params
    })
}

//---------------------------------- 分类 ----------------------------------------
export const getAuthorList = params => {
    return axios({
        url: '/category/getAuthorList',
        method: 'get',
        params: params
    })
}

export const getAuthorArticleList = params => {
    return axios({
        url: '/category/getAuthorArticleList',
        method: 'get',
        params: params
    })
}

//---------------------------------- 战绩 ----------------------------------------
export const getHitRecordList = params => {
    return axios({
        url: '/statistic/getHitRecordList',
        method: 'get',
        params: params
    })
}

export const getHitRecordDetail = params => {
    return axios({
        url: '/statistic/getHitRecordDetail',
        method: 'get',
        params: params
    })
}

//---------------------------------- 个人中心 ----------------------------------------
export const getMemberRechargeRecordList = params => {
    return axios({
        url: '/personal/getMemberRechargeRecordList',
        method: 'get',
        params: params
    })
}

export const getArticlePurchaseRecordList = params => {
    return axios({
        url: '/personal/getArticlePurchaseRecordList',
        method: 'get',
        params: params
    })
}

export const getMemberInfo = params => {
    return axios({
        url: '/personal/getMemberInfo',
        method: 'get',
        params: params
    })
}

export const getMemberRechargePackageList = params => {
    return axios({
        url: '/personal/getMemberRechargePackageList',
        method: 'get',
        params: params
    })
}

export const getSubscribeSetupList = params => {
    return axios({
        url: '/personal/getSubscribeSetupList',
        method: 'get',
        params: params
    })
}

export const subscribeAuthor = params => {
    return axios({
        url: '/personal/subscribeAuthor',
        method: 'post',
        data: params
    })
}

export const unSubscribeAuthor = params => {
    return axios({
        url: '/personal/unSubscribeAuthor',
        method: 'post',
        data: params
    })
}

export default {
    getAuthorizeUserInfoUrl,
    getToken,
    getUserInfo,
    getNewestArticleList,
    getArticleDetail,
    getAuthorList,
    getAuthorArticleList,
    getHitRecordList,
    getHitRecordDetail,
    getMemberRechargeRecordList,
    getArticlePurchaseRecordList,
    getMemberInfo,
    getMemberRechargePackageList,
    getSubscribeSetupList,
    subscribeAuthor,
    unSubscribeAuthor
}