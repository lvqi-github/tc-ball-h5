<template>
    <div class="index-article">
        <van-notice-bar
                text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。"
                left-icon="volume-o"/>

        <van-panel title="最新推荐"></van-panel>

        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list  v-model="loading"  :finished="finished"   @load="onLoad" finished-text="没有更多了">
                <van-cell v-for="(item,index) in articleList" :key="index">
                    <template slot="title">
                        <span class="custom-title">{{item.title}}</span>
                        <div class="custom-label">{{item.label}}</div>
                        <div class="custom-datetime">
                            发布时间：{{item.releaseTime}}
                            <span class="custom-currency">
                                <van-icon name="gold-coin-o" class="custom-currency-icon"/>{{item.amount}}
                            </span>
                        </div>
                    </template>
                    <template slot="icon">
                        <van-icon :name="item.urlImg" size="70px"/>
                    </template>
                </van-cell>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
    import { NoticeBar, Panel, List, Cell, Icon, PullRefresh } from 'vant';

    export default {
        components: {
            [NoticeBar.name]: NoticeBar,
            [Panel.name]: Panel,
            [List.name]: List,
            [Cell.name]: Cell,
            [PullRefresh.name]: PullRefresh,
            [Icon.name]: Icon
        },
        data() {
            return {
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
                this.$api.getNewestArticles(reqInfo).then(res => {
                    self.articleList = res.values;
                    self.isLoading = false; //关闭下拉刷新效果
                    self.finished = false; //未加载完成
                    self.page++;
                });
            },
            onRefresh() { //下拉刷新
                let self = this;
                setTimeout(() => {
                    self.page = 0;
                    self.init(); //加载数据
                }, 500);
            },
            onLoad() {
                let self = this;
                setTimeout(() => {
                    let reqInfo = {
                        page: this.page + 1,
                        pageSize: this.pageSize
                    };
                    this.$api.getNewestArticles(reqInfo).then(res => {
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
                }, 500);
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