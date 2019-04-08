<template>
    <div class="subscribe-manage">
        <van-nav-bar title="订阅管理" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>

        <van-cell-group :title="item.groupName" v-bind:key="index" v-for="(item, index) in subscribeSetupList">
            <van-cell v-for="(subItem,subIndex) in item.options" :key="subIndex" center>
                <template slot="title">
                    {{subItem.authorName}}
                </template>
                <template>
                    <van-switch size="24px" v-model="subItem.subscribeFlag" @change="switchChange(subItem)"/>
                </template>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                subscribeSetupList: [] //列表数据
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                let self = this;
                this.$api.getSubscribeSetupList(null).then(res => {
                    if(res.resultCode == "1000"){
                        self.subscribeSetupList = res.values;
                    }
                });
            },
            onClickLeft() {
                this.$router.go(-1)
            },
            switchChange(subItem) {
                this.$toast.loading({
                    duration: 0,       // 持续展示 toast
                    forbidClick: true, // 禁用背景点击
                    message: '处理中...'
                });

                let reqInfo = {
                    authorId: subItem.authorId
                };

                if (subItem.subscribeFlag) { // 订阅
                    this.$api.subscribeAuthor(reqInfo).then(res => {
                        this.$toast.clear();
                        if(res.resultCode == "1000"){
                            if(res.value){
                                this.$toast.success({duration: 1000, message:'订阅成功'});
                            }else {
                                subItem.subscribeFlag = false;
                                this.$toast(res.resultMsg);
                            }
                        }else {
                            subItem.subscribeFlag = false;
                            this.$toast.fail({duration: 1000, message:'订阅失败'});
                        }
                    });
                }else { // 取消订阅
                    this.$api.unSubscribeAuthor(reqInfo).then(res => {
                        this.$toast.clear();
                        if(res.resultCode == "1000" && res.value){
                            this.$toast.success({duration: 1000, message:'退订成功'});
                        }else {
                            subItem.subscribeFlag = true;
                            this.$toast.fail({duration: 1000, message:'退订失败'});
                        }
                    });
                }
            }
        }
    }
</script>

<style scoped>
    .subscribe-manage{
        background-color: #f8f8f8;
        margin-bottom: 50px;
    }
</style>