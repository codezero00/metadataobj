const getters = {
    sidebar: state => state.app.sidebar,
    language: state => state.app.language,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,
    avatar: state => state.user.image,
    name: state => state.user.name,
    gbdiaglog: state => state.pub.DialogGolbalVisible,
    dialogrender: state => state.pub.DialogRenderContent,
    dialogwidth: state => state.pub.DialogAttr.Width,
    dialogtitle: state => state.pub.DialogAttr.Title,
    uuid: state => state.permission.uuid
  }
  export default getters
  