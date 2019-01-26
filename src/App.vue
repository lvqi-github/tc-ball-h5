<template>
  <div id="app">
    <router-view/>

    <van-tabbar v-model="active">
      <van-tabbar-item icon="wap-home" to="/index">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o"  to="/category">推荐分类</van-tabbar-item>
      <van-tabbar-item icon="notes-o"  to="/statistics">战绩</van-tabbar-item>
      <van-tabbar-item icon="friends-o"  to="/user">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active: 0
      }
    }
  }
</script>

<style>
</style>
