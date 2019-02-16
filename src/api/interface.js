import axios from './http'

export const getAuthorizeUserInfoUrl = params => {
    return axios({
        url: '/weChatAuth/getAuthorizeUserInfoUrl',
        method: 'get',
        params
    })
}

export const getToken = params => {
    return axios({
        url: '/weChatAuth/getToken',
        method: 'get',
        params
    })
}

/**
 * 首页-获取最新文章
 * @param params
 * @returns {AxiosPromise}
 */
export const getNewestArticles = params => {
    return axios({
        url: '/index/getNewestArticles',
        method: 'get',
        params
    })
}

/**
 * 分类-获取分类列表
 * @param params
 * @returns {AxiosPromise}
 */
export const getCategoryList = params => {
    return axios({
        url: '/category/getCategoryList',
        method: 'get',
        params
    })
}

/**
 * 分类-获取文章列表
 * @param params
 * @returns {AxiosPromise}
 */
export const getCategoryArticles = params => {
    return axios({
        url: '/category/getCategoryArticles',
        method: 'get',
        params
    })
}

export default {
    getAuthorizeUserInfoUrl,
    getToken,
    getNewestArticles,
    getCategoryList,
    getCategoryArticles
}