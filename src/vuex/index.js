import Vue from "vue"
import Vuex from "vuex"
import user from './modules/user'
import pub from './modules/pub'
import permission from './modules/permission'
import app from './modules/app'
import tagsView from './modules/tagsView'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    pub,
    user,
    permission,
    app,
    tagsView
  },
  getters
})

export default store
