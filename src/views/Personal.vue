<template>
    <div class="user">
        <div class="user-header">
            <div class="header-bg">
                <div class="user-img">
                    <img :src="avatar"/>
                    <span>{{name}}</span>
                </div>
            </div>
        </div>

        <div class="user-service">
            <van-cell-group>
                <van-cell>
                    <template slot="icon">
                        <van-icon name="service" color="#00BFFF" class="custom-icon" />
                    </template>
                    <template slot="title">
                        <span class="custom-text">我的服务</span>
                    </template>
                </van-cell>
            </van-cell-group>
            <van-row class="user-links">
                <van-col span="6">
                    <div @click="toMemberRechargeRecord">
                        <van-icon class="user-links-icon" name="pending-payment" />
                        会员充值记录
                    </div>
                </van-col>
                <van-col span="6">
                    <div @click="toArticlePurchaseRecord">
                        <van-icon class="user-links-icon" name="orders-o" />
                        文章购买记录
                    </div>
                </van-col>
            </van-row>
        </div>

        <div class="user-function">
            <van-cell-group>
                <van-cell  value="设置" is-link to="/subscribeManage" >
                    <template slot="icon">
                        <van-icon name="like" color="#FF0000" class="custom-icon" />
                    </template>
                    <template slot="title">
                        <span class="custom-text">订阅管理</span>
                    </template>
                </van-cell>
                <van-cell :value="memberCellValue" is-link to="/memberInfo" >
                    <template slot="icon">
                        <van-icon name="vip-card" color="#FFD700" class="custom-icon" />
                    </template>
                    <template slot="title">
                        <span class="custom-text">VIP会员</span>
                        <van-tag type="danger">{{memberStatusName}}</van-tag>
                    </template>
                </van-cell>
            </van-cell-group>
        </div>


        <van-tabbar v-model="tabBarActive" fixed>
            <van-tabbar-item icon="wap-home" to="/index">首页</van-tabbar-item>
            <van-tabbar-item icon="apps-o"  to="/category">分类</van-tabbar-item>
            <van-tabbar-item icon="notes-o"  to="/statistic">统计</van-tabbar-item>
            <van-tabbar-item icon="friends-o"  to="/personal">个人中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "Personal",
        data() {
          return {
              tabBarActive: 3,
              memberStatusName: '',
              memberCellValue: ''
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
                            self.memberStatusName = "未开通会员";
                            self.memberCellValue = "立即开通";
                        }else if(res.value.status == 2) {
                            self.memberStatusName = "会员已过期";
                            self.memberCellValue = "立即续费";
                        }else if(res.value.status == 3) {
                            self.memberStatusName = "会员有效";
                            self.memberCellValue = res.value.memberEndDate + "到期";
                        }
                    }
                });
            },
            toMemberRechargeRecord() {
                this.$router.push( '/memberRechargeRecord');
            },
            toArticlePurchaseRecord() {
                this.$router.push( '/articlePurchaseRecord');
            }
        }
    }
</script>

<style scoped>
    .user{
        background-color: #f8f8f8;
    }
    .user-header{
        background-color: #fff;
        padding-bottom: 25px;
        margin-bottom: 10px;
    }
    .header-bg{
        width: 100%;
        height: 148px;
        background-image: url("../assets/images/userbg.png");
        background-size: 100% 100%;
        background-repeat:no-repeat;
        position: relative;
    }
    .user-img{
        width: 60px;
        height: 120px;
        margin: 0 auto;
        text-align: center;
        color: #fff;
        font-size: 12px;
    }
    .user-img img{
        margin: 30px 0 10px;
        width: 60px;
        height: 60px;
        border-radius: 10%;
    }
    .user-img span{
        overflow: hidden;
        text-overflow: ellipsis;
        display:block;
        white-space: nowrap;
    }

    .user-service{
        margin-bottom: 6px;
    }
    .user-links {
        padding: 15px 0;
        font-size: 12px;
        color: #666;
        text-align: center;
        background-color: #fff;
    }
    .user-links-icon {
        display: block;
        font-size: 32px;
        margin-bottom: 10px;
    }

    .user-function {
        margin-bottom: 50px;
    }
    .custom-text {
        color: #666;
        font-size: 15px;
        margin-right: 5px;
    }
    .custom-icon {
        margin-right: 5px;
        height: 24px;
        min-width: 1em;
        font-size: 16px;
        line-height: 24px;
    }
</style>