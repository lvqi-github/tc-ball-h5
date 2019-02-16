import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/author',
      name: 'Author',
      component: resolve => require(['./views/Author'], resolve),
      meta: {
        title: '授权页'
      }
    },
    {
      path: '/index',
      name: 'Index',
      component: resolve => require(['./views/Index'], resolve),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/category',
      name: 'Category',
      component: resolve => require(['./views/Category'], resolve),
      meta: {
        title: '分类'
      }
    },
    {
      path: '/statistics',
      name: 'Statistics',
      component: resolve => require(['./views/Statistics'], resolve),
      meta: {
        title: '战绩'
      }
    },
    {
      path: '/user',
      name: 'User',
      component: resolve => require(['./views/User'], resolve),
      meta: {
        title: '个人中心'
      }
    }
  ]
})
