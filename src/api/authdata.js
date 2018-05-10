import request from '@/utils/requestAuth'


//写具体业务查询语句
class authData {
    constructor() {}
  
    static getTokenQuery(clientId,state,serverState) {
      return request.get('http://172.16.1.3/webapp/api/TokenAuth/GetTokenFromCache',{'clientId':clientId,'state':state,'serverState':serverState})
    }

    static getCurrentUser() {
      return request.get('http://172.16.1.3/webapp/api/services/app/Session/GetCurrentLoginInformations')
    }

  }
  
  export default authData

