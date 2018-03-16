<template>
  <el-container>
      <el-col :span="24"><tableArticle></tableArticle></el-col>
  </el-container>
</template>

<script>
import tableArticle from "@/components/del_20180316/home/tableArticle.vue";
export default {
  name: "articlelist",
  components: { tableArticle }
};
</script>


<style scoped>
.header {
  background-color: #999;
}

.main {
  padding: 0;
  /* min-height: 500px; */
  height: 100%;
}
.bread {
  height: 40px;
  line-height: 40px;
  margin-left: 10px;
}

input[id='checkbox'] {
  display: none;
}
label::before {
    content: "";
    display: inline-block;
    width: 30px;
    height: 60px;
    background: rgb(53, 183, 211);
    border: 5px #EEEEEE solid;
    vertical-align: middle;
    margin-right: 5px;
    -webkit-box-sizing:border-box;
    -webkit-transition:background ease-in .5s
}

input[type="checkbox"]:checked+label::before{
    background-color: rgb(53, 183, 111);
    border: 5px #EEEEEE solid;
    width: 30px;
}
</style>
