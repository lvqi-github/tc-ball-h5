import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        redirect: '/index'
    }, {
        path: '/author',
        name: 'Author',
        component: resolve => require(['./views/Author'], resolve),
        meta: {
            title: '授权页'
        }
    }, {
        path: '/index',
        name: 'Index',
        component: resolve => require(['./views/Index'], resolve),
        meta: {
            title: '首页'
        }
    }, {
        path: '/category',
        name: 'Category',
        component: resolve => require(['./views/Category'], resolve),
        meta: {
            title: '分类'
        }
    }, {
        path: '/articleDetail',
        name: 'ArticleDetail',
        component: resolve => require(['./views/article/ArticleDetail'], resolve),
        meta: {
            title: '文章详情'
        }
    }, {
        path: '/statistic',
        name: 'Statistic',
        component: resolve => require(['./views/Statistic'], resolve),
        meta: {
            title: '统计'
        }
    }, {
        path: '/statisticDetail',
        name: 'StatisticDetail',
        component: resolve => require(['./views/statistic/StatisticDetail'], resolve),
        meta: {
            title: '统计详情'
        }
    }, {
        path: '/personal',
        name: 'Personal',
        component: resolve => require(['./views/Personal'], resolve),
        meta: {
            title: '个人中心'
        }
    }, {
        path: '/memberRechargeRecord',
        name: 'MemberRechargeRecord',
        component: resolve => require(['./views/personal/MemberRechargeRecord'], resolve),
        meta: {
            title: '会员充值记录'
        }
    }, {
        path: '/articlePurchaseRecord',
        name: 'ArticlePurchaseRecord',
        component: resolve => require(['./views/personal/ArticlePurchaseRecord'], resolve),
        meta: {
            title: '文章购买记录'
        }
    }, {
        path: '/subscribeManage',
        name: 'SubscribeManage',
        component: resolve => require(['./views/personal/SubscribeManage'], resolve),
        meta: {
            title: '订阅管理'
        }
    }, {
        path: '/memberInfo',
        name: 'MemberInfo',
        component: resolve => require(['./views/personal/MemberInfo'], resolve),
        meta: {
            title: '会员信息'
        }
    }, {
        path: '/memberRecharge',
        name: 'MemberRecharge',
        component: resolve => require(['./views/personal/MemberRecharge'], resolve),
        meta: {
            title: '会员充值'
        }
    }]
})
