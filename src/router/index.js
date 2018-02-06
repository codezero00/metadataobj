import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login'
<<<<<<< HEAD
//
import Layout from '@/page/layout/Layout'
import home from '@/page/home'
//
import articlelist from '@/page/article/list.vue'
import createarticle from '@/page/article/create.vue'
import editarticle from '@/page/article/edit.vue'
//
import metadataclass from '@/page/MetaDataManage/metadataclass.vue'
import metadatadetail from '@/page/MetaDataManage/metadatadetail.vue'
import metadatasearch from '@/page/MetaDataManage/metadatasearch.vue'
//
import createtable from '@/page/DWManage/createtable.vue'
import resource from '@/page/DWManage/resource.vue'
import shareindex from '@/page/DWManage/shareindex.vue'
//
import odsregister from '@/page/ODSManage/odsregister.vue'
import odsdelete from '@/page/ODSManage/odsdelete.vue'
//
import clientregister from '@/page/TaskSchedulingManage/clientregister.vue'
import jobmonitoring from '@/page/TaskSchedulingManage/jobmonitoring.vue'
import jobmanage from '@/page/TaskSchedulingManage/jobmanage.vue'
import joblog from '@/page/TaskSchedulingManage/joblog.vue'
//
import datacheck from '@/page/DataQualityManage/datacheck.vue'
import datacheckrule from '@/page/DataQualityManage/datacheckrule.vue'
//
import tablelifecycle from '@/page/DataLifecycleManage/tablelifecycle.vue'
import viewlifecycle from '@/page/DataLifecycleManage/viewlifecycle.vue'
import dataline from '@/page/DataLifecycleManage/dataline.vue'
//
import relatedanalyze from '@/page/DataRelatedManage/relatedanalyze.vue'
import relatedgraph from '@/page/DataRelatedManage/relatedgraph.vue'
//
import nosqldatabasemanage from '@/page/NoSQLManage/databasemanage.vue'
import nosqlclassmanage from '@/page/NoSQLManage/classmanage.vue'
import nosqlindexmanage from '@/page/NoSQLManage/indexmanage.vue'
import nosqladvancedsearch from '@/page/NoSQLManage/advancedsearch.vue'
import nosqlvisualstatistics from '@/page/NoSQLManage/visualstatistics.vue'
import nosqllog from '@/page/NoSQLManage/nosqllog.vue'
//
import modelregister from '@/page/DataModelManage/modelregister'
import modelvisual from '@/page/DataModelManage/modelvisual'
import modelmonitor from '@/page/DataModelManage/modelmonitor'
import mlmodelmanage from '@/page/DataModelManage/mlmodelmanage'
import vedioanlyzemanage from '@/page/DataModelManage/vedioanlyzemanage'
import graphmodelmanage from '@/page/DataModelManage/graphmodelmanage'
import modelstatistics from '@/page/DataModelManage/modelstatistics'
import modellog from '@/page/DataModelManage/modellog'
//
=======
import articlelist from '@/page/article/list.vue'
import createarticle from '@/page/article/create.vue'
import editarticle from '@/page/article/edit.vue'


import Layout from '@/page/layout/Layout'
import home from '@/page/home'

>>>>>>> 57cea8b6f3f4db93d8475423a5ab28c0bcfc6790
Vue.use(Router)

//所有权限通用路由表 
//如首页和登录页和一些不用权限的公用页面
export const constrouterMap = [{
    path: '/',
    name: '登陆页',
    redirect: '/login',
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: {
      template: '<h1>404</h1>'
    },
    hidden: true
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    children: [{
      path: 'index',
      component: home,
      name: 'dashboard',
      meta: {
        title: 'dashboard',
        icon: 'dashboard',
        noCache: false
      }
    }]
  },
<<<<<<< HEAD

=======
>>>>>>> 57cea8b6f3f4db93d8475423a5ab28c0bcfc6790
  {
    path: '/documentation',
    component: Layout,
    // redirect: '/documentation/index',
    meta: {
      title: 'documentation',
      icon: 'documentation'
    },
    children: [
      {path: 'list', component: articlelist,name: 'articlelist',meta: {title: 'articlelist',icon: 'documentation',noCache: false}},
      {path: 'create', component: createarticle,name: 'createarticle',meta: {title: 'createarticle',icon: 'documentation',noCache: false}},
      {path: 'edit', component: editarticle,name: 'editarticle',meta: {title: 'editarticle',icon: 'documentation',noCache: false}}
      
    ]
  },

<<<<<<< HEAD
  {
    path: '/metadatamanage',
    component: Layout,
    // redirect: '/documentation/index',
    meta: {
      title: 'metadatamanage',
      icon: 'documentation'
    },
    children: [
      {path: 'class', component: metadataclass,name: 'metadataclass',meta: {title: 'metadataclass',icon: 'documentation',noCache: false}},
      {path: 'detail', component: metadatadetail,name: 'metadatadetail',meta: {title: 'metadatadetail',icon: 'documentation',noCache: false}},
      {path: 'search', component: metadatasearch,name: 'metadatasearch',meta: {title: 'metadatasearch',icon: 'documentation',noCache: false}}
      
    ]
  },

  {
    path: '/dwmanage',
    component: Layout,
    // redirect: '/documentation/index',
    meta: {
      title: 'dwmanage',
      icon: 'documentation'
    },
    children: [
      {path: 'resource', component: resource,name: 'resource',meta: {title: 'resource',icon: 'documentation',noCache: false}},
      {path: 'createtable', component: createtable,name: 'createtable',meta: {title: 'createtable',icon: 'documentation',noCache: false}},
      {path: 'shareindex', component: shareindex,name: 'shareindex',meta: {title: 'shareindex',icon: 'documentation',noCache: false}}
      
    ]
  },

  {
    path: '/odsmanage',
    component: Layout,
    // redirect: '/documentation/index',
    meta: {
      title: 'odsmanage',
      icon: 'documentation'
    }, 
    children: [
      {path: 'odsregister', component: odsregister, name: 'odsregister', meta: {title: 'odsregister',icon: 'documentation',noCache: false}},
      {path: 'odsdelete', component: odsdelete, name: 'odsdelete', meta: {title: 'odsdelete',icon: 'documentation',noCache: false}}, 
    ]
  },

  {
    path: '/taskschedulingmanage',
    component: Layout,
    // redirect: '/documentation/index',
    meta: {
      title: 'taskschedulingmanage',
      icon: 'documentation'
    }, 
    children: [
      {path: 'clientregister', component: clientregister, name: 'clientregister', meta: {title: 'clientregister',icon: 'documentation',noCache: false}},
      {path: 'jobmanage', component: jobmanage, name: 'jobmanage', meta: {title: 'jobmanage',icon: 'documentation',noCache: false}}, 
      {path: 'jobmonitoring', component: jobmonitoring, name: 'jobmonitoring', meta: {title: 'jobmonitoring',icon: 'documentation',noCache: false}}, 
      {path: 'joblog', component: joblog, name: 'joblog', meta: {title: 'joblog',icon: 'documentation',noCache: false}}, 
    ]
  },

  {
    path: '/dataqualitymanage',
    component: Layout,
    // redirect: '/documentation/index',
    meta: {
      title: 'dataqualitymanage',
      icon: 'documentation'
    }, 
    children: [
      {path: 'datacheck', component: datacheck, name: 'datacheck', meta: {title: 'datacheck',icon: 'documentation',noCache: false}},
      {path: 'datacheckrule', component: datacheckrule, name: 'datacheckrule', meta: {title: 'datacheckrule',icon: 'documentation',noCache: false}}, 
    ]
  },

  {
    path: '/datalifecyclemanage',
    component: Layout,
    // redirect: '/documentation/index',
    meta: {
      title: 'datalifecyclemanage',
      icon: 'documentation'
    }, 
    children: [
      {path: 'tablelifecycle', component: tablelifecycle, name: 'tablelifecycle', meta: {title: 'tablelifecycle',icon: 'documentation',noCache: false}},
      {path: 'viewlifecycle', component: viewlifecycle, name: 'viewlifecycle', meta: {title: 'viewlifecycle',icon: 'documentation',noCache: false}}, 
      {path: 'dataline', component: dataline, name: 'dataline', meta: {title: 'dataline',icon: 'documentation',noCache: false}}, 
    ]
  },

  {
    path: '/datarelatedmanage',
    component: Layout,
    // redirect: '/documentation/index',
    meta: {
      title: 'datarelatedmanage',
      icon: 'documentation'
    }, 
    children: [
      {path: 'relatedanalyze', component: relatedanalyze, name: 'relatedanalyze', meta: {title: 'relatedanalyze',icon: 'documentation',noCache: false}},
      {path: 'relatedgraph', component: relatedgraph, name: 'relatedgraph', meta: {title: 'relatedgraph',icon: 'documentation',noCache: false}}, 
   ]
  },

  {
    path: '/nosqlmanage',
    component: Layout,
    // redirect: '/documentation/index',
    meta: {
      title: 'nosqlmanage',
      icon: 'documentation'
    }, 
    children: [
      {path: 'nosqldatabasemanage', component: nosqldatabasemanage, name: 'nosqldatabasemanage', meta: {title: 'nosqldatabasemanage',icon: 'documentation',noCache: false}},
      {path: 'nosqlclassmanage', component: nosqlclassmanage, name: 'nosqlclassmanage', meta: {title: 'nosqlclassmanage',icon: 'documentation',noCache: false}}, 
      {path: 'nosqlindexmanage', component: nosqlindexmanage, name: 'nosqlindexmanage', meta: {title: 'nosqlindexmanage',icon: 'documentation',noCache: false}}, 
      {path: 'nosqladvancedsearch', component: nosqladvancedsearch, name: 'nosqladvancedsearch', meta: {title: 'nosqladvancedsearch',icon: 'documentation',noCache: false}}, 
      {path: 'nosqlvisualstatistics', component: nosqlvisualstatistics, name: 'nosqlvisualstatistics', meta: {title: 'nosqlvisualstatistics',icon: 'documentation',noCache: false}}, 
      {path: 'nosqllog', component: nosqllog, name: 'nosqllog', meta: {title: 'nosqllog',icon: 'documentation',noCache: false}}, 

    ]
  },
  
  {
    path: '/datamodelmanage',
    component: Layout,
    // redirect: '/documentation/index',
    meta: {
      title: 'datamodelmanage',
      icon: 'documentation'
    }, 
    children: [
      {path: 'modelregister', component: modelregister, name: 'modelregister', meta: {title: 'modelregister',icon: 'documentation',noCache: false}},
      {path: 'modelvisual', component: modelvisual, name: 'modelvisual', meta: {title: 'modelvisual',icon: 'documentation',noCache: false}}, 
      {path: 'modelmonitor', component: modelmonitor, name: 'modelmonitor', meta: {title: 'modelmonitor',icon: 'documentation',noCache: false}}, 
      {path: 'mlmodelmanage', component: mlmodelmanage, name: 'mlmodelmanage', meta: {title: 'mlmodelmanage',icon: 'documentation',noCache: false}}, 
      {path: 'vedioanlyzemanage', component: vedioanlyzemanage, name: 'vedioanlyzemanage', meta: {title: 'vedioanlyzemanage',icon: 'documentation',noCache: false}}, 
      {path: 'graphmodelmanage', component: graphmodelmanage, name: 'graphmodelmanage', meta: {title: 'graphmodelmanage',icon: 'documentation',noCache: false}}, 
      {path: 'modelstatistics', component: modelstatistics, name: 'modelstatistics', meta: {title: 'modelstatistics',icon: 'documentation',noCache: false}}, 
      {path: 'modellog', component: modellog, name: 'modellog', meta: {title: 'modellog',icon: 'documentation',noCache: false}}, 

    ]
  },

=======
>>>>>>> 57cea8b6f3f4db93d8475423a5ab28c0bcfc6790

]

export const asyncrouterMap = [{
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    name: 'charts',
    children: [{
      path: 'index',
      component: home,
      name: 'charts',
      meta: {
        title: 'charts',
        icon: 'charts',
        noCache: false
      }
    }]
  },
  {
    path: '*',
    redirect: '/404'
  }
]


const router = new Router({
  mode: 'history',
  routes: constrouterMap
})

// router.addRoutes(asyncrouterMap)

export default router
