import Login from '@/api/login'

const user = {
    state: {
        id: '',
        email: '',
        passwd: '',
        admin: '',
        name: '',
        image: '',
        created_at: ''

    },
  
    mutations: {
      SET_ID: (state, id) => {
        state.id = id
      },
      SET_EMAIL: (state, email) => {
        state.email = email
      },
      SET_PASSWD: (state, passwd) => {
        state.passwd = passwd
      },
      SET_ADMIN: (state, admin) => {
        state.admin = admin
      },
      SET_NAME: (state, name) => {
        state.name = name
      },
      SET_IMAGE: (state, image) => {
        state.image = image
      },
      SET_TIME: (state, created_at) => {
        state.created_at = created_at
      }
    },
  
    actions: {
      // 用户名登录
      async LoginByUsername({ commit }, userInfo) {
        const username = userInfo.username.trim()
        const passwd = userInfo.passwd.trim()
        const data = await Login.login(username,passwd)
        console.log(data)
        return data
      },
  
      // 获取用户信息
      async GetUserInfo({ commit, state }) {
        const data = await Login.getuserinfo()
        // console.log('GetUserInfo')
        // console.log(data)
        if(data){
          commit('SET_ID',data.id)
          commit('SET_EMAIL',data.email)
          commit('SET_PASSWD',data.passwd)
          commit('SET_ADMIN',data.admin)
          commit('SET_NAME',data.name)
        }
        else{
          console.log('getuserinfo do not have data!!')
        }
        return data
      },
  
      // 第三方验证登录
      // LoginByThirdparty({ commit, state }, code) {
      //   return new Promise((resolve, reject) => {
      //     commit('SET_CODE', code)
      //     loginByThirdparty(state.status, state.email, state.code).then(response => {
      //       commit('SET_TOKEN', response.data.token)
      //       setToken(response.data.token)
      //       resolve()
      //     }).catch(error => {
      //       reject(error)
      //     })
      //   })
      // },
  
      // 登出
      LogOut({ commit, state }) {
        return new Promise((resolve, reject) => {
          logout(state.token).then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
  
      // 前端 登出
      FedLogOut({ commit }) {
        return new Promise(resolve => {
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
        })
      },
  
      // 动态修改权限
      ChangeRole({ commit }, role) {
        return new Promise(resolve => {
          commit('SET_TOKEN', role)
          setToken(role)
          getUserInfo(role).then(response => {
            const data = response.data
            commit('SET_ROLES', data.role)
            commit('SET_NAME', data.name)
            commit('SET_AVATAR', data.avatar)
            commit('SET_INTRODUCTION', data.introduction)
            resolve()
          })
        })
      }
    }
  }
  
  export default user