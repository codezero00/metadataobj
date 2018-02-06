import api from './index'

//写具体业务查询语句
class Data {
  constructor() {}


  static weekgaplist() {
    // console.log(user + passwd)
    return api.get('10')
  }

  static gapdetaillist(params) {
    return api.post('11', {'sharecode':params})
  }

  static metagroup() {
    //console.log(user + passwd)
    return api.get('metagroup')
  }

  //metaclasstree
  static metaclasstree(){
    return api.get('metaclasstree')
  }

  //metaclass
  static metaclass(params){
    return api.get('metaclass',{'id':params})
  }
}

export default Data
