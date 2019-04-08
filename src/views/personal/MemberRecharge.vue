<template>
    <div class="member-recharge">
        <van-nav-bar title="会员充值" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>

        <div class="m-box">
            <div class="m-pay-userCard">
                <div class="userCard-pic">
                    <img :src="avatar" width="40" height="40">
                </div>
                <div class="userCard-cont">
                    <div class="user-title">
                        <a href="javascript:void(0);" class="c-user-link">{{name}}</a>
                    </div>
                    <div class="c-des">{{memberInfo}}</div>
                </div>
            </div>
        </div>

        <div class="m-box">
            <div class="m-pay-setMeal">
                <div class="pay-money-title">
                    <div class="info">
                        <span>VIP会员</span>
                    </div>
                </div>

                <div class="setMeal-wrap">
                    <ul class="pay-date-list">
                        <li style="height: auto;" v-for="item in rechargePackageList" :key="item.packageId" :class="item.packageId == selectPackageId ? 'selected' : ''" @click="packageClick(item)">
                            <div class="date-item">
                                <div class="c-title">{{item.packageDesc}}</div>
                                <div class="c-money"><span>¥</span>{{item.price}}</div>
                                <div class="c-time">折合￥{{item.dailyPrice}}/日</div>
                                <div v-if="item.specialCombo" class="lable">
                                    <van-icon name="thumb-circle-o" color="#fff" size="14px"
                                              style="vertical-align: middle; margin-right: 2px"/>
                                    超值套餐
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="pay-text-info">
                    <div class="text-info">
                        <span>会员有效期范围说明：从开通时刻(精确至秒) 至 增加天数后的当日时刻(精确至秒)。
                            例如：2019-03-16 13:34:45 购买7日会员，则有效期结束时间为2019-03-23 13:34:45。
                            其余套餐以此类推，敬请悉知</span>
                        <van-icon name="info-o" color="#999" size="16px"
                                  style="vertical-align: middle; margin-left: 5px; font-weight: bold"/>
                    </div>
                </div>
            </div>
        </div>

        <van-submit-bar :price="selectPackageCentPrice" button-text="确认支付" @submit="onSubmit">
            <span slot="tip" style="color: #666;">
                您已选择VIP会员，{{selectPackageDesc}}
            </span>
        </van-submit-bar>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                memberInfo: '',
                selectPackageId: '',
                selectPackageDesc: '',
                selectPackageCentPrice: 0,
                rechargePackageList: [],
                wcPay: {

                }
            }
        },
        computed: {
            ...mapGetters([
                'name',
                'avatar'
            ])
        },
        created() {
            this.initMemberInfo();
            this.initMemberRechargePackageList();
        },
        methods: {
            initMemberInfo() {
                let self = this;
                this.$api.getMemberInfo(null).then(res => {
                    if(res.resultCode == "1000"){
                        if (res.value.status == 1) {
                            self.memberInfo = "您还未开通VIP会员";
                        }else if(res.value.status == 2) {
                            self.memberInfo = "您的VIP会员已过期";
                        }else if(res.value.status == 3) {
                            self.memberInfo = res.value.memberEndDate + "到期";
                        }
                    }
                });
            },
            initMemberRechargePackageList() {
                let self = this;
                this.$api.getMemberRechargePackageList(null).then(res => {
                    if(res.resultCode == "1000" && res.totalElements > 0){
                        self.selectPackageId = res.value.selectPackageId;
                        self.selectPackageDesc = res.value.selectPackageDesc;
                        self.selectPackageCentPrice = res.value.selectPackageCentPrice;
                        self.rechargePackageList = res.value.rechargePackageList;
                    }
                });
            },
            packageClick(item) {
                let self = this;
                self.selectPackageId = item.packageId;
                self.selectPackageDesc = item.packageDesc;
                self.selectPackageCentPrice = item.centPrice;
            },
            onClickLeft() {
                this.$router.go(-1)
            },
            onSubmit() {
                this.$toast.loading({
                    duration: 0,       // 持续展示 toast
                    forbidClick: true, // 禁用背景点击
                    message: '处理中...'
                });
                let reqInfo={
                    rechargePackageId: this.selectPackageId
                };
                this.$api.memberRechargePay(reqInfo).then(res => {
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
                            this.$router.push( '/paySuccess');
                        }else if (res.err_msg == "get_brand_wcpay_request:cancel" ) {
                            this.$toast('支付取消');
                        } else {
                            this.$toast('支付失败');
                        }
                    }
                );
            }
        }
    }
</script>

<style scoped>
    .member-recharge {
        font-family: "Helvetica Neue", helvetica, arial, sans-serif;
    }
    .m-box {
        margin-top: 0;
        margin-bottom: 0;
        padding-left: 0;
        padding-right: 0;
        background-color: #fff;
    }

    .m-pay-userCard {
        display: -moz-box;
        display: -webkit-box;
        -moz-box-align: center;
        -webkit-box-align: center;
        box-align: center;
        height: 70px;
        background: -moz-linear-gradient(-90deg, #38383b, #323235);
        background: -webkit-linear-gradient(-90deg, #38383b, #323235);
    }

    .m-pay-userCard .userCard-pic {
        padding: 14px 8px 14px 11px;
        display: block;
    }

    .m-pay-userCard .userCard-pic img {
        width: 40px;
        height: 40px;
        border-radius: 100%;
    }

    img {
        border: none;
        vertical-align: top;
    }

    .m-pay-userCard .userCard-cont {
        -moz-box-flex: 1;
        -webkit-box-flex: 1;
        box-flex: 1;
    }

    .m-pay-userCard .user-title {
        height: 25px;
        line-height: 25px;
        font-size: 0;
    }

    .m-pay-userCard .user-title .c-user-link {
        font-size: 17px;
        color: #fff;
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
        vertical-align: top;
    }

    .m-pay-userCard .c-des {
        line-height: 16px;
        font-size: 12px;
        color: #999;
    }

    /*-------------分割线------------*/
    .m-pay-setMeal {
        padding-top: 3px;
        padding-bottom: 14px;
    }

    .m-pay-setMeal .pay-money-title {
        display: -moz-box;
        display: -webkit-box;
        padding-left: 15px;
        padding-right: 10px;
    }

    .m-pay-setMeal .pay-money-title .info {
        -moz-box-flex: 1;
        -webkit-box-flex: 1;
        box-flex: 1;
        display: block;
        line-height: 45px;
        font-size: 16px;
        font-weight: bold;
    }

    .m-pay-setMeal .setMeal-wrap {
        padding-top: 8px;
    }

    .m-pay-setMeal .setMeal-wrap .pay-date-list {
        display: -moz-box;
        display: -webkit-box;
        padding: 0 2.4%;
    }

    ul, ol {
        list-style: none;
    }

    .m-pay-setMeal .setMeal-wrap .pay-date-list li {
        position: relative;
        -moz-box-flex: 1;
        -webkit-box-flex: 1;
        box-flex: 1;
        width: 28.667%;
        margin: 0 1.6%;
    }

    .m-pay-setMeal .setMeal-wrap .pay-date-list li.selected .date-item {
        border: 1px solid #e9c285;
        background: #fffaf2;
    }

    .m-pay-setMeal .setMeal-wrap .pay-date-list li .date-item {
        height: 130px;
        text-align: center;
        border-radius: 3px;
        border: 1px solid #e4e4e4;
        box-sizing: border-box;
    }

    .m-pay-setMeal .setMeal-wrap .pay-date-list li .date-item .c-title {
        font-size: 18px;
        color: #666;
        font-weight: bold;
        line-height: 20px;
        padding: 5px 0;
        margin-top: 11px;
    }

    .m-pay-setMeal .setMeal-wrap .pay-date-list li .date-item .c-money {
        font-size: 25px;
        color: #b27a5c;
        font-weight: bold;
        line-height: 28px;
    }

    .m-pay-setMeal .setMeal-wrap .pay-date-list li .date-item .c-money span {
        color: #c07c57;
        font-size: 13px;
        margin-right: 1px;
        font-weight: normal;
    }

    .m-pay-setMeal .setMeal-wrap .pay-date-list li .date-item .c-time {
        font-size: 11px;
        color: #999;
        margin-bottom: 6px;
        height: 13px;
        line-height: 13px;
    }

    .m-pay-setMeal .setMeal-wrap .pay-date-list li .date-item .lable {
        font-size: 10px;
        color: #fff;
        background: #dcbb88;
        margin: 0 10px;
        padding: 0 8px;
        line-height: 18px;
        font-weight: bold;
        border-radius: 25px;
    }

    .m-pay-setMeal .pay-text-info {
        position: relative;
        padding: 13px 15px 0;
    }

    .m-pay-setMeal .pay-text-info .text-info {
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: #666;
        display: inline-block;
    }

</style>