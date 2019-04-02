<template>
    <div>
        <van-nav-bar title="VIP会员" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>

        <div class="card-w">
            <div class="cw-con">
                <div class="cw-btn">
                    <div class="cw-user">
                        <div class="user-logo">
                            <img :src="avatar">
                        </div>
                        <div>
                            <p class="user-nickname">{{name}}</p>
                            <p class="user-member">{{memberInfo}}</p>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 60px">
                    <van-button round class="member-card-btn" to="/memberRecharge">立即充值</van-button>
                </div>
            </div>
        </div>

        <div class="rights-produce-wrapper">
            <p class="rights-produce-text">
                <van-icon name="comment" color="#f5ca3a" size="18" class="rights-produce-icon"/>会员权益介绍
            </p>
            <div class="rights-produce-content">
                <p>1、VIP会员可查看所有文章内容，无需另外付费。</p>
                <p>2、客服优先处理相关咨询及系统使用过程中的问题。</p>
                <p>3、针对会员开展不定期的优惠活动。</p>
            </div>
        </div>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                memberInfo: ''
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
            onClickLeft() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
    .card-w {
        padding: 20px 15px;
        background: #fff;
    }
    .card-w .cw-con {
        height: 162px;
        background-image: -webkit-linear-gradient(45deg, #e2ab2e, #f5c352);
        background-image: -o-linear-gradient(45deg, #e2ab2e, #f5c352);
        background-image: linear-gradient(45deg, #e2ab2e, #f5c352);
        padding: 14px 0;
        border-radius: 10px;
        -webkit-box-shadow: -2px 3px 10px rgba(226, 171, 47, .5);
        box-shadow: -2px 3px 10px rgba(226, 171, 47, .5);
    }
    .card-w .cw-btn, .card-w .cw-user {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
    }
    .card-w .cw-btn {
        height: 50px;
        margin: 0 auto;
        padding-left: 25px;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
    }
    .card-w .user-logo {
        width: 40px;
        height: 40px;
        background: #ededed;
        border-radius: 25px;
        overflow: hidden;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        margin-right: 8px;
    }
    .card-w .user-logo img {
        max-width: 100%;
        height: auto;
    }
    img {
        border: 0 none;
        vertical-align: bottom;
        -ms-interpolation-mode: bicubic;
    }
    .card-w .user-nickname {
        color: #fff;
        font-weight: 700;
        font-size: 15px;
    }
    .card-w .user-member {
        color: #9c6f09;
        font-size: 12px;
        margin-top: 5px
    }
    .card-w .member-card-btn {
        margin-left:210px;
        background: #d5990d;
        color: #fff;
        border: 0px;
        width:112px;
        height: 40px;
        font-size: 14px;
        font-weight: 600
    }
    p {
        margin: 0;
    }

    /*-----------分割线--------------*/
    .rights-produce-wrapper {
        margin: 20px 15px 0;
    }
    .rights-produce-text {
        font-size: 18px;
        font-weight: 700;
        color: #2e3244;
    }
    .rights-produce-icon {
        position: relative;
        display: inline-block;
        top: 3px;
        margin-right: 5px;
    }
    .rights-produce-content {
        font-size: 12px;
        margin-top: 8px;
        color: #999;
    }
    .rights-produce-content p {
        line-height: 30px;
    }
</style>