<template>
<div>
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
            :data="ResourceBaseData.res"
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
</div>
</template>

<script>
export default {
  data() {
    return {
      ResourceBaseData: [],
      ParamsPage: {
        CurrentPage: 1,
        PageSize: 10,
        TotalCount: 0
      },
      form: {
        rbid: null,
        name: "",
        datasourceunit: "",
        createunit: "",
        contact: "",
        tel: "",
        status: "",
        isdel: 1
      },
      TmpSelectRows: [],
      UpButtionDisabled: true,
      DelButtionDisabled: true
    };
  },

  mounted() {
    this.GetResourceBase(this.ParamsPage);
  },

  methods: {
    async GetResourceBase(params) {
      const ResourceBase = await this.$Data.ResourceBase(params);
      this.ResourceBaseData = ResourceBase;
      this.ParamsPage.CurrentPage = ResourceBase.page.page_index;
      this.ParamsPage.TotalCount = ResourceBase.page.item_count;
    },
    handleSizeChange(value) {
      this.ParamsPage.PageSize = value;
      this.GetResourceBase(this.ParamsPage);
    },
    handleCurrentChange(value) {
      this.ParamsPage.CurrentPage = value;
      this.GetResourceBase(this.ParamsPage);
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
      this.form.rbid = "";
      this.form.name = "";
      this.form.datasourceunit = "";
      this.form.createunit = "";
      this.form.contact = "";
      this.form.tel = "";
      this.form.status = "";
      this.form.isdel = 1;
    },
    //这里
    InitDiaglog() {
      let xx = {
        propsData: {
          renderContent: (
            <el-form ref="form" model={this.form} label-width="80px">
              <el-form-item label="项目名称">
                <el-input v-model={this.form.name} />
              </el-form-item>
              <el-form-item label="数据来源单位">
                <el-input v-model={this.form.datasourceunit} />
              </el-form-item>
              <el-form-item label="状态">
                <select v-model={this.form.status} placeholder="请选状态">
                  <option label="可用" value="可用" />
                  <option label="不可用" value="不可用" />
                </select>
              </el-form-item>
              <el-form-item label="承建单位">
                <el-input type="textarea" v-model={this.form.createunit} />
              </el-form-item>
              <el-form-item label="联系人">
                <el-input type="textarea" v-model={this.form.contact} />
              </el-form-item>
              <el-form-item label="联系方式">
                <el-input type="textarea" v-model={this.form.tel} />
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
      this.form.rbid = this.TmpSelectRows[0].rbid;
      this.form.name = this.TmpSelectRows[0].XMMC;
      this.form.datasourceunit = this.TmpSelectRows[0].SJLYDW;
      this.form.createunit = this.TmpSelectRows[0].CJDW;
      this.form.contact = this.TmpSelectRows[0].LXR;
      this.form.tel = this.TmpSelectRows[0].LXFS;
      this.form.status = this.TmpSelectRows[0].ZT;
      this.InitDiaglog();
      this.$store.dispatch("setDialogTitle", "更新");
      this.$store.dispatch("setDialogWidth", "30%");
      this.$store.dispatch("setDialogVisible", true);
    },
    async Save() {
      const res = await this.$Data.ResourceBaseInsOrUp(this.form); //这里
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
      this.GetResourceBase(this.ParamsPage); //这里
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
            const rbid = await this.TmpSelectRows[key].rbid; // 这里要改
            const delform = {
              rbid: rbid, // 这里要改
              isdel: 0
            };
            const res2 = await this.$Data.ResourceBaseInsOrUp(delform); //这里
            if (res2 === 1) {
              //这里
              this.$message({ message: "删除成功!", type: "success" });
            } else {
              this.$message.error("数据删除失败！");
            }
            this.GetResourceBase(this.ParamsPage); //这里
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