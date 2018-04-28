<template>
	<el-row type="flex" class="row-bg">
		<el-col :span="24">
			<div class="grid-content right">
				<!-- <div class="search">
					<el-input placeholder="请输入内容" suffix-icon="el-icon-search" ></el-input>
					<el-input placeholder="请输入内容" suffix-icon="el-icon-search" ></el-input>
					<el-input placeholder="请输入内容" suffix-icon="el-icon-search" ></el-input>
					<el-input placeholder="请输入内容" suffix-icon="el-icon-search" ></el-input>
					<el-input placeholder="请输入内容" suffix-icon="el-icon-search" ></el-input>
					<el-input placeholder="请输入内容" suffix-icon="el-icon-search" ></el-input>
					<el-button type="primary" icon="el-icon-search" class="sac">搜索</el-button>
					<el-button type="text">高级搜索</el-button>
				</div> -->

				<div class="tab">
					<div class="tab_header">
          <el-button type="primary" @click="Ins" class="fb-btn" icon="el-icon-plus">添加</el-button>
          <el-button type="primary" @click="Upd" class="fb-btn" icon="el-icon-edit" :disabled='UpButtionDisabled'>编辑</el-button>
          <el-button type="warning" @click="Del" class="fb-btn" icon="el-icon-delete" :disabled='DelButtionDisabled'>删除</el-button>
          <!-- <el-button type="success" class="fb-btn" icon="el-icon-upload">导入</el-button>
          <el-button type="success" class="fb-btn" icon="el-icon-download">导出</el-button> -->
					</div>
					<div class="tab_main">
						<el-table :data="DBTableData.res" 
						border 
						stripe 
						height=680
						style="width: 100%"
            @select='SelectRows'
            >
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
      },
      ParamsPageAll: {
        CurrentPage: 1,
        PageSize: 100,
        TotalCount: 0
      },
      form: {
        tabid: null,
        rbid: "",
        dlid: "",
        tablenameyw: "",
        tablenamezw: "",
        remark: "",
        createuserid: "",
        createtime: "",
        updateuserid: "",
        updatetime: "",
        isdel: 1
      },
      TmpSelectRows: [],
      UpButtionDisabled: true,
      DelButtionDisabled: true,
      OptionsRs:[],
      OptionsLy:[],

    };
  },

  mounted() {
    // (async () => {
    //   const dbtable = await this.$Data.dbtable();
    //   this.DBTableData = dbtable;
    // })();
    this.GetTable(this.ParamsPage);
    this.GetResourceBase(this.ParamsPageAll);
    this.GetDataLayer(this.ParamsPageAll);
  },
  methods: {
    // 获取表数据
    async GetTable(params) {
      const DataTable = await this.$Data.GetTable(params);
      this.DBTableData = DataTable;
      this.ParamsPage.CurrentPage = DataTable.page.page_index;
      this.ParamsPage.TotalCount = DataTable.page.item_count;
    },
    // 获取资源库数据
    async GetResourceBase(params) {
      const ResourceBase = await this.$Data.ResourceBase(params);
      this.OptionsRs = ResourceBase.res;
    },
    // 获取所属层级数据信息
    async GetDataLayer(params){
      const DataLayer = await this.$Data.DataLayer(params); 
      this.OptionsLy = DataLayer.res;
    },

	  handleSizeChange(value){
      this.ParamsPage.PageSize=value;
      this.GetTable(this.ParamsPage);
    },
    handleCurrentChange(value){
      this.ParamsPage.CurrentPage=value;
      this.GetTable(this.ParamsPage);
    },

    SelectRows(selection, row) {
      this.TmpSelectRows = selection;
      if (this.TmpSelectRows.length === 1) {
        this.UpButtionDisabled = false;
      } else {
        this.UpButtionDisabled = true;
      }
      if (this.TmpSelectRows.length > 0) {
        this.DelButtionDisabled = false;
      } else {
        this.DelButtionDisabled = true;
      }
    },
    //这里
    FormClear() {
      this.form.tabid = "";
      this.form.rbid = "";
      this.form.dlid = "";
      this.form.tablenameyw = "";
      this.form.tablenamezw = "";
      this.form.remark = "";
      this.form.createuserid = "";
      this.form.updateuserid = "";
      this.form.isdel = 1;
    },
    //这里
    InitDiaglog() {
      let xx = {
        propsData: {
          renderContent: (
            <el-form ref="form" model={this.form} label-width="80px">
              <el-form-item label="所属资源库">
                <select v-model={this.form.rbid} placeholder="请选择">
                  { this.OptionsRs.map(items => { return (
                    <option
                      label={items.XMMC}
                      value={items.rbid}>
                    </option>
                  )} ) }
                </select>
              </el-form-item>
              <el-form-item label="所属层级">
                <select v-model={this.form.dlid} placeholder="请选择">
                  { this.OptionsLy.map(items => { return (
                    <option
                      label={items.name}
                      value={items.dlid}>
                    </option>
                  )} ) }
                </select>
              </el-form-item>
              <el-form-item label="表英文名称">
                <el-input v-model={this.form.tablenameyw} />
              </el-form-item>
              <el-form-item label="表中文名称">
                <el-input v-model={this.form.tablenamezw} />
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model={this.form.remark} />
              </el-form-item>
              <div class="formfooter">
                <el-button
                  nativeOnClick={() =>
                    this.$store.dispatch("setDialogVisible", false)
                  }
                >
                  取消
                </el-button>
                <el-button type="primary" nativeOnClick={() => this.Save()}>
                  保存
                </el-button>
              </div>
            </el-form>
          )
        }
      };
      this.$store.dispatch("setrender", xx.propsData.renderContent);
    },
    Ins() {
      this.FormClear();
      this.InitDiaglog();
      this.$store.dispatch("setDialogTitle", "插入");
      this.$store.dispatch("setDialogWidth", "30%");
      this.$store.dispatch("setDialogVisible", true);
    },
    Upd() {
      this.form.tabid = this.TmpSelectRows[0].tabid;
      this.form.rbid = this.TmpSelectRows[0].rbid;
      this.form.dlid = this.TmpSelectRows[0].dlid;
      this.form.tablenameyw = this.TmpSelectRows[0].tablenameyw;
      this.form.tablenamezw = this.TmpSelectRows[0].tablenamezw;
      this.form.remark = this.TmpSelectRows[0].remark;

      this.InitDiaglog();
      this.$store.dispatch("setDialogTitle", "更新");
      this.$store.dispatch("setDialogWidth", "30%");
      this.$store.dispatch("setDialogVisible", true);
    },
    async Save() {
      const res = await this.$Data.DBTableInsOrUp(this.form); //这里
      if (res === 1) {
        //这里
        this.$message({
          message: "数据添加成功！",
          type: "success"
        });
      } else {
        this.$message.error("数据添加失败！");
      }
      this.$store.dispatch("setDialogVisible", false);
      this.GetTable(this.ParamsPage); //这里
      this.FormClear();
    },
    Del() {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Object.keys(this.TmpSelectRows).forEach(async key => {
            const tabid = await this.TmpSelectRows[key].tabid; // 这里要改
            const delform = {
              tabid: tabid, // 这里要改
              isdel: 0
            };
            const res2 = await this.$Data.DBTableInsOrUp(delform); //这里
            if (res2 === 1) {
              //这里
              this.$message({ message: "删除成功!", type: "success" });
            } else {
              this.$message.error("数据删除失败！");
            }
            this.GetTable(this.ParamsPage); //这里
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: err //"已取消删除"
          });
        });
      this.FormClear();
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
  min-height: 500px;
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