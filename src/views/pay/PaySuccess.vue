<template>
    <div>
        <van-nav-bar title="支付成功"></van-nav-bar>

        <div class="success-icon">
            <van-icon name="wechat" color="#64da7c" size="100px"/>
        </div>

        <div class="to-index">
            <van-button round type="danger" @click="goIndex" style="width: 200px; height: 40px">返回首页</van-button>
        </div>

    </div>
</template>

<script>
    export default {
        methods: {
            goIndex() {
                this.$router.push({ name: 'Index'});
            }
        }
    }
</script>

<style scoped>
    .success-icon {
        margin: 20px 0;
        text-align: center;
    }
    .to-index {
        text-align: center;
    }
</style>