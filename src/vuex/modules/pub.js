import Cookies from 'js-cookie'

const pub = {
  state: {
    bottomNav: '选股', //tabbar
    open: false, //drawer
    sharecode: '',
    tabledata: [],
    sidebar: {
      // opened: !+Cookies.get('sidebarStatus')
      opened: true 
    },
    visitedViews: [],
    DialogGolbalVisible: false,
    DialogRenderContent: null
  },
  mutations: {
    SET_RENDER(state, val) {
      state.DialogRenderContent = val
    },
    SET_DIALOG(state, val) {
      state.DialogGolbalVisible = val
    },
    SET_BOTTOMNAV(state, val) {
      state.bottomNav = val
    },
    SET_LEFTBAR(state) {
      state.open = !state.open
    },
    SET_SHARECODE(state, val){
      state.sharecode = val
    },
    SET_TABLEDATA(state, val){
      state.tabledata = val
    },
    TOGGLE_SIDEBAR(state){
      // if (state.sidebar.opened) {
      //   Cookies.set('sidebarStatus', 1)
      // } else {
      //   Cookies.set('sidebarStatus', 0)
      // }
      state.sidebar.opened = !state.sidebar.opened
    },
    ADD_VISITED_VIEWS(state, view){
      if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push({ name: view.name, path: view.path })
    },
    DEL_VISITED_VIEWS(state, view){
      let index
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          index = i
          break
        }
      }
      state.visitedViews.splice(index, 1)
    }
  },
  actions: {
    setrender({commit}, val) {
      commit('SET_RENDER', val)
    },
    setDialogVisible({commit},val) {
      commit('SET_DIALOG', val)
    },
    toggle({commit}) {
      commit('SET_LEFTBAR')
    },
    setbottomNav({commit}, val) {
      commit('SET_BOTTOMNAV', val)
    },
    setsharecode({commit}, val) {
      commit('SET_SHARECODE', val)
    },
    settabledata({commit}, val){
      commit('SET_TABLEDATA', val)
    },
    ToggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    addVisitedViews({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    }
  }
}

export default pub
