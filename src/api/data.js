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

  //metadatadetail
  static metadatadetail(params){
    return api.get('metadata',{'id':params})
  }

  //dbmanage
  static dbmanage(){
    return api.get('dbmanage')
  }

  //dbtabletree
  static dbtabletree(){
    return api.get('dbtabletree')
  }

  //dbtable
  static dbtable(params){
    return api.get('dbtable',{'id':params})
  }

  //dbtablecolumn
  static dbtablecolumn(params){
    return api.get('dbtablecolumn',{'id':params})
  }

  //dbtablecolumn
  static etlclients(params){
    return api.get('etlclients')
  }

}

export default Data
