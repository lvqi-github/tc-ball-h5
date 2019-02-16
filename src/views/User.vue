<template>
    <div class="user">
        <div class="user-header">
            <div class="header-bg">
                <div class="user-img">
                    <img src="http://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20181221/802991d121df41f0af01a9c6dcd267f0.jpeg"/>
                    <span>南无阿弥陀佛2学习下3422222222222</span>
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
                    <van-icon class="user-links-icon" name="pending-payment" />
                    待付款
                </van-col>
                <van-col span="6">
                    <van-icon class="user-links-icon" name="orders-o" />
                    已购买
                </van-col>
            </van-row>
        </div>

        <div>
            <van-cell-group>
                <van-cell  value="点击取消" is-link >
                    <template slot="icon">
                        <van-icon name="like" color="#FF0000" class="custom-icon" />
                    </template>
                    <template slot="title">
                        <span class="custom-text">订阅/取消</span>
                        <van-tag type="danger">已订阅</van-tag>
                    </template>
                </van-cell>
                <van-cell value="到期时间：2019-03-05" is-link >
                    <template slot="icon">
                        <van-icon name="vip-card" color="#FFD700" class="custom-icon" />
                    </template>
                    <template slot="title">
                        <span class="custom-text">VIP会员</span>
                        <van-tag type="danger">已开通</van-tag>
                    </template>
                </van-cell>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
    import { Row, Col, Icon, Cell, CellGroup, Tag } from 'vant';

    export default {
        name: "User",
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Icon.name]: Icon,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Tag.name]: Tag
        },
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