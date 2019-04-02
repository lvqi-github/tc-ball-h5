<template>
    <div class="index-article">
        <van-notice-bar
                text="提供足球、篮球赛事资讯，赛事解读。推荐解读仅供参考，如需购彩请选择中国体育彩票。"
                left-icon="volume-o"/>

        <van-panel title="最新推荐"></van-panel>

        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list v-model="loading"  :finished="finished"   @load="onLoad" finished-text="没有更多了">
                <van-cell v-for="(item,index) in articleList" :key="index" @click="cellClick(item.articleId)">
                    <template slot="title">
                        <span class="custom-title">{{item.articleTitle}}</span>
                        <div class="custom-label">{{item.articleDesc}}</div>
                        <div class="custom-datetime">
                            发布时间：{{item.created}}
                            <span v-if="item.chargeType ==1" class="custom-currency">
                                <van-icon name="gold-coin-o" class="custom-currency-icon"/>{{item.price}}
                            </span>
                        </div>
                    </template>
                    <template slot="icon">
                        <van-icon :name="item.articleType == 1 ? '//img.grtcxx.com/system/football.jpg' : (item.articleType === 2 ? '//pnn0msmwq.bkt.clouddn.com/system/basketball.jpg' : '//pnn0msmwq.bkt.clouddn.com/system/foot_basket_ball.jpg')" size="70px"/>
                    </template>
                </van-cell>
            </van-list>
        </van-pull-refresh>

        <van-tabbar v-model="tabBarActive" fixed>
            <van-tabbar-item icon="wap-home" to="/index">首页</van-tabbar-item>
            <van-tabbar-item icon="apps-o"  to="/category">分类</van-tabbar-item>
            <van-tabbar-item icon="notes-o"  to="/statistic">统计</van-tabbar-item>
            <van-tabbar-item icon="friends-o"  to="/personal">个人中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tabBarActive: 0,
                loading: false, //控制上拉加载的加载动画
                finished: false, //是否已加载完成
                isLoading: false, //控制下拉刷新的加载动画
                articleList: [], //列表数据
                page: 0,
                pageSize: 15
            }
        },
        methods: {
            init() {
                let self = this;
                let reqInfo = {
                    page: this.page + 1,
                    pageSize: this.pageSize
                };
                this.$api.getNewestArticleList(reqInfo).then(res => {
                    if(res.resultCode == "1000"){
                        self.articleList = res.values;
                        self.isLoading = false; //关闭下拉刷新效果
                        self.finished = false; //未加载完成
                        self.page++;
                    }
                });
            },
            onRefresh() { //下拉刷新
                let self = this;
                self.page = 0;
                self.init(); //加载数据
            },
            onLoad() {
                let self = this;
                let reqInfo = {
                    page: this.page + 1,
                    pageSize: this.pageSize
                };
                this.$api.getNewestArticleList(reqInfo).then(res => {
                    if(res.resultCode == "1000"){
                        let articleList = res.values;
                        if (articleList.length !== 0) {
                            //新增数据拼接在后面
                            self.articleList = self.articleList.concat(articleList);
                        }

                        // 上拉加载状态结束
                        self.loading = false;

                        self.page++;

                        // 数据全部加载完成
                        if (this.articleList.length >= res.totalElements) {
                            this.finished = true;
                        }
                    }
                });
            },
            cellClick(articleId) {
                this.$router.push({ path: '/articleDetail', query: { articleId: articleId }});
            }
        }
    }
</script>

<style scoped>
    .index-article {
        margin-bottom: 50px;
    }
    .custom-title {
        margin-left: 3px;
    }
    .custom-label {
        color: #969799;
        font-size: 12px;
        margin-left: 10px;
        margin-top: 3px;
        line-height: 18px;
    }
    .custom-datetime {
        color: #CECECE;
        font-size: 12px;
        margin-left: 10px;
        margin-top: 3px;
        line-height: 16px;
    }
    .custom-currency {
        float: right;
    }
    .custom-currency-icon {
        top: 1px;
    }
</style>