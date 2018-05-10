import router, {
  asyncrouterMap
} from './router'
import store from './vuex/index'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  getSessionStorage,
  setSessionStroage,
  removeSessionStroage,
  getCookies,
  setCookies
} from '@/utils/auth'
import home from '@/view/home'
import AuthData from '@/api/authdata'


const nodeuuid = require('node-uuid').v1()
const clientId = '08d5abe8db896578a235044c1aadfc0f'

// register global progress.
// const whiteList = ['/login', '/'] // 不重定向白名单
router.beforeEach(async (to, from, next) => {
  NProgress.start() // 开启Progress

  let state = to.query.clientState
  let serverState = to.query.serverState

  if (getSessionStorage('ssss')) {
    let x = store.state.user.accout
    debugger;
    if (String(x).length === 0) {
      try{
        let res = await store.dispatch('GetOauthUserInfo')
        const account = res.user.userAccout
        if (account) {
          router.addRoutes(asyncrouterMap)
          next({ ...to});
        }
      }catch(err){
        window.location.href = "http://172.16.1.3/webapp/Account/Login?clientId=" + clientId + "&state=" + nodeuuid + "&returnUrl=http://localhost:8080"
        return;
      }

    } else {
      next()
    }
  } else {


    if (serverState) {
      //根据serverState 请求获取TOken
      let tokenvalue = await AuthData.getTokenQuery(clientId, state, serverState)
      if (typeof (tokenvalue) != undefined) {
        setSessionStroage('ssss', tokenvalue.accessToken)
        next({ ...to
        })
      } else {
        window.location.href = "http://172.16.1.3/webapp/Account/Login?clientId=" + clientId + "&state=" + nodeuuid + "&returnUrl=http://localhost:8080"
        return;
      }

    } else {
      window.location.href = "http://172.16.1.3/webapp/Account/Login?clientId=" + clientId + "&state=" + nodeuuid + "&returnUrl=http://localhost:8080"
      return;
    }
  }

})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
