import CryptoJS from "crypto-js";

export function sign(params,appSecret){
    // 去掉空参数
    let arr = [];
    for (let key in params) {
        if ((typeof params[key]) != 'object' && params[key] !== null && params[key] !== undefined && params[key] !== '') {
            let tmp = [key, params[key]];
            arr.push(tmp)
        }
    }
    // 字典升序
    arr.sort();

    //拼装字符串
    let paramSignStr = "";
    for (let i = 0; i < arr.length; i++ ) {
        if (i == arr.length - 1){
            paramSignStr += arr[i][0] + "=" + arr[i][1];
        }else {
            paramSignStr += arr[i][0] + "=" + arr[i][1] + "&";
        }
    }

    //前后加上appSecret
    paramSignStr = appSecret + paramSignStr + appSecret;

    //MD5加密
    let sign = CryptoJS.MD5(paramSignStr).toString();

    return  sign;
}