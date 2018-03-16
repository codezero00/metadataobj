<template>
<el-row type="flex" class="row-bg">
  <el-col :span="24"><div class="grid-content right">

  <div class='fltag'>
    <h3>资源库</h3>
  </div>
  <el-table
    :data="dbmanagedata"
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
      prop="XMMC"
      label="项目名称"
      >
    </el-table-column>
    <el-table-column
      prop="SJLYDW"
      label="数据来源单位">
    </el-table-column>
    <el-table-column
      prop="CJDW"
      label="承建单位">
    </el-table-column>
    <el-table-column
      prop="LXR"
      label="联系人">
    </el-table-column>
    <el-table-column
      prop="LXFS"
      label="联系方式">
    </el-table-column>
    <el-table-column
      prop="ZT"
      label="状态">
    </el-table-column>
  </el-table>

    </div></el-col>
</el-row>
</template>

<script>
export default {
  data() {
    return {
      dbmanagedata: []
    };
  },

  mounted() {
    (async () => {
      const dbmanage = await this.$Data.dbmanage();
      console.log(dbmanage)
      this.dbmanagedata = dbmanage;
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