<template>
<div class="table1">
  <el-table
    :data="tableData"
    height="500"
    border
    style="width: 100%">
    <el-table-column
      prop="ZYSXBH"
      label="资源属性编号"
      >
    </el-table-column>
    <el-table-column
      prop="BZBM"
      label="标准编码"
      >
    </el-table-column>
    <el-table-column
      prop="ZDMC"
      label="字段名称">
    </el-table-column>
    <el-table-column
      prop="YSZDMC"
      label="字段名称（原始）">
    </el-table-column>
    <el-table-column
      prop="ZYSXZWMC"
      label="资源属性中文名称">
    </el-table-column>
    <el-table-column
      prop="ZYSXZWQP"
      label="资源属性中文全拼">
    </el-table-column>
    <el-table-column
      prop="CD"
      label="长度">
    </el-table-column>
    <el-table-column
      prop="LX"
      label="类型">
    </el-table-column>
    <el-table-column
      prop="ZYSXDY"
      label="资源属性定义"
      width="140">
    </el-table-column>
    <el-table-column
      prop="BZ"
      label="备注">
    </el-table-column>
    <el-table-column
      fixed="left"
      label="操作"
      width="90">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- <UploadExcelComponent @on-selected-file='selected'></UploadExcelComponent> -->
</div>
</template>

<script>


export default {
  // components: { UploadExcelComponent },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    // selected(data) {
    //   this.$store.dispatch("settabledata", data.results);
    //   // this.tableData = data.results
    //   // this.tableHeader = data.header
    // }
  },
  computed: {
    tableData() {
      console.log(this.$store.state.pub.tabledata);
      return this.$store.state.pub.tabledata;
    }
  },
  data() {
    return {
      // tableData3: [
      //   {
      //     date: "2016-05-03",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1518 弄"
      //   }
      // ]
      // tableData: [],
      // tableHeader: []
    };
  }
};
</script>

<style scoped>
.table1 {
  float: left;
  width: 100%;
}
</style>
