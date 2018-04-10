<template>
<el-row type="flex" class="row-bg">
  <el-col :span="24"><div class="grid-content right">


      <div class="tab">
        <div class="tab_header">
          <el-button type="primary" class="fb-btn" icon="el-icon-plus">添加</el-button>
          <el-button type="primary" class="fb-btn" icon="el-icon-edit">编辑</el-button>
          <el-button type="warning" @click="del" class="fb-btn" icon="el-icon-delete">删除</el-button>
          <el-button type="success" class="fb-btn" icon="el-icon-upload">导入</el-button>
          <el-button type="success" class="fb-btn" icon="el-icon-download">导出</el-button>
        </div>
        <div class="tab_main">
          <el-table
            :data="etljobsdata"
            border
            stripe
            height=450
            style="width: 100%"
            >
            <el-table-column
              type="selection"
              width="55"
              align=center
              >
            </el-table-column>
    <el-table-column
      prop="jobnum"
      label="作业编号"
      sortable
      align=center
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="作业名称"
      sortable
      align=center
      >
    </el-table-column>
    <el-table-column
      prop="remark"
      label="作业描述"
      sortable
      align=center
      >
    </el-table-column>
    <el-table-column
      prop="clientname"
      label="子服务器"
      width="80"
      sortable
      align=center
      >
    </el-table-column>
    <el-table-column
      prop="url"
      label="URL"
      width="200"
      sortable
      align=center
      >
    </el-table-column>
    <el-table-column
      prop="createtime"
      label="创建时间"
      sortable
      align=center
      >
    </el-table-column>
    <el-table-column
      label="状态"
      width="100"
      sortable
      align=center
      >
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.status === 'Running' ? 'success' : 'danger'"
          close-transition>{{scope.row.status}}</el-tag>
      </template>
    </el-table-column>

          </el-table>
        </div>
        <div class="tab_footer">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
        </div>
      </div>

    </div></el-col>
</el-row>
</template>

<script>
export default {
  data() {
    return {
      etljobsdata: []
    };
  },

  mounted() {
    this.getjobs();
    // (async () => {
    //   const dbmanage = await this.$Data.dbmanage();
    //   console.log(dbmanage)
    //   this.dbmanagedata = dbmanage;
    // })();
  },
  methods:{
    async getjobs(){
      const etljobs = await this.$Data.etljobs();
      this.etljobsdata = etljobs;
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
  min-height: 500px;
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
  height: 45px;
}
.right {
  margin: 0 15px 0 15px;
}

</style>