<template>
<el-row type="flex" class="row-bg">
  <el-col :span="24"><div class="grid-content right">

  <div class='fltag'>
    <h3>客户端注册</h3>
  </div>
  <el-table
    :data="etlclientsdata"
    border
    style="width: 100%">
    <el-table-column
      label="操作"
      width="150">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="" size="small">查看</el-button>
        <el-button type="danger" size="small">编辑</el-button>
      </template>
    </el-table-column>

    <el-table-column
      prop="KHDMC"
      label="客户端名称"
      >
    </el-table-column>
    <el-table-column
      prop="IPDZ"
      label="IP地址">
    </el-table-column>
    <el-table-column
      prop="SYDK"
      label="使用端口">
    </el-table-column>
    <el-table-column
      prop="URL"
      label="URL">
    </el-table-column>
    <el-table-column
      prop="BB"
      label="版本">
    </el-table-column>
    <el-table-column
      prop="WZ"
      label="位置">
    </el-table-column>
    <el-table-column
      prop="MS"
      label="描述">
    </el-table-column>
    <!-- <el-table-column
      prop="ZT"
      label="状态">
    </el-table-column> -->
    <el-table-column
      prop="ZT"
      label="状态"
      width="100">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.ZT === 'Online' ? 'success' : 'danger'"
          close-transition>{{scope.row.ZT}}</el-tag>
      </template>
    </el-table-column>
  </el-table>

    </div></el-col>
</el-row>
</template>

<script>
export default {
  data() {
    return {
      etlclientsdata: []
    };
  },

  mounted() {
    (async () => {
      const etlclients = await this.$Data.etlclients();
      console.log(etlclients)
      this.etlclientsdata = etlclients;
    })();
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
  min-height: 800px;
  padding: 10px 0;
}
.el-col {
  border-radius: 4px;
}
.left {
  /* background: #99a9bf; */
  margin: 0 15px 0 15px;
}
.fltag {
  margin-bottom: 20px;
  border-bottom: #d3dce6 solid 1px;
}
.right {
  margin: 0 15px 0 15px;
}

</style>