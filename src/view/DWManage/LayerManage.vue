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
            :data="DataLayerData.res"
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
              label="所属层名称"
              width="150"
              sortable
              align=center
              >
            </el-table-column>
            <el-table-column
              prop="shortname"
              label="简称"
              width="80"
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
      DataLayerData: [],
      ParamsPage:{
        CurrentPage: 1,
        PageSize: 10,
        TotalCount:0,
      },
      form: {
        dlid: null,
        name: "",
        shortname: "",
        effect: "",
        remark: "",
        status: "",
        createuserid: "",
        createtime: "",
        updateuserid: "",
        updatetime: "",
        isdel: 1
      },
      TmpSelectRows: [],
      UpButtionDisabled: true,
      DelButtionDisabled: true
    };
  },

  mounted() {
    this.GetDataLayer(this.ParamsPage);
  },

  methods:{
    async GetDataLayer(params){
      const DataLayer = await this.$Data.DataLayer(params); 
      this.DataLayerData = DataLayer;
      this.ParamsPage.CurrentPage = DataLayer.page.page_index
      this.ParamsPage.TotalCount = DataLayer.page.item_count
    },
    handleSizeChange(value){
      this.ParamsPage.PageSize=value;
      this.GetDataLayer(this.ParamsPage);
    },
    handleCurrentChange(value){
      this.ParamsPage.CurrentPage=value;
      this.GetDataLayer(this.ParamsPage);
    },
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
    //这里
    FormClear() {
      this.form.dlid = "";
      this.form.name = "";
      this.form.shortname = "";
      this.form.effect = "";
      this.form.remark = "";
      this.form.status = "";
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
              <el-form-item label="所属层名称">
                <el-input v-model={this.form.name} />
              </el-form-item>
              <el-form-item label="简称">
                <el-input v-model={this.form.shortname} />
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
    Ins() {
      this.FormClear();
      this.InitDiaglog();
      this.$store.dispatch("setDialogVisible", true);
    },
    Upd() {
      // Object.keys(this.TmpSelectRows[0]).forEach(key => {
      //   this.form[key] = this.TmpSelectRows[0][key];
      // });
      this.form.dlid = this.TmpSelectRows[0].dlid;
      this.form.name = this.TmpSelectRows[0].name;
      this.form.shortname = this.TmpSelectRows[0].shortname;
      this.form.effect = this.TmpSelectRows[0].effect;
      this.form.remark = this.TmpSelectRows[0].remark;
      this.form.status = this.TmpSelectRows[0].status;
      this.form.createuserid = this.TmpSelectRows[0].createuserid;
      this.form.updateuserid = this.TmpSelectRows[0].updateuserid;
      this.InitDiaglog();
      this.$store.dispatch("setDialogVisible", true);
    },
    async Save() {
      const res = await this.$Data.DataLayerInsOrUp(this.form); //这里
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
      this.GetDataLayer(this.ParamsPage); //这里
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
            const dlid = await this.TmpSelectRows[key].dlid; // 这里要改
            const delform = {
              dlid: dlid, // 这里要改
              isdel: 0
            };
            const res2 = await this.$Data.DataLayerInsOrUp(delform); //这里
            if (res2 === 1) {
              //这里
              this.$message({ message: "删除成功!", type: "success" });
            } else {
              this.$message.error("数据删除失败！");
            }
            this.GetDataLayer(this.ParamsPage); //这里
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