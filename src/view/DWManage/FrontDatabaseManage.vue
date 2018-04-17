<template>
<el-row type="flex" class="row-bg">
  <el-col :span="24">
    <div class="grid-content right">

      <div class="tab">
        <div class="tab_header">
          <el-button type="primary" @click="Ins" class="fb-btn" icon="el-icon-plus">添加</el-button>
          <el-button type="primary" @click="Upd"  class="fb-btn" icon="el-icon-edit" :disabled='UpButtionDisabled'>编辑</el-button>
          <el-button type="warning" @click="Del" class="fb-btn" icon="el-icon-delete" :disabled='DelButtionDisabled'>删除</el-button>
          <el-button type="success" class="fb-btn" icon="el-icon-upload">导入</el-button>
          <el-button type="success" class="fb-btn" icon="el-icon-download">导出</el-button>
        </div>
        <div class="tab_main">
          <el-table
            :data="FrontBaseData.res"
            border
            stripe
            height=450
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
              prop="name"
              label="名称"
              sortable
              align=center
              >
            </el-table-column>
            <el-table-column
              prop="ip"
              label="IP"
              sortable
              align=center
              >
            </el-table-column>
            <el-table-column
              prop="usesoftware"
              label="使用软件"
              sortable
              align=center
              >
            </el-table-column>
            <el-table-column
              prop="location"
              label="位置"
              sortable
              align=center
              >
            </el-table-column>
            <el-table-column
              prop="dept"
              label="所属部门"
              sortable
              align=center
              >
            </el-table-column>
            <el-table-column
              prop="effect"
              label="作用"
              sortable
              align=center
              >
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注"
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
                  :type="scope.row.status === '可用' ? 'success' : 'danger'"
                  close-transition>{{scope.row.status}}</el-tag>
              </template>
            </el-table-column>  
          </el-table>
        </div>
        <div class="tab_footer">
          <el-pagination
            background
            @size-change="HandleSizeChange"
            @current-change="HandleCurrentChange"
            :current-page="ParamsPage.currentPage"
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
  name: "FrontDatabaseManage",
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkName");
        }
        callback();
      }
    };
    return {
      FrontBaseData: [],
      ParamsPage: {
        CurrentPage: 1,
        PageSize: 10,
        TotalCount: 0
      },
      form: {
        fbid: null,
        name: "",
        ip: "",
        usesoftware: "",
        location: "",
        dept: "",
        effect: "",
        remark: "",
        status: "",
        createuserid: "",
        updateuserid: "",
        isdel: 1
      },
      rules: {
        checkName: [{ validator: validateName, trigger: "blur" }]
      },
      TmpSelectRows: [],
      UpButtionDisabled: true,
      DelButtionDisabled: true
    };
  },
  mounted() {
    this.GetFrontBase(this.ParamsPage);
  },
  methods: {
    // test123(){
    //   let xx = {propsData: {renderContent: (<h1>99999999999999999999999999999999</h1>)}}
    //   console.log(xx.propsData.renderContent)
    //   this.$store.dispatch('setrender',xx.propsData.renderContent)
    // },
    SelectRows(selection, row) {
      this.TmpSelectRows = selection;
      if (this.TmpSelectRows.length === 1) {
        // this.$refs.UpButton.disabled=false;
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
      this.form.fbid = "";
      this.form.name = "";
      this.form.ip = "";
      this.form.usesoftware = "";
      this.form.location = "";
      this.form.dept = "";
      this.form.effect = "";
      this.form.remark = "";
      this.form.status = "可用";
      this.form.createuserid = "";
      this.form.updateuserid = "";
      this.form.isdel = 1;
    },
    InitDiaglog() {
      // this.$iouform({ data: {}, propsData: {} });
      let xx = {
        propsData: {
          renderContent: (
            <el-form
              ref="form"
              model={this.form}
              rules={this.rules}
              label-width="80px"
            >
              <el-form-item label="名称" prop="checkName">
                <el-input v-model={this.form.name} />
              </el-form-item>
              <el-form-item label="前置库IP">
                <el-input v-model={this.form.ip} />
              </el-form-item>
              <el-form-item label="使用软件">
                <el-input v-model={this.form.usesoftware} />
              </el-form-item>
              <el-form-item label="位置">
                <el-input v-model={this.form.location} />
              </el-form-item>
              <el-form-item label="所属部门">
                <el-input v-model={this.form.dept} />
              </el-form-item>
              <el-form-item label="状态">
                <select v-model={this.form.status} placeholder="请选状态">
                  <option label="可用" value="可用" />
                  <option label="不可用" value="不可用" />
                </select>
              </el-form-item>
              <el-form-item label="作用">
                <el-input type="textarea" v-model={this.form.effect} />
              </el-form-item>
              <el-form-item label="备注">
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
    HandleSizeChange(value) {
      this.ParamsPage.PageSize = value;
      this.GetFrontBase(this.ParamsPage);
    },
    HandleCurrentChange(value) {
      this.ParamsPage.CurrentPage = value;
      this.GetFrontBase(this.ParamsPage);
    },
    async GetFrontBase(params) {
      const FrontBase = await this.$Data.FrontBase(params);
      this.FrontBaseData = FrontBase;
      this.ParamsPage.CurrentPage = FrontBase.page.page_index;
      this.ParamsPage.TotalCount = FrontBase.page.item_count;
    },
    Ins() {
      this.FormClear();
      this.InitDiaglog();
      this.$store.dispatch("setDialogVisible", true);
    },
    Upd() {
      Object.keys(this.TmpSelectRows[0]).forEach(key => {
        this.form[key] = this.TmpSelectRows[0][key];
      });
      this.InitDiaglog();
      this.$store.dispatch("setDialogVisible", true);
    },
    async Save() {
      const ResFrontBaseIns = await this.$Data.FrontBaseInsOrUp(this.form);
      if (ResFrontBaseIns === 1) {
        this.$message({
          message: "数据添加成功！",
          type: "success"
        });
        this.FormClear();
      } else {
        this.$message.error("数据添加失败！");
      }
      this.$store.dispatch("setDialogVisible", false);
      this.GetFrontBase(this.ParamsPage);
    },
    Del() {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log("begin TmpSelectRows");
          // console.log(this.TmpSelectRows);
          Object.keys(this.TmpSelectRows).forEach(async key => {
            const fbid = await this.TmpSelectRows[key].fbid;
            // this.form.isdel = 0;
            const delform = {
              fbid: fbid,
              isdel: 0
            };
            // // debugger;
            // console.log(delform);
            const ResFrontBaseIns = await this.$Data.FrontBaseInsOrUp(delform);
            if (ResFrontBaseIns === 1) {
              this.$message({ message: "删除成功!", type: "success" });
            } else {
              this.$message.error("数据删除失败！");
            }
            this.GetFrontBase(this.ParamsPage);
            // console.log("end TmpSelectRows");
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
  padding: 10px 0;
}
.el-col {
  border-radius: 4px;
}
.left {
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
.formfooter {
  margin-top: 10px;
  height: 80px;
  padding-top: 20px;
  margin: auto;
  width: 100%;
  text-align: center;
}
</style>