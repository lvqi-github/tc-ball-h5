<template>
    <div>
        <van-nav-bar title="文章详情" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>

        <div>
            <div class="detail-title">
                {{article.articleTitle}}
            </div>
            <div class="detail-time">
                发布时间：{{article.created}}
            </div>
        </div>

        <div v-if="viewPermission" class="detail">
            <img v-if="article.articleContentImg" :src="article.articleContentImg">
            <p v-else v-html="article.articleContentText"></p>
        </div>
        <div v-else class="detail">
            <img v-if="article.articlePreviewImg" :src="article.articlePreviewImg">
            <p v-else v-html="article.articlePreviewText"></p>
            <van-button round type="danger" @click="articlePay" style="width: 220px; height: 40px">查看解读需支付：{{article.price}}元</van-button>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                viewPermission: false,
                article:{

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
                    articleId: this.$route.query.articleId
                }
                this.$api.getArticleDetail(reqInfo).then(res => {
                    this.viewPermission = res.value.viewPermission;
                    this.article = res.value.articleDetail;
                    this.$toast.clear();
                });
            },
            articlePay() {
                this.$toast('支付暂未开通，敬请期待');
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
    .detail{
        margin: 0 10px 50px;
        text-align: center;
    }
    .detail p {
        font-size: 12px;
        color: #999;
        line-height: 25px;
    }
    .detail img{
        width: 100%;
        height:auto;
        margin-bottom: 20px;
    }
</style>