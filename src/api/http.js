import axios from 'axios'
import qs from 'qs'
import router from '../router'
import { setBaseUrl } from './config.js'

import { Notify } from 'vant';

axios.defaults.baseURL = setBaseUrl();
axios.defaults.timeout = 10000;

/**
 * 请求拦截器
 */
axios.interceptors.request.use(config => {
    // 从localStorage获取token
    let token = window.localStorage.getItem("token");
    config.headers.common['Authorization'] = `${token}`;

    if (config.method.toLocaleLowerCase() === 'post') {
        config.data = qs.stringify(config.data)
    }
    return config
}, error => {
    return Promise.reject(error);// 错误提示
})

/**
 * 响应拦截器
 */
axios.interceptors.response.use(response => {
    let res = response.data;
    if (res.resultCode != "1000") {
        switch (res.resultCode) {
            case '1501': // 重新授权
                router.replace({ name: 'Author'});
                break;
            default:
                Notify(res.resultCode + '服务器繁忙，请稍后再试');
                break;
        }
    }
    return response.data;
}, error => {
    return Promise.reject(error)
})

export default axios