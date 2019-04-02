import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'

// 倒入 http 文件夹下的 index.js
import api from './api/index'
// 此时可以直接在 Vue 原型上调用 $api 了
Vue.use(api)

import {
    Tabbar, TabbarItem, Notify, NoticeBar, Panel, List, Cell, CellGroup, Icon, PullRefresh, Badge, BadgeGroup,
    Row, Col, Tag, Tab, Tabs, Switch, NavBar, Toast, Button, SubmitBar
} from 'vant'

Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Notify)
Vue.use(NoticeBar)
Vue.use(Panel)
Vue.use(List)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Icon)
Vue.use(PullRefresh)
Vue.use(Badge)
Vue.use(BadgeGroup)
Vue.use(Row)
Vue.use(Col)
Vue.use(Tag)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Switch)
Vue.use(NavBar)
Vue.use(Toast)
Vue.use(Button)
Vue.use(SubmitBar)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    // 从localStorage获取token
    let token = window.localStorage.getItem("token");
    let loginState = store.state.user.loginState;

    if (!token) {
        if (to.path == '/author') {
            next()
        } else {
            next('/author');
        }
    } else {
        if (loginState) {
            if (to.path == '/author') {
                next({path: '/'})
            } else {
                next()
            }
        } else {
            store.dispatch('GetUserInfo').then(res => { // 拉取用户信息
                if (res.resultCode == "1000") {
                    if (to.path == '/author') {
                        next({path: '/'})
                    } else {
                        next()
                    }
                }
            })
        }
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
