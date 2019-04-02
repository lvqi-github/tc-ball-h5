<template>
    <div>
        <van-tabs v-model="tabActiveKey" @click="tabClick">
            <van-tab title="按日期">
                <div class="tab-date">
                    <van-pull-refresh v-model="dateTab.isLoading" @refresh="dateTabRefresh">
                        <van-list v-model="dateTab.loading" :finished="dateTab.finished" @load="dateTabLoad" finished-text="没有更多了">
                            <van-cell v-for="(item,index) in dateTab.recordList" :key="index" @click="cellClick(item.recordId)">
                                <template slot="title">
                                    <span class="custom-title">{{item.recordTitle}}</span>
                                    <div class="custom-datetime">发布时间：{{item.created}}</div>
                                </template>
                            </van-cell>
                        </van-list>
                    </van-pull-refresh>
                </div>
            </van-tab>
            <van-tab title="按作者">
                <div class="custom-category-left">
                    <van-badge-group :active-key="authorTab.activeKey" @change="authorTabBadgeChange">
                        <van-badge v-bind:key="item.authorId" v-for="item in authorTab.authorList" :title="item.authorName" @click="authorTabBadgeClick(item.authorId)" />
                    </van-badge-group>
                </div>
                <div id="custom-category-right" class="custom-category-right">
                    <van-pull-refresh v-model="authorTab.isLoading" @refresh="authorTabRefresh">
                        <van-list v-model="authorTab.loading" :finished="authorTab.finished" @load="authorTabLoad" finished-text="没有更多了" :immediate-check="false">
                            <van-cell v-for="(item,index) in authorTab.recordList" :key="index" @click="cellClick(item.recordId)">
                                <template slot="title">
                                    <span class="custom-title">{{item.recordTitle}}</span>
                                    <div class="custom-datetime">发布时间：{{item.created}}</div>
                                </template>
                            </van-cell>
                        </van-list>
                    </van-pull-refresh>
                </div>
            </van-tab>
        </van-tabs>

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
        name: "Statistic",
        data() {
            return {
                tabBarActive: 2,
                tabActiveKey: 0, //控制Tab切换
                dateTab: {
                    loading: false, //控制上拉加载的加载动画
                    finished: false, //是否已加载完成
                    isLoading: false, //控制下拉刷新的加载动画
                    recordList: [], //列表数据
                    recordType: 1, //1-按日期 2-按作者
                    page: 0,
                    pageSize: 15
                },
                authorTab: {
                    activeKey: 0, //控制左侧分类切换
                    loading: false, //控制上拉加载的加载动画
                    finished: false, //是否已加载完成
                    isLoading: false, //控制下拉刷新的加载动画
                    recordType: 2, //1-按日期 2-按作者
                    selectedAuthorId: '',
                    authorList: [], //作者分类列表数据
                    recordList: [], //列表数据
                    page: 0,
                    pageSize: 15
                }
            };
        },
        methods: {
            tabClick(index, title) {
                if (title == '按作者'){
                    if (this.authorTab.authorList.length == 0){
                        this.initCategoryListData();
                    }
                }
            },
            initDateTabRecordList() {
                let self = this;
                let reqInfo = {
                    page: self.dateTab.page + 1,
                    pageSize: self.dateTab.pageSize,
                    recordType: self.dateTab.recordType
                };
                this.$api.getHitRecordList(reqInfo).then(res => {
                    self.dateTab.recordList = res.values;
                    self.dateTab.isLoading = false; //关闭下拉刷新效果
                    self.dateTab.finished = false; //未加载完成
                    self.dateTab.page++;
                });
            },
            dateTabRefresh() { //下拉刷新
                let self = this;
                self.dateTab.page = 0;
                self.initDateTabRecordList(); //加载数据
            },
            dateTabLoad() {
                let self = this;
                let reqInfo = {
                    page: self.dateTab.page + 1,
                    pageSize: self.dateTab.pageSize,
                    recordType: self.dateTab.recordType
                };
                this.$api.getHitRecordList(reqInfo).then(res => {
                    if(res.resultCode == "1000"){
                        let recordList = res.values;
                        if (recordList.length !== 0) {
                            //新增数据拼接在后面
                            self.dateTab.recordList = self.dateTab.recordList.concat(recordList);
                        }

                        // 上拉加载状态结束
                        self.dateTab.loading = false;

                        self.dateTab.page++;

                        // 数据全部加载完成
                        if (this.dateTab.recordList.length >= res.totalElements) {
                            this.dateTab.finished = true;
                        }
                    }
                });
            },
            initCategoryListData() {
                let self = this;
                this.$api.getAuthorList(null).then(res => {
                    if (res.resultCode == "1000") {
                        self.authorTab.authorList = res.value.authorList;
                        self.authorTab.selectedAuthorId = res.value.selectedAuthorId;
                        self.initAuthorTabRecordList(); //加载数据
                    }
                });
            },
            initAuthorTabRecordList() {
                let self = this;
                let reqInfo = {
                    page: self.authorTab.page + 1,
                    pageSize: self.authorTab.pageSize,
                    recordType: self.authorTab.recordType,
                    authorId: self.authorTab.selectedAuthorId
                };
                this.$api.getHitRecordList(reqInfo).then(res => {
                    self.authorTab.recordList = res.values;
                    self.authorTab.isLoading = false; //关闭下拉刷新效果
                    // 数据全部加载完成
                    if (this.authorTab.recordList.length >= res.totalElements) {
                        this.authorTab.finished = true;
                    }
                    self.authorTab.page++;
                });
            },
            authorTabRefresh() { //下拉刷新
                let self = this;
                self.authorTab.page = 0;
                self.initAuthorTabRecordList(); //加载数据
            },
            authorTabLoad() {
                let self = this;
                let reqInfo = {
                    page: self.authorTab.page + 1,
                    pageSize: self.authorTab.pageSize,
                    recordType: self.authorTab.recordType
                };
                this.$api.getHitRecordList(reqInfo).then(res => {
                    if(res.resultCode == "1000"){
                        let recordList = res.values;
                        if (recordList.length !== 0) {
                            //新增数据拼接在后面
                            self.authorTab.recordList = self.authorTab.recordList.concat(recordList);
                        }

                        // 上拉加载状态结束
                        self.authorTab.loading = false;

                        self.authorTab.page++;

                        // 数据全部加载完成
                        if (this.authorTab.recordList.length >= res.totalElements) {
                            this.authorTab.finished = true;
                        }
                    }
                });
            },
            authorTabBadgeChange(key) {
                this.authorTab.activeKey = key;
            },
            authorTabBadgeClick(authorId) {
                let self = this;
                self.authorTab.selectedAuthorId = authorId;
                self.authorTab.page = 0;

                let div = document.getElementById('custom-category-right');
                div.scrollTop = 0;

                self.initAuthorTabRecordList(); //加载数据
            },
            cellClick(recordId) {
                this.$router.push({ path: '/statisticDetail', query: { recordId: recordId }});
            }
        }
    }
</script>

<style scoped>
    .tab-date{
        margin-bottom: 50px;
    }
    .custom-category-left {
        position: absolute;
        width: 100px;
        min-width: 100px;
        height: calc(100vh - 94px);
        overflow: scroll;
    }
    .custom-category-right {
        width: 275px;
        margin-left: 100px;
        height: calc(100vh - 94px);
        overflow: scroll;
    }
    .custom-datetime {
        color: #CECECE;
        font-size: 12px;
        margin-top: 3px;
        line-height: 16px;
    }
</style>