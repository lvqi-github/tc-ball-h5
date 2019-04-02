<template>
    <div></div>
</template>

<script>
    export default {
        created() {
            let code = this.getUrlParam('code')// 截取code
            if (!code) {
                let reqInfo = {
                    redirectUrl: window.location.href.split('#')[0]
                };
                //获取微信授权地址
                this.$api.getAuthorizeUserInfoUrl(reqInfo).then(res => {
                    if(res.resultCode == "1000"){
                        window.location.href = res.value;
                    }
                });
            }else {
                let reqInfo = {
                    code: code
                };
                this.$api.getToken(reqInfo).then(res => {
                    if(res.resultCode == "1000"){
                        window.localStorage.setItem("token", res.value);
                        this.$router.push({ name: 'Index'})
                    }
                });
            }
        },
        methods: {
            // 截取code
            getUrlParam (paramName) {
                /// 获取地址栏指定参数的值
                /// <param name="parameName">参数名</param>
                // 获取url中跟在问号后面的部分
                let params = window.location.search
                // 检测参数是否存在
                if (params.indexOf(paramName) > -1) {
                    let paramValue = ''
                    paramValue = params.substring(params.indexOf(paramName), params.length)
                    // 检测后面是否还有参数
                    if (paramValue.indexOf('&') > -1) {
                        // 去除后面多余的参数, 得到最终 parameName=parameValue 形式的值
                        paramValue = paramValue.substring(0, paramValue.indexOf('&'))
                        // 去掉参数名, 得到最终纯值字符串
                        paramValue = paramValue.replace(paramName + '=', '')
                        return paramValue
                    }
                    return ''
                }
            }
        }
    }
</script>