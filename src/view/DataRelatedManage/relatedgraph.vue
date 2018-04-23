<template>
<el-row type="flex" class="row-bg">
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="18">
    <div class="grid-content bg-purple-light">
      <BloodGraph ></BloodGraph>
    </div>
  </el-col>
</el-row>
</template>


<script>
import BloodGraph from "./components/relatedgraph/bloodgraph.vue";
export default {
  name: "test123",
  components: { BloodGraph },
  data(){
    return{
      // GraphData:null
    }
  },

  methods:{

  }
};
</script>


<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  /* .bg-purple-dark {
    background: #99a9bf;
  } */
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background-color:white;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    /* background-color: #f9fafc; */
  }
</style>