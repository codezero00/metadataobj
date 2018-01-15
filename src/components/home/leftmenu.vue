<template>
<div class="leftmenu">
  

<!-- <input type="checkbox" v-model="isCollapse" id="checkbox"> 
<label for="checkbox"></label> -->

<el-menu 
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b"
  default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
  <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span slot="title">文章管理</span>
    </template>
    <el-menu-item-group title="文章管理">
      <el-menu-item index="1-2" @click="metadatagroup">文章列表</el-menu-item>
      <el-menu-item index="1-3" @click="metadatadetail">文章详情</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
  <el-menu-item index="2">
    <i class="el-icon-menu"></i>
    <span slot="title">人物资料管理</span>
  </el-menu-item>
  <el-menu-item index="3">
    <i class="el-icon-setting"></i>
    <span slot="title">其他</span>
  </el-menu-item>
</el-menu>
</div>
</template>


<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  /* min-height: 800px; */
}
.el-menu-vertical-demo{
  background-color: rgb(84, 92, 100);
  height: 90%;
  top:0px
}

.leftmenu{
  float: left;
    height: 100%;
}
input[id='checkbox'] {
  display: none;
}
label::before {
    content: "";
    display: inline-block;
    width: 200px;
    height: 30px;
    background: rgb(53, 183, 211);
    border: 5px #EEEEEE solid;
    vertical-align: middle;
    /* -webkit-border-radius: 50%; */
    margin-right: 5px;
    -webkit-box-sizing:border-box;
  -webkit-transition:background ease-in .5s
}

input[type="checkbox"]:checked+label::before{
    background-color: rgb(53, 183, 111);
    border: 5px #EEEEEE solid;
    width: 65px;
}
</style>

<script>
export default {
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    metadatagroup(){
      this.$router.push({ name: "home" });
    },
    metadatadetail(){
      this.$router.push({ name: "metadatadetail" });
    },
  }
};
</script>