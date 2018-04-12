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
            :data="etlclientsdata.res"
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
      prop="KHDMC"
      label="客户端名称"
      width="150"
                    sortable
              align=center
      >
    </el-table-column>
    <el-table-column
      prop="IPDZ"
      label="IP地址"
      width="100"
                    sortable
              align=center
      >
    </el-table-column>
    <el-table-column
      prop="SYDK"
      label="使用端口"
      width="100"
                    sortable
              align=center
      >
    </el-table-column>
    <el-table-column
      prop="URL"
      label="URL"
      width="200"
                    sortable
              align=center
      >
    </el-table-column>
    <el-table-column
      prop="BB"
      label="版本"
      width="50"
                    sortable
              align=center
      >
    </el-table-column>
    <el-table-column
      prop="WZ"
      label="位置">
    </el-table-column>
    <el-table-column
      prop="MS"
      label="描述"
                    sortable
              align=center
      >
    </el-table-column>

    <el-table-column
      prop="ZT"
      label="状态"
      width="100"
                    sortable
              align=center
      >
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.ZT === 'Online' ? 'success' : 'danger'"
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
							:current-page="ParamsPage.CurrentPage"
							:page-sizes="[10, 20, 30, 40]"
							:page-size= "ParamsPage.PageSize"
							layout="total, sizes, prev, pager, next, jumper"
							:total="ParamsPage.TotalCount">
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
      etlclientsdata: [],
      ParamsPage: {
        CurrentPage: 1,
        PageSize: 10,
        TotalCount: 0
      }
    };
  },

  mounted() {
    this.GetETLClients(this.ParamsPage)
    // (async () => {
    //   const etlclients = await this.$Data.etlclients();
    //   console.log(etlclients);
    //   this.etlclientsdata = etlclients;
    // })();
  },
  methods: {
	  handleSizeChange(value){
      this.ParamsPage.PageSize=value;
      this.GetETLClients(this.ParamsPage);
    },
    handleCurrentChange(value){
      this.ParamsPage.CurrentPage=value;
      this.GetETLClients(this.ParamsPage);
    },
    async GetETLClients(params) {
      const etlclients = await this.$Data.etlclients(params);
      this.etlclientsdata = etlclients;
      this.ParamsPage.CurrentPage = etlclients.page.page_index;
      this.ParamsPage.TotalCount = etlclients.page.item_count;
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
    },
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
.btn_fro {
  margin-left: 10px;
}
.btn_beh {
  margin-left: 5px;
}
</style>