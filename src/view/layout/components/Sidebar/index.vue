<template>
  <scroll-bar>
    <el-menu mode="vertical" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
      <div class="nav-log">
				<span v-show="log==1">数据基础平台</span>
			</div>
      <sidebar-item :routes="routers1"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    routers1(){
      // console.log(this.$store.state.permission.routers)
      // console.log(this.$route.path)
      return this.$store.state.permission.routers
    },
    isCollapse() {
      //       debugger;
      // console.log(this.$store.state.permission.routers)
      return !this.sidebar.opened
    },
    log(){
				return this.$store.state.app.sidebar.opened
		}
  }
}
</script>
