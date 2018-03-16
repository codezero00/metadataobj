// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css'; // normalize.css 样式格式化
import '@/styles/index.scss'; // 全局自定义的css样式
import 'font-awesome/css/font-awesome.css'

import './permission'
import './icons' // icon
import i18n from './lang' // Internationalization
import * as filters from './filters' // global filter

import echarts from 'echarts'
Vue.prototype.$echarts = echarts 

import store from './vuex/index' //vuex


import request from './utils/request' // 引用API文件
import data from './api/data' // 引用API文件
Vue.prototype.$api = request // 将API方法绑定到全局
Vue.prototype.$Data = data // 将API方法绑定到全局


Vue.use(ElementUI, {
  size: 'medium',
  i18n: (key, value) => i18n.t(key, value)
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: {
    App
  }
})
