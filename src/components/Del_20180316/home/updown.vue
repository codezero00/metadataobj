<template>
<div class='updown'>
<UploadExcelComponent @on-selected-file='selected' class='up'></UploadExcelComponent>
  <!-- <el-button size="small" type="primary">点击上传</el-button> -->
<el-button size="small" type="danger" class='down'>文档下载</el-button>
</div>

</template>

<script>
import UploadExcelComponent from "../utils/uploadxlsx";

export default {
  components: { UploadExcelComponent },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    selected(data) {
      this.$store.dispatch("settabledata", data.results);
      // this.tableData = data.results
      // this.tableHeader = data.header
    }
  },


};
</script>

<style scoped>
.updown{
    margin: 10px 0 0 188px;
    float: left;
}
.up{
    float: left;
}
.down{
    float: left;
    margin-left: 10px;
}
</style>
