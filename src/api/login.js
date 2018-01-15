import api from './index'

//写具体业务查询语句
class Login {
  constructor() {}


  static login(user, passwd) {
    // console.log(user + passwd)
    return api.get('login', {
      'email': user,
      'passwd': passwd
    })
  }

  static getuserinfo() {
    return api.get('userinfo', null)
  }

}

export default Login
