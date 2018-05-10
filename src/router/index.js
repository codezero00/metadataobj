import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login'
//layout 布局
import Layout from '@/view/layout/Layout'
import home from '@/view/home'
//
import articlelist from '@/view/article/list.vue'
import createarticle from '@/view/article/create.vue'
import editarticle from '@/view/article/edit.vue'
//元数据模块
import metadataclass from '@/view/MetaDataManage/metadataclass.vue'
import metadatadetail from '@/view/MetaDataManage/metadatadetail.vue'
import metadatasearch from '@/view/MetaDataManage/metadatasearch.vue'
//数据仓库管理
import FrontDatabaseManage from '@/view/DWManage/FrontDatabaseManage.vue'  // 前置库
import ResourceManage from '@/view/DWManage/ResourceManage.vue'  // 资源库与分层
import LayerManage from '@/view/DWManage/LayerManage.vue'  // 资源库与分层
import DataTableManage from '@/view/DWManage/DataTableManage.vue'  // 数据表管理
import ResourceIndex from '@/view/DWManage/ResourceIndex.vue' // 资源目录
import LayerIndex from '@/view/DWManage/LayerIndex.vue' // 分层目录
import shareindex from '@/view/DWManage/shareindex.vue' // 共享目录
//
import odsregister from '@/view/ODSManage/odsregister.vue'
import odsdelete from '@/view/ODSManage/odsdelete.vue'
//任务调度管理
import clientregister from '@/view/TaskSchedulingManage/clientregister.vue'
import jobmonitoring from '@/view/TaskSchedulingManage/jobmonitoring.vue'
import jobmanage from '@/view/TaskSchedulingManage/jobmanage.vue'
import joblog from '@/view/TaskSchedulingManage/joblog.vue'
//数据质量检查
import datacheck from '@/view/DataQualityManage/datacheck.vue'
import datacheckrule from '@/view/DataQualityManage/datacheckrule.vue'
//生命周期
import tablelifecycle from '@/view/DataLifecycleManage/tablelifecycle.vue'
import viewlifecycle from '@/view/DataLifecycleManage/viewlifecycle.vue'
import dataline from '@/view/DataLifecycleManage/dataline.vue'
//数据血缘
import RelatedManage from '@/view/DataRelatedManage/RelatedManage.vue'
import RelatedAnalyze from '@/view/DataRelatedManage/RelatedAnalyze.vue'
import RelatedGraph from '@/view/DataRelatedManage/RelatedGraph.vue'
//非结构化数据管理
import nosqldatabasemanage from '@/view/NoSQLManage/databasemanage.vue'

import nosqlindexmanage from '@/view/NoSQLManage/indexmanage.vue'
import nosqladvancedsearch from '@/view/NoSQLManage/advancedsearch.vue'
import nosqlvisualstatistics from '@/view/NoSQLManage/visualstatistics.vue'
import nosqllog from '@/view/NoSQLManage/nosqllog.vue'
//数据模型管理
import modelregister from '@/view/DataModelManage/modelregister'
import modelvisual from '@/view/DataModelManage/modelvisual'
import modelmonitor from '@/view/DataModelManage/modelmonitor'
import mlmodelmanage from '@/view/DataModelManage/mlmodelmanage'
import vedioanlyzemanage from '@/view/DataModelManage/vedioanlyzemanage'
import graphmodelmanage from '@/view/DataModelManage/graphmodelmanage'
import modelstatistics from '@/view/DataModelManage/modelstatistics'
import modellog from '@/view/DataModelManage/modellog'
//test
import selecttree from '@/view/test/treeselect'

//
Vue.use(Router)

//所有权限通用路由表 
//如首页和登录页和一些不用权限的公用页面
export const constrouterMap = [{
    path: '/',
    name: '登陆页',
    // redirect: '/home',
    redirect: '/dashboard',
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

  {
    path: '/metadatamanage',
    component: Layout,
    // redirect: '/documentation/index',
    meta: {
      title: 'metadatamanage',
      icon: 'documentation'
    },
    children: [
      {path: 'class', component: metadataclass,name: 'metadataclass',meta: {title: 'metadataclass',icon: 'dot',noCache: false}},
      {path: 'detail', component: metadatadetail,name: 'metadatadetail',meta: {title: 'metadatadetail',icon: 'dot',noCache: false}},
      {path: 'createarticle', component: createarticle,name: 'metadatasearch',meta: {title: 'metadatasearch',icon: 'documentation',noCache: false}}
      
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
      {path: 'FrontDatabaseManage', component: FrontDatabaseManage,name: 'FrontDatabaseManage',meta: {title: 'FrontDatabaseManage',icon: 'dot',noCache: false}},
      
      //{path: 'ResourceAndLayer', component: ResourceAndLayer,name: 'ResourceAndLayer',meta: {title: 'ResourceAndLayer',icon: 'documentation',noCache: false}},
      {path: 'ResourceManage', component: ResourceManage,name: 'ResourceManage',meta: {title: 'ResourceManage',icon: 'dot',noCache: false}},
      {path: 'LayerManage', component: LayerManage,name: 'LayerManage',meta: {title: 'LayerManage',icon: 'dot',noCache: false}},
 
      {path: 'DataTableManage', component: DataTableManage,name: 'DataTableManage',meta: {title: 'DataTableManage',icon: 'dot',noCache: false}},

      {path: 'ResourceIndex', component: ResourceIndex,name: 'ResourceIndex',meta: {title: 'ResourceIndex',icon: 'dot',noCache: false}},
      {path: 'LayerIndex', component: LayerIndex,name: 'LayerIndex',meta: {title: 'LayerIndex',icon: 'dot',noCache: false},
    },

      //{path: 'shareindex', component: shareindex,name: 'shareindex',meta: {title: 'shareindex',icon: 'documentation',noCache: false}}
      
    ]
  },

  // {
  //   path: '/odsmanage',
  //   component: Layout,
  //   // redirect: '/documentation/index',
  //   meta: {
  //     title: 'odsmanage',
  //     icon: 'documentation'
  //   }, 
  //   children: [
  //     {path: 'odsregister', component: odsregister, name: 'odsregister', meta: {title: 'odsregister',icon: 'documentation',noCache: false}},
  //     {path: 'odsdelete', component: odsdelete, name: 'odsdelete', meta: {title: 'odsdelete',icon: 'documentation',noCache: false}}, 
  //   ]
  // },

  {
    path: '/taskschedulingmanage',
    component: Layout,
    // redirect: '/documentation/index',
    meta: {
      title: 'taskschedulingmanage',
      icon: 'documentation'
    }, 
    children: [
      {path: 'clientregister', component: clientregister, name: 'clientregister', meta: {title: 'clientregister',icon: 'dot',noCache: false}},
      {path: 'jobmanage', component: jobmanage, name: 'jobmanage', meta: {title: 'jobmanage',icon: 'dot',noCache: false}}, 
      //{path: 'jobmonitoring', component: jobmonitoring, name: 'jobmonitoring', meta: {title: 'jobmonitoring',icon: 'documentation',noCache: false}}, 
      //{path: 'joblog', component: joblog, name: 'joblog', meta: {title: 'joblog',icon: 'documentation',noCache: false}}, 
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
      {path: 'datacheck', component: datacheck, name: 'datacheck', meta: {title: 'datacheck',icon: 'dot',noCache: false}},
      {path: 'datacheckrule', component: datacheckrule, name: 'datacheckrule', meta: {title: 'datacheckrule',icon: 'dot',noCache: false}}, 
    ]
  },
  // 数据生命周期
  // {
  //   path: '/datalifecyclemanage',
  //   component: Layout,
  //   // redirect: '/documentation/index',
  //   meta: {
  //     title: 'datalifecyclemanage',
  //     icon: 'documentation'
  //   }, 
  //   children: [
  //     {path: 'tablelifecycle', component: tablelifecycle, name: 'tablelifecycle', meta: {title: 'tablelifecycle',icon: 'dot',noCache: false}},
  //     {path: 'viewlifecycle', component: viewlifecycle, name: 'viewlifecycle', meta: {title: 'viewlifecycle',icon: 'dot',noCache: false}}, 
  //     {path: 'dataline', component: dataline, name: 'dataline', meta: {title: 'dataline',icon: 'dot',noCache: false}}, 
  //   ]
  // },

  {
    path: '/datarelatedmanage',
    component: Layout,
    // redirect: '/documentation/index',
    meta: {
      title: 'datarelatedmanage',
      icon: 'documentation'
    }, 
    children: [
      {path: 'RelatedManage', component: RelatedManage, name: 'RelatedManage', meta: {title: 'RelatedManage',icon: 'dot',noCache: false}},
      // {path: 'relatedanalyze', component: RelatedAnalyze, name: 'relatedanalyze', meta: {title: 'relatedanalyze',icon: 'dot',noCache: false}},
      {path: 'relatedgraph', component: RelatedGraph, name: 'relatedgraph', meta: {title: 'relatedgraph',icon: 'dot',noCache: false}}, 
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
      {path: 'nosqldatabasemanage', component: nosqldatabasemanage, name: 'nosqldatabasemanage', meta: {title: 'nosqldatabasemanage',icon: 'dot',noCache: false}},
      {path: 'NosqlFileManage', component: () => import('@/view/NoSQLManage/FileManage.vue'), name: 'NosqlFileManage', meta: {title: 'NosqlFileManage',icon: 'dot',noCache: false}}, 
      //{path: 'nosqlindexmanage', component: nosqlindexmanage, name: 'nosqlindexmanage', meta: {title: 'nosqlindexmanage',icon: 'dot',noCache: false}}, 
      //{path: 'nosqladvancedsearch', component: nosqladvancedsearch, name: 'nosqladvancedsearch', meta: {title: 'nosqladvancedsearch',icon: 'dot',noCache: false}}, 
      //{path: 'nosqlvisualstatistics', component: nosqlvisualstatistics, name: 'nosqlvisualstatistics', meta: {title: 'nosqlvisualstatistics',icon: 'dot',noCache: false}}, 
      //{path: 'nosqllog', component: nosqllog, name: 'nosqllog', meta: {title: 'nosqllog',icon: 'dot',noCache: false}}, 

    ]
  },
  
  // {
  //   path: '/datamodelmanage',
  //   component: Layout,
  //   // redirect: '/documentation/index',
  //   meta: {
  //     title: 'datamodelmanage',
  //     icon: 'documentation'
  //   }, 
  //   children: [
  //     //{path: 'modelregister', component: modelregister, name: 'modelregister', meta: {title: 'modelregister',icon: 'dot',noCache: false}},
  //     //{path: 'modelvisual', component: modelvisual, name: 'modelvisual', meta: {title: 'modelvisual',icon: 'dot',noCache: false}}, 
  //     //{path: 'modelmonitor', component: modelmonitor, name: 'modelmonitor', meta: {title: 'modelmonitor',icon: 'dot',noCache: false}}, 
  //     //{path: 'mlmodelmanage', component: mlmodelmanage, name: 'mlmodelmanage', meta: {title: 'mlmodelmanage',icon: 'dot',noCache: false}}, 
  //     //{path: 'vedioanlyzemanage', component: vedioanlyzemanage, name: 'vedioanlyzemanage', meta: {title: 'vedioanlyzemanage',icon: 'dot',noCache: false}}, 
  //     //{path: 'graphmodelmanage', component: graphmodelmanage, name: 'graphmodelmanage', meta: {title: 'graphmodelmanage',icon: 'dot',noCache: false}}, 
  //     //{path: 'modelstatistics', component: modelstatistics, name: 'modelstatistics', meta: {title: 'modelstatistics',icon: 'dot',noCache: false}}, 
  //     //{path: 'modellog', component: modellog, name: 'modellog', meta: {title: 'modellog',icon: 'dot',noCache: false}}, 

  //   ]
  // },
// tset
  // {
  //   path: '/tset',
  //   component: Layout,
  //   meta: {
  //     title: 'test',
  //     icon: 'test'
  //   }, 
  //   children: [
  //     {path: 'selecttree', component: selecttree, name: 'selecttree', meta: {title: 'selecttree',icon: 'dot',noCache: false}},
  //   ]
  // },

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
