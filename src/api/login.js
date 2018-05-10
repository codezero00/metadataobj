import request from '@/utils/request'

//写具体业务查询语句
class Login {
  constructor() {}


  static login(user, passwd) {
    // console.log(user + passwd)
    return request.get('login', {
      'email': user,
      'passwd': passwd
    })
  }

  static getuserinfo() {
    return request.get('userinfo', null)
  }


}

export default Login
