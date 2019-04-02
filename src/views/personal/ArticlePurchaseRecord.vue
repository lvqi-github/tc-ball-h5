<template>
    <div class="member-recharge-record">
        <van-nav-bar title="文章购买记录" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>

        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" @load="onLoad" finished-text="没有更多了">
                <van-cell v-for="(item,index) in recordList" :key="index" class="panel">
                    <div slot="title" class="panel-header">
                        <div class="left">
                            <van-icon name="coupon" color="#f5ca3a" style="font-size: 21px; top: 5px;"/>
                            <span>{{item.articleTitle}}</span>
                        </div>
                        <div class="right">￥{{item.amount}}</div>
                    </div>
                    <div slot="label" class="panel-content">
                        <p>文章描述：{{item.articleDesc}}</p>
                        <p>充值时间：{{item.created}}</p>
                        <p>订单编号：{{item.orderNo}}</p>
                    </div>
                </van-cell>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false, //控制上拉加载的加载动画
                finished: false, //是否已加载完成
                isLoading: false, //控制下拉刷新的加载动画
                recordList: [], //列表数据
                page: 0,
                pageSize: 5
            }
        },
        methods: {
            initRecordList() {
                let self = this;
                let reqInfo = {
                    page: self.page + 1,
                    pageSize: self.pageSize
                };
                this.$api.getArticlePurchaseRecordList(reqInfo).then(res => {
                    self.recordList = res.values;
                    self.isLoading = false; //关闭下拉刷新效果
                    self.finished = false; //未加载完成
                    self.page++;
                });
            },
            onRefresh() { //下拉刷新
                let self = this;
                self.page = 0;
                self.initRecordList(); //加载数据
            },
            onLoad() {
                let self = this;
                let reqInfo = {
                    page: self.page + 1,
                    pageSize: self.pageSize
                };
                this.$api.getArticlePurchaseRecordList(reqInfo).then(res => {
                    if(res.resultCode == "1000"){
                        let recordList = res.values;
                        if (recordList.length !== 0) {
                            //新增数据拼接在后面
                            self.recordList = self.recordList.concat(recordList);
                        }

                        // 上拉加载状态结束
                        self.loading = false;

                        self.page++;

                        // 数据全部加载完成
                        if (this.recordList.length >= res.totalElements) {
                            this.finished = true;
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
    p {
        margin: 0;
    }
    .member-recharge-record {
        background-color: #f8f8f8;
    }
    .panel {
        margin-bottom: 5px;
    }
    .panel-header {
        padding: 10px 0;
        border-bottom: 1px dashed #E4E4E4;
    }
    .panel-header .left {
        width: 285px;
        display: inline-block;
    }
    .panel-header .left span {
        font-size: 14px;
        font-weight: bold;
        color: #020202;
    }
    .panel-header .right {
        width: 60px;
        display: inline-block;
        font-size: 14px;
        color: #9D9D9D;
        text-align: right;
    }
    .panel-content {
        font-size: 14px;
        color: #656565;
    }
    .panel-content p {
        padding: 5px 0;
    }
</style>