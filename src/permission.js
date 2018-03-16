import router, {asyncrouterMap} from './router'
import store from './vuex/index'
// import api from './api/index'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import {getToken} from '@/utils/auth'
import home from '@/view/home'


// register global progress.
const whiteList = ['/login', '/'] // 不重定向白名单
router.beforeEach(async(to, from, next) => {
  NProgress.start() // 开启Progress
  if (getToken()) { // 判断是否有token
    if (to.path === '/login') {
      next({
        path: '/home'
      })
      NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    } else {
      let x = store.state.user.admin.toString() //由于vuex 使用了 modules 这里需要把模块user路径带入
      if (x.length === 0) { // 判断当前用户是否已拉取完user_info信息 number不能使用length
        try{
          const res = await store.dispatch('GetUserInfo')
          const roles = res.admin
          if (roles === 0) {
            router.addRoutes(asyncrouterMap)
            next(to.path) //重新跳转本面保障 x.length ！= 0 跳转到else
          }
        }
        catch(err){
          next({ path: '/login' })
        }

      }
      else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
