import request from '@/utils/request'

//写具体业务查询语句
class Data {
  constructor() {}


  static weekgaplist() {
    // console.log(user + passwd)
    return request.get('10')
  }

  static gapdetaillist(params) {
    return request.post('11', {'sharecode':params})
  }

  static metagroup() {
    //console.log(user + passwd)
    return request.get('metagroup')
  }

  //metaclasstree
  static metaclasstree(){
    return request.get('metaclasstree')
  }

  //metaclass
  static metaclass(params){
    return request.get('metaclass',{'id':params})
  }

  //metadatadetail
  static metadatadetail(params){
    return request.get('metadata',{'id':params})
  }

  //FrontBase
  static FrontBase(){
    return request.get('FrontBase')
  }

  //ResourceBase
  static ResourceBase(){
    return request.get('ResourceBase')
  }

  //DataLayer
  static DataLayer(){
    return request.get('DataLayer')
  }

  //dbtabletree
  static dbtabletree(){
    return request.get('dbtabletree')
  }

  //DBTableLayerTree
  static DBTableLayerTree(){
    return request.get('dbtablelayertree')
  }

  //dbtable
  static dbtable(params){
    return request.get('dbtable',{'id':params})
  }

  //dbtablecolumn
  static dbtablecolumn(params){
    return request.get('dbtablecolumn',{'id':params})
  }

  //dbtablecolumn
  static etlclients(params){
    return request.get('etlclients')
  }

  //dbtablecolumn
  static etljobs(params){
    return request.get('etljobs')
  }

}

export default Data
