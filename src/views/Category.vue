<template>
    <div>
        <div class="custom-category-left">
            <van-badge-group :active-key="activeKey" @change="onChange">
                <van-badge v-bind:key="item.categoryId" v-for="item in categoryList" :title="item.categoryName" @click="onClick(item.categoryId)" />
            </van-badge-group>
        </div>
        <div id="custom-category-right" class="custom-category-right">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-list v-model="loading" :finished="finished" @load="onLoad" finished-text="没有更多了">
                    <van-cell v-for="(item,index) in articleList" :key="index">
                        <template slot="title">
                            <div class="custom-label" v-html="item.label"></div>
                            <div class="custom-datetime">
                                发布时间：{{item.releaseTime}}
                                <span class="custom-currency">
                                    <van-icon name="gold-coin-o" class="custom-currency-icon"/>{{item.amount}}
                                </span>
                            </div>
                        </template>
                    </van-cell>
                </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script>
    import { Badge, BadgeGroup, List, Cell, Icon, PullRefresh } from 'vant';

    export default {
        name: "Category",
        components: {
            [Badge.name]: Badge,
            [BadgeGroup.name]: BadgeGroup,
            [List.name]: List,
            [Cell.name]: Cell,
            [Icon.name]: Icon,
            [PullRefresh.name]: PullRefresh
        },
        data() {
            return {
                activeKey: 0, //控制左侧分类切换
                loading: false, //控制上拉加载的加载动画
                finished: false, //是否已加载完成
                isLoading: false, //控制下拉刷新的加载动画
                categoryList: [], //分类列表数据
                articleList: [], //文章列表数据
                selectedCategoryId: '',
                page: 0,
                pageSize: 20
            };
        },
        created() {
            this.initCategoryListData();
        },
        methods: {
            initCategoryListData() {
                let self = this;
                this.$api.getCategoryList(null).then(res => {
                    self.categoryList = res.data.categoryList;
                    self.selectedCategoryId = res.data.selectedCategoryId;
                });
            },
            initArticleList() {
                let self = this;
                let reqInfo = {
                    page: this.page + 1,
                    pageSize: this.pageSize,
                    categoryId: this.selectedCategoryId
                };
                this.$api.getCategoryArticles(reqInfo).then(res => {
                    self.articleList = res.data.articleList;
                    self.isLoading = false; //关闭下拉刷新效果
                    self.finished = false; //未加载完成
                    self.page++;
                });
            },
            onRefresh() { //下拉刷新
                let self = this;
                setTimeout(() => {
                    self.page = 0;
                    self.initArticleList(); //加载数据
                }, 500);
            },
            onChange(key) {
                this.activeKey = key;
            },
            onClick(categoryId) {
                let self = this;
                self.selectedCategoryId = categoryId;
                self.page = 0;

                let div = document.getElementById('custom-category-right');
                div.scrollTop = 0;

                self.initArticleList(); //加载数据
            },
            onLoad() {
                let self = this;
                setTimeout(() => {
                    let reqInfo = {
                        page: this.page + 1,
                        pageSize: this.pageSize,
                        categoryId: this.selectedCategoryId
                    };
                    this.$api.getCategoryArticles(reqInfo).then(res => {
                        if(res.success){
                            let articleList = res.data.articleList;
                            if (articleList.length !== 0) {
                                //新增数据拼接在后面
                                self.articleList = self.articleList.concat(articleList);
                            }

                            // 上拉加载状态结束
                            self.loading = false;

                            self.page++;

                            // 数据全部加载完成
                            if (this.articleList.length >= res.totalCount) {
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
    .custom-category-left {
        position: absolute;
        width: 100px;
        min-width: 100px;
        height: calc(100vh - 50px);
        overflow: scroll;
    }
    .custom-category-right {
        width: 275px;
        margin-left: 100px;
        height: calc(100vh - 50px);
        overflow: scroll;
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