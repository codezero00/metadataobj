<template>
<el-row type="flex" class="row-bg">
  <el-col :span="24"><div class="grid-content right">


      <div class="tab">
        <div class="tab_header">
          <el-button type="primary" @click="Ins" class="fb-btn" icon="el-icon-plus">添加</el-button>
          <el-button type="primary" @click="Upd" class="fb-btn" icon="el-icon-edit" :disabled='UpButtionDisabled'>编辑</el-button>
          <el-button type="warning" @click="Del" class="fb-btn" icon="el-icon-delete" :disabled='DelButtionDisabled'>删除</el-button>
          <el-button type="success" class="fb-btn" icon="el-icon-upload">导入</el-button>
          <el-button type="success" class="fb-btn" icon="el-icon-download">导出</el-button>
        </div>
        <div class="tab_main">
          <el-table
            :data="etlclientsdata.res"
            border
            stripe
            height=680
            style="width: 100%"
            @select='SelectRows'
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
      },
      form: {
        etlid: null,
        name: "",
        ip: "",
        port: "",
        url: "",
        version: "",
        location: "",
        desc: "",
        createuserid: "",
        updateuserid: "",
        isdel: 1
      },
      TmpSelectRows: [],
      UpButtionDisabled: true,
      DelButtionDisabled: true
    };
  },

  mounted() {
    this.GetETLClients(this.ParamsPage);
  },
  methods: {
    async GetETLClients(params) {
      const etlclients = await this.$Data.etlclients(params);
      this.etlclientsdata = etlclients;
      this.ParamsPage.CurrentPage = etlclients.page.page_index;
      this.ParamsPage.TotalCount = etlclients.page.item_count;
    },
    handleSizeChange(value) {
      this.ParamsPage.PageSize = value;
      this.GetETLClients(this.ParamsPage);
    },
    handleCurrentChange(value) {
      this.ParamsPage.CurrentPage = value;
      this.GetETLClients(this.ParamsPage);
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
    FormClear() {
      this.form.etlid = "";
      this.form.name = "";
      this.form.ip = "";
      this.form.port = "";
      this.form.url = "";
      this.form.version = "";
      this.form.location = "";
      this.form.desc = "";
      this.form.createuserid = "";
      this.form.updateuserid = "";
      this.form.isdel = 1;
    },
    InitDiaglog() {
      let xx = {
        propsData: {
          renderContent: (
            <el-form
              ref="form"
              model={this.form}
              rules={this.rules}
              label-width="80px"
            >
              <el-form-item label="名称">
                <el-input v-model={this.form.name} />
              </el-form-item>
              <el-form-item label="IP地址">
                <el-input v-model={this.form.ip} />
              </el-form-item>
              <el-form-item label="使用端口">
                <el-input v-model={this.form.port} />
              </el-form-item>
              <el-form-item label="URL">
                <el-input v-model={this.form.url} />
              </el-form-item>
              <el-form-item label="版本">
                <el-input v-model={this.form.version} />
              </el-form-item>
              <el-form-item label="位置">
                <el-input v-model={this.form.location} />
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model={this.form.desc} />
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
      // Object.keys(this.TmpSelectRows[0]).forEach(key => {
      //   this.form[key] = this.TmpSelectRows[0][key];
      // });
      debugger;
      this.form.etlid = this.TmpSelectRows[0].ID;
      this.form.name = this.TmpSelectRows[0].KHDMC;
      this.form.ip = this.TmpSelectRows[0].IPDZ;
      this.form.port = this.TmpSelectRows[0].SYDK;
      this.form.url = this.TmpSelectRows[0].URL;
      this.form.version = this.TmpSelectRows[0].BB;
      this.form.location = this.TmpSelectRows[0].WZ;
      this.form.desc = this.TmpSelectRows[0].MS;
      this.InitDiaglog();
      this.$store.dispatch("setDialogTitle", "更新");
      this.$store.dispatch("setDialogWidth", "30%");
      this.$store.dispatch("setDialogVisible", true);
    },
    async Save() {
      let Res = await this.$Data.ETLClientsInsOrUp(this.form);
      if (Res === 1) {
        this.$message({
          message: "数据添加成功！",
          type: "success"
        });
        this.FormClear();
      } else {
        this.$message.error("数据添加失败！");
      }
      this.$store.dispatch("setDialogVisible", false);
      this.GetETLClients(this.ParamsPage);
    },
    Del() {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Object.keys(this.TmpSelectRows).forEach(async key => {
            const etlid = await this.TmpSelectRows[key].ID;
            const delform = {
              etlid: etlid,
              isdel: 0
            };
            const ResFrontBaseIns = await this.$Data.ETLClientsInsOrUp(delform);
            if (ResFrontBaseIns === 1) {
              this.$message({ message: "删除成功!", type: "success" });
            } else {
              this.$message.error("数据删除失败！");
            }
            this.GetETLClients(this.ParamsPage);
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
.btn_fro {
  margin-left: 10px;
}
.btn_beh {
  margin-left: 5px;
}
</style>