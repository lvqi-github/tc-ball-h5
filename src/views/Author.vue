<template>
    <div></div>
</template>

<script>
    export default {
        created() {
            let code = this.getUrlParame('code')// 截取code
            alert(code);
            if (!code) {
                //获取微信授权地址
                let reqInfo = {
                    redirectUrl: "http://23g698m374.iask.in"
                };
                this.$api.getAuthorizeUserInfoUrl(reqInfo).then(res => {
                    alert(res.value);
                    window.location.href = res.value;
                });
            }else {
                let reqInfo = {
                    code: code
                };
                this.$api.getToken(reqInfo).then(res => {
                    window.localStorage.setItem("token", res.value);
                    this.$router.push({ name: 'Index'})
                });
            }
        },
        methods: {
            // 截取code
            getUrlParame (parameName) {
                /// 获取地址栏指定参数的值
                /// <param name="parameName">参数名</param>
                // 获取url中跟在问号后面的部分
                var parames = window.location.search
                // 检测参数是否存在
                if (parames.indexOf(parameName) > -1) {
                    var parameValue = ''
                    parameValue = parames.substring(parames.indexOf(parameName), parames.length)
                    // 检测后面是否还有参数
                    if (parameValue.indexOf('&') > -1) {
                        // 去除后面多余的参数, 得到最终 parameName=parameValue 形式的值
                        parameValue = parameValue.substring(0, parameValue.indexOf('&'))
                        // 去掉参数名, 得到最终纯值字符串
                        parameValue = parameValue.replace(parameName + '=', '')
                        return parameValue
                    }
                    return ''
                }
            }
        }
    }
</script>