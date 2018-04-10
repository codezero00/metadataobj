<template>
<div>
<el-row type="flex" class="row-bg">
  <el-col :span="24"><div class="grid-content right">

      <div class="tab">
        <div class="tab_header">
          <el-button type="primary" class="fb-btn" icon="el-icon-plus">添加</el-button>
          <el-button type="primary" class="fb-btn" icon="el-icon-edit">编辑</el-button>
          <el-button type="warning" class="fb-btn" icon="el-icon-delete">删除</el-button>
          <el-button type="success" class="fb-btn" icon="el-icon-upload">导入</el-button>
          <el-button type="success" class="fb-btn" icon="el-icon-download">导出</el-button>
        </div>
        <div class="tab_main">
          <el-table
            :data="ResourceBaseData"
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
              prop="XMMC"
              label="项目名称"
              sortable
              align=center
              >
            </el-table-column>
            <el-table-column
              prop="SJLYDW"
              label="数据来源单位"
              sortable
              align=center
              >
            </el-table-column>
            <el-table-column
              prop="CJDW"
              label="承建单位"
              sortable
              align=center
              >
            </el-table-column>
            <el-table-column
              prop="LXR"
              label="联系人"
              sortable
              align=center
              >
            </el-table-column>
            <el-table-column
              prop="LXFS"
              label="联系方式"
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
                  :type="scope.row.ZT === '可用' ? 'success' : 'danger'"
                  close-transition>{{scope.row.ZT}}</el-tag>
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
</div>
</template>

<script>
export default {
  data() {
    return {
      ResourceBaseData: []
    };
  },

  mounted() {
    this.GetResourceBase();
  },

  methods:{
    async GetResourceBase(){
      const ResourceBase = await this.$Data.ResourceBase(); 
      this.ResourceBaseData = ResourceBase;
    },
    del() {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
  height: 333px;
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