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
  static FrontBase(params){
    return request.get('FrontBase',{'CurrentPage':params.CurrentPage,'PageSize':params.PageSize})
  }

  //ResourceBase
  static ResourceBase(params){
    return request.get('ResourceBase',{'CurrentPage':params.CurrentPage,'PageSize':params.PageSize})
  }

  //DataLayer
  static DataLayer(params){
    return request.get('DataLayer',{'CurrentPage':params.CurrentPage,'PageSize':params.PageSize})
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
  static GetTable(params){
    return request.get('GetTable',{'CurrentPage':params.CurrentPage,'PageSize':params.PageSize})
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
    return request.get('etlclients',{'CurrentPage':params.CurrentPage,'PageSize':params.PageSize})
  }

  //dbtablecolumn
  static etljobs(params){
    return request.get('etljobs')
  }

  // I U D
  //FrontBaseInsOrUp
  static FrontBaseInsOrUp(params){
    console.log("FrontBaseInsOrUp")
    return request.post('FrontBaseInsOrUp',params)
  }

  static ResourceBaseInsOrUp(params){
    return request.post('ResourceBaseInsOrUp',params)
  }

  static DataLayerInsOrUp(params){
    return request.post('DataLayerInsOrUp',params)
  }

  static DBTableInsOrUp(params){
    return request.post('DBTableInsOrUp',params)
  }

  static ETLClientsInsOrUp(params){
    return request.post('ETLClientsInsOrUp',params)
  }

  
}

export default Data
