<template>
	<el-row type="flex" class="row-bg">
		<el-col :span="24">
			<div class="grid-content right">
				<div class="search">
					<el-input placeholder="请输入内容" suffix-icon="el-icon-search" ></el-input>
					<el-input placeholder="请输入内容" suffix-icon="el-icon-search" ></el-input>
					<el-input placeholder="请输入内容" suffix-icon="el-icon-search" ></el-input>
					<el-input placeholder="请输入内容" suffix-icon="el-icon-search" ></el-input>
					<el-input placeholder="请输入内容" suffix-icon="el-icon-search" ></el-input>
					<el-input placeholder="请输入内容" suffix-icon="el-icon-search" ></el-input>
					<el-button type="primary" icon="el-icon-search" class="sac">搜索</el-button>
					<el-button type="text">高级搜索</el-button>
				</div>

				<div class="tab">
					<div class="tab_header">
						<el-button type="primary" class="fb-btn" icon="el-icon-plus">添加</el-button>
						<el-button type="primary" class="fb-btn" icon="el-icon-edit">编辑</el-button>
						<el-button type="warning" class="fb-btn" icon="el-icon-delete">删除</el-button>
						<el-button type="success" class="fb-btn" icon="el-icon-upload">导入</el-button>
						<el-button type="success" class="fb-btn" icon="el-icon-download">导出</el-button>
					</div>
					<div class="tab_main">
						<el-table :data="DBTableData.res" 
						border 
						stripe 
						height=450 
						style="width: 100%">
							<el-table-column type="selection" width="55" align=center>
							</el-table-column>
							<el-table-column prop="resname" label="所属资源库" sortable align=center>
							</el-table-column>
							<el-table-column prop="dlname" label="所属层级" sortable align=center>
							</el-table-column>
							<el-table-column prop="tablenameyw" label="表英文名称" sortable align=center>
							</el-table-column>
							<el-table-column prop="tablenamezw" label="表中文名称" sortable align=center>
							</el-table-column>
							<el-table-column prop="remark" label="描述" sortable align=center>
							</el-table-column>
							<el-table-column prop="createtime" label="创建时间" sortable align=center>
							</el-table-column>
							<el-table-column prop="updatetime" label="最后修改时间" sortable align=center>
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

			</div>
		</el-col>
	</el-row>
</template>

<script>
export default {
  data() {
    return {
      DBTableData: [],
      ParamsPage: {
        CurrentPage: 1,
        PageSize: 10,
        TotalCount: 0
      }
    };
  },

  mounted() {
    // (async () => {
    //   const dbtable = await this.$Data.dbtable();
    //   this.DBTableData = dbtable;
    // })();
    this.GetTable(this.ParamsPage);
  },
  methods: {
	  handleSizeChange(value){
      this.ParamsPage.PageSize=value;
      this.GetTable(this.ParamsPage);
    },
    handleCurrentChange(value){
      this.ParamsPage.CurrentPage=value;
      this.GetTable(this.ParamsPage);
    },
    async GetTable(params) {
      const DataTable = await this.$Data.GetTable(params);
      this.DBTableData = DataTable;
      this.ParamsPage.CurrentPage = DataTable.page.page_index;
      this.ParamsPage.TotalCount = DataTable.page.item_count;
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
    handleSelect(item) {
      console.log(item);
    },
    handleIconClick(ev) {
      console.log(ev);
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
/*搜索*/

.search {
  width: 100%;
  height: 60px;
  padding-top: 12px;
  padding-left: 10px;
  background-color: #ffffff;
  border-radius: 12px;
  box-sizing: border-box;
}

.el-input__inner {
  margin-left: 12px;
  border-radius: 7px;
}

.el-autocomplete {
  margin-left: 12px;
  box-sizing: border-box;
}

.el-input--suffix {
  margin-right: 12px;
}

.sac {
  margin-left: 10px;
}

.el-input {
  width: 200px !important;
}
</style>