<template>
    <div>
        <van-nav-bar title="文章详情" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>

        <div>
            <div class="detail-title">
                {{article.articleTitle}}
            </div>
            <div class="detail-time">
                发布时间：{{article.created}}
            </div>
        </div>

        <div v-if="viewPermission" class="detail">
            <img v-if="article.articleContentImg" :src="article.articleContentImg">
            <p v-else v-html="article.articleContentText"></p>
        </div>
        <div v-else class="detail">
            <img v-if="article.articlePreviewImg" :src="article.articlePreviewImg">
            <p v-else v-html="article.articlePreviewText"></p>
            <van-button round type="danger" @click="articlePay" style="width: 220px; height: 40px">查看解读需支付：{{article.price}}元</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                viewPermission: false,
                article:{

                },
                wcPay: {

                }
            }
        },
        created() {
            this.init();
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            },
            init(){
                this.$toast.loading({
                    duration: 0,       // 持续展示 toast
                    forbidClick: true, // 禁用背景点击
                    message: '加载中...'
                });

                let reqInfo={
                    articleId: this.$route.query.articleId
                }
                this.$api.getArticleDetail(reqInfo).then(res => {
                    if(res.resultCode == "1000"){
                        this.viewPermission = res.value.viewPermission;
                        this.article = res.value.articleDetail;
                    }
                    this.$toast.clear();
                });
            },
            articlePay() {
                this.$toast.loading({
                    duration: 0,       // 持续展示 toast
                    forbidClick: true, // 禁用背景点击
                    message: '处理中...'
                });
                let reqInfo={
                    articleId: this.article.articleId
                };
                this.$api.articlePurchasePay(reqInfo).then(res => {
                    this.$toast.clear();
                    if(res.resultCode == "1000"){
                        this.wcPay = res.value;

                        if (typeof WeixinJSBridge == "undefined"){
                            if( document.addEventListener ){
                                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                            }else if (document.attachEvent){
                                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                            }
                        }else{
                            this.onBridgeReady();
                        }
                    }
                });
            },
            onBridgeReady() {
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                        "appId": this.wcPay.appId, // 公众号名称，由商户传入
                        "timeStamp": this.wcPay.timeStamp, // 时间戳，自1970年以来的秒数
                        "nonceStr": this.wcPay.nonceStr, // 随机串
                        "package": this.wcPay.packages,
                        "signType": this.wcPay.signType, // 微信签名方式
                        "paySign": this.wcPay.paySign //微信签名
                    },
                    function(res){
                        if(res.err_msg == "get_brand_wcpay_request:ok" ){
                            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                            window.location.href = window.location.href.split('#')[0] + '#/articlePurchaseRecord';
                        }else if (res.err_msg == "get_brand_wcpay_request:cancel" ){
                            alert('支付取消');
                        }else {
                            alert('支付失败');
                        }
                    }
                );
            }
        }
    }
</script>

<style scoped>
    .detail-title {
        font-size: 20px;
        font-weight: bold;
        text-align:center;
        padding: 10px 0;
        margin: 0 10px;
        border-bottom: 1px solid #999;
    }
    .detail-time {
        font-size: 12px;
        color: #999;
        text-align:center;
        margin-top: 10px;
        margin-bottom: 20px;
    }
    .detail{
        margin: 0 10px 50px;
        text-align: center;
    }
    .detail p {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }
    .detail img{
        width: 100%;
        height:auto;
        margin-bottom: 20px;
    }
</style>