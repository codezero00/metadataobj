export default function getItem(obj,key,def){ //查找对象是否存在KEY值，没有这默认def
    if(obj){
      // const x = Object.keys(obj)
      // const y = x.findIndex(element=>{
      //   console.log('element')
      //   console.log(element)
      //   return element === key;
      //   })
      // return y>=0 ? obj[key] : def;
      return Object.keys(obj).findIndex(element=>element === key)>=0 ? obj[key] : def;
    }
  }