<template>
    <div>
        <van-nav-bar title="统计详情" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>

        <div>
            <div class="detail-title">
                {{record.recordTitle}}
            </div>
            <div class="detail-time">
                发布时间：{{record.created}}
            </div>
        </div>

        <div class="detail-img">
            <img :src="record.recordImgUrl">
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                record:{

                }
            }
        },
        created() {
            this.init();
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            },
            init(){
                this.$toast.loading({
                    duration: 0,       // 持续展示 toast
                    forbidClick: true, // 禁用背景点击
                    message: '加载中...'
                });

                let reqInfo={
                    recordId: this.$route.query.recordId
                }
                this.$api.getHitRecordDetail(reqInfo).then(res => {
                    this.record = res.value;
                    this.$toast.clear();
                });
            }
        }
    }
</script>

<style scoped>
    .detail-title {
        font-size: 20px;
        font-weight: bold;
        text-align:center;
        padding: 10px 0;
        margin: 0 10px;
        border-bottom: 1px solid #999;
    }
    .detail-time {
        font-size: 12px;
        color: #999;
        text-align:center;
        margin-top: 10px;
        margin-bottom: 20px;
    }
    .detail-img{
        margin: 0 5px 50px;
    }
    .detail-img img{
        width: 100%;
        height:auto;
    }
</style>