<template>
    <div>
        <div class="custom-category-left">
            <van-badge-group :active-key="activeKey" @change="onChange">
                <van-badge v-bind:key="item.authorId" v-for="item in authorList" :title="item.authorName"
                           @click="onClick(item.authorId)"/>
            </van-badge-group>
        </div>
        <div id="custom-category-right" class="custom-category-right">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-list v-model="loading" :finished="finished" @load="onLoad" finished-text="没有更多了"
                          :immediate-check="false">
                    <van-cell v-for="(item,index) in articleList" :key="index" @click="cellClick(item.articleId)" >
                        <template slot="title">
                            <span class="custom-title">{{item.articleTitle}}</span>
                            <div class="custom-label">{{item.articleDesc}}</div>
                            <div class="custom-datetime">
                                发布时间：{{item.created}}
                                <span class="custom-currency">
                                    <van-tag v-if="item.articleStatus ==3" type="danger">已结束</van-tag>
                                    <van-icon v-if="item.articleStatus !=3 && item.chargeType ==1" name="gold-coin-o" class="custom-currency-icon">{{item.price}}</van-icon>
                                </span>
                            </div>
                        </template>
                    </van-cell>
                </van-list>
            </van-pull-refresh>
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
    export default {
        name: "Category",
        data() {
            return {
                tabBarActive: 1,
                activeKey: 0, //控制左侧分类切换
                loading: false, //控制上拉加载的加载动画
                finished: false, //是否已加载完成
                isLoading: false, //控制下拉刷新的加载动画
                authorList: [], //作者分类列表数据
                articleList: [], //文章列表数据
                selectedAuthorId: '',
                page: 0,
                pageSize: 15
            };
        },
        created() {
            this.initCategoryListData();
        },
        methods: {
            initCategoryListData() {
                let self = this;
                this.$api.getAuthorList(null).then(res => {
                    if (res.resultCode == "1000") {
                        self.authorList = res.value.authorList;
                        self.selectedAuthorId = res.value.selectedAuthorId;
                        self.initArticleList(); //加载数据
                    }
                });
            },
            initArticleList() {
                let self = this;
                let reqInfo = {
                    page: this.page + 1,
                    pageSize: this.pageSize,
                    authorId: this.selectedAuthorId
                };
                this.$api.getAuthorArticleList(reqInfo).then(res => {
                    self.articleList = res.values;
                    self.isLoading = false; //关闭下拉刷新效果
                    // 数据全部加载完成
                    if (this.articleList.length >= res.totalElements) {
                        this.finished = true;
                    }
                    self.page++;
                });
            },
            onRefresh() { //下拉刷新
                let self = this;
                self.page = 0;
                self.initArticleList(); //加载数据
            },
            onChange(key) {
                this.activeKey = key;
            },
            onClick(authorId) {
                let self = this;
                self.selectedAuthorId = authorId;
                self.page = 0;

                let div = document.getElementById('custom-category-right');
                div.scrollTop = 0;

                self.initArticleList(); //加载数据
            },
            onLoad() {
                let self = this;
                let reqInfo = {
                    page: this.page + 1,
                    pageSize: this.pageSize,
                    authorId: this.selectedAuthorId
                };
                this.$api.getAuthorArticleList(reqInfo).then(res => {
                    if (res.resultCode == "1000") {
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