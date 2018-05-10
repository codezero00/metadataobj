<template>
	<el-row type="flex" class="row-bg">
		<el-col :span="24">
			<div class="grid-content right">


				<div class="tab">
					<div class="tab_header">
            <el-button type="primary" @click="Ins" class="fb-btn" icon="el-icon-plus">添加</el-button>
            <el-button type="primary" @click="Upd" class="fb-btn" icon="el-icon-edit" :disabled='UpButtionDisabled'>编辑</el-button>
            <el-button type="warning" @click="Del" class="fb-btn" icon="el-icon-delete" :disabled='DelButtionDisabled'>删除</el-button>
            <el-button type="success" @click="" class="fb-btn" icon="el-icon-upload">导入</el-button>
            <el-button type="success" @click="" class="fb-btn" icon="el-icon-download">导出</el-button>
					</div>
					<div class="tab_main">
						<el-table :data="BloodRelationData.res" 
						border 
						stripe 
						height=450 
						style="width: 100%"
            @select='SelectRows'
            >
							<el-table-column type="selection" width="55" align=center>
							</el-table-column>
							<el-table-column prop="srctablename" label="源表名称" sortable align=center>
							</el-table-column>
							<el-table-column prop="srccolumnname" label="源字段名称" sortable align=center>
							</el-table-column>
							<el-table-column prop="dsttablename" label="目标表名称" sortable align=center>
							</el-table-column>
							<el-table-column prop="dstcolumnname" label="目标字段名称" sortable align=center>
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
import TreeSelect from "@riophae/vue-treeselect";

export default {
  data() {
    return {
      BloodRelationData: [],
      ParamsPage: {
        CurrentPage: 1,
        PageSize: 10,
        TotalCount: 0
      },

      form: {
        beid: null,
        srcid: "",
        dstid: "",
        relation: "数据来源",
        isdel: 1
      },
      TmpSelectRows: [],
      UpButtionDisabled: true,
      DelButtionDisabled: true,
      OptionsTree: []
    };
  },

  mounted() {
    this.GetBloodRelation(this.ParamsPage);
    this.GetTree();
  },
  methods: {
    // 获取表数据
    async GetBloodRelation(params) {
      const bloodrelation = await this.$Data.BloodRelation(params);
      this.BloodRelationData = bloodrelation;
      this.ParamsPage.CurrentPage = bloodrelation.page.page_index;
      this.ParamsPage.TotalCount = bloodrelation.page.item_count;
    },
    // 获取表树
    async GetTree(params) {
      const dbtabletree = await this.$Data.DBTableColumnTree();
      this.OptionsTree = dbtabletree;
    },

    handleSizeChange(value) {
      this.ParamsPage.PageSize = value;
      this.GetBloodRelation(this.ParamsPage); //这里
    },
    handleCurrentChange(value) {
      this.ParamsPage.CurrentPage = value;
      this.GetBloodRelation(this.ParamsPage); //这里
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
      this.form.beid = "";
      this.form.srcid = "";
      this.form.dstid = "";
      this.form.relation = "数据来源";
      this.form.isdel = 1;
    },
    //这里
    InitDiaglog() {
      //注意这里的slot
      let xx = {
        propsData: {
          renderContent: (
            <el-form ref="form" model={this.form} label-width="80px">
              <el-form-item label="源表">
                <slot>
                  <TreeSelect
                    options={this.OptionsTree}
                    disable-branch-nodes={true}
                    show-count={true}
                    searchable={true}
                    on-select={node => {
                      this.selectsrc(node);
                    }}
                    placeholder="请选择源表字段?"
                  />
                </slot>
              </el-form-item>
              <el-form-item label="目标表">
                <slot>
                  <TreeSelect
                    options={this.OptionsTree}
                    disable-branch-nodes={true}
                    show-count={true}
                    searchable={true}
                    on-select={node => {
                      this.selectdst(node);
                    }}
                    placeholder="请选择目标表字段?"
                  />
                </slot>
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
      this.$store.dispatch("setDialogTitle", "添加");
      this.$store.dispatch("setDialogWidth", "30%");
      this.$store.dispatch("setDialogVisible", true);
    },
    Upd() {
      this.form.beid = this.TmpSelectRows[0].beid;
      this.form.srcid = this.TmpSelectRows[0].srccolumnid;
      this.form.dstid = this.TmpSelectRows[0].dstcolumnid;

      this.InitDiaglog();
      this.$store.dispatch("setDialogTitle", "更新");
      this.$store.dispatch("setDialogWidth", "30%");
      this.$store.dispatch("setDialogVisible", true);
    },
    async Save() {
      // debugger;
      const res = await this.$Data.BloodRrlationInsOrUp(this.form); //这里
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
      this.GetBloodRelation(this.ParamsPage); //这里
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
            const beid = await this.TmpSelectRows[key].beid; // 这里要改
            const delform = {
              beid: beid, // 这里要改
              isdel: 0
            };
            const res2 = await this.$Data.BloodRrlationInsOrUp(delform); //这里
            if (res2 === 1) {
              //这里
              this.$message({ message: "删除成功!", type: "success" });
            } else {
              this.$message.error("数据删除失败！");
            }
            this.GetBloodRelation(this.ParamsPage); //这里
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: err //"已取消删除"
          });
        });
      this.FormClear();
    },
    selectsrc(node) {
      this.form.srcid = node.id;
    },
    selectdst(node) {
      this.form.dstid = node.id;
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