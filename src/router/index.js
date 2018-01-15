import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login'
import articlelist from '@/page/article/list.vue'
import createarticle from '@/page/article/create.vue'
import editarticle from '@/page/article/edit.vue'


import Layout from '@/page/layout/Layout'
import home from '@/page/home'

Vue.use(Router)

//所有权限通用路由表 
//如首页和登录页和一些不用权限的公用页面
export const constrouterMap = [{
    path: '/',
    name: '登陆页',
    redirect: '/login',
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: {
      template: '<h1>404</h1>'
    },
    hidden: true
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    children: [{
      path: 'index',
      component: home,
      name: 'dashboard',
      meta: {
        title: 'dashboard',
        icon: 'dashboard',
        noCache: false
      }
    }]
  },
  {
    path: '/documentation',
    component: Layout,
    // redirect: '/documentation/index',
    meta: {
      title: 'documentation',
      icon: 'documentation'
    },
    children: [
      {path: 'list', component: articlelist,name: 'articlelist',meta: {title: 'articlelist',icon: 'documentation',noCache: false}},
      {path: 'create', component: createarticle,name: 'createarticle',meta: {title: 'createarticle',icon: 'documentation',noCache: false}},
      {path: 'edit', component: editarticle,name: 'editarticle',meta: {title: 'editarticle',icon: 'documentation',noCache: false}}
      
    ]
  },


]

export const asyncrouterMap = [{
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    name: 'charts',
    children: [{
      path: 'index',
      component: home,
      name: 'charts',
      meta: {
        title: 'charts',
        icon: 'charts',
        noCache: false
      }
    }]
  },
  {
    path: '*',
    redirect: '/404'
  }
]


const router = new Router({
  mode: 'history',
  routes: constrouterMap
})

// router.addRoutes(asyncrouterMap)

export default router
