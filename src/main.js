import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'

// 倒入 http 文件夹下的 index.js
import api from './api/index'
// 此时可以直接在 Vue 原型上调用 $api 了
Vue.use(api)

import { Tabbar, TabbarItem, Notify} from 'vant'
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Notify)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // 从localStorage获取token
  let token = window.localStorage.getItem("token");
  // 如果不是访问的授权页 并且token为空 进行登陆授权
  if (!token && to.path != "/author") {
    next('/author');
  }
  next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
