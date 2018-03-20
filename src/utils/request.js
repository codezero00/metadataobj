import axios from 'axios'

// 自定义判断元素类型JS
function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull(o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

class ax {
  constructor() {
    //this.root = 'http://127.0.0.1:9000'
    this.root = 'http://10.103.3.110/api/v1'
    //this.root = '/api/v1'
    this.config = {} //写入config信息
  }

  async apiAxios(method, url, _params) {

    if (_params) {
      _params = filterNull(_params)
    };

    let conf = {
      method: method,
      url: url,
      data: method === 'POST' || method === 'PUT' ? _params : null, //如果method === 'POST' || method === 'PUT' 为真则 params 假为 null
      params: method === 'GET' || method === 'DELETE' ? _params : null,
      //如名字表示的三元运算符需要三个操作数。
      //语法是 条件 ? 结果1 : 结果2;. 
      //这里你把条件写在问号(?)的前面后面跟着用冒号(:)分隔的结果1和结果2。满足条件时结果1否则结果2。
      baseURL: this.root,
      withCredentials: true //支持跨域
    };

    // debugger;
    try {
      const res = await axios(conf)
      console.log('axios data:')
      console.log(res)
      if (res.data.success === true) {
        console.log(res.data.data)
        return res.data.data
      } else if (res.data.failure) {
        return res.data
      } else {
        console.log('error!!!!')
        console.log(res.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
}

var myax = new ax() //必须要使用new 关键字
// api = myax.apiAxios

// 返回在vue模板中的调用接口
export default {
  get: (url, params, success, failure) => {
    return myax.apiAxios('GET', url, params)
  },
  post (url, params, success, failure) {
    return myax.apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return myax.apiAxios('PUT', url, params, success, failure)
  },
  delete: (url, params, success, failure) => {
    return myax.apiAxios('DELETE', url, params, success, failure)
  }
}


// example 
// 无参数
// this.$api.get('11', null, s => {
//     console.log(typeof s.data)
//     s.data.map(async x => { await this.list.push({name: x.name,today:x.today,status:x.gaptype,code: x.code })  })
//   })
// 有参数
// this.$api.get('11', {id:123}, s => {
//     console.log(typeof s.data)
//     s.data.map(async x => { await this.list.push({name: x.name,today:x.today,status:x.gaptype,code: x.code })  })
//   })
