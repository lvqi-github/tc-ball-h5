import axios from 'axios'
import qs from 'qs'
import { setBaseUrl } from './config.js'

axios.defaults.baseURL = setBaseUrl();
axios.defaults.timeout = 10000;

/**
 * 请求拦截器
 */
axios.interceptors.request.use(config => {
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
    return response.data;
}, error => {
    return Promise.reject(error)
})

export default axios