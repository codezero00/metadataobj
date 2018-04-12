<template>
<el-row type="flex" class="row-bg">
  <el-col :span="24">
    <div class="grid-content right">

      <div class="tab">
        <div class="tab_header">
          <el-button type="primary" @click="fbins" class="fb-btn" icon="el-icon-plus">添加</el-button>
          <el-button type="primary" @click="fbup"  class="fb-btn" icon="el-icon-edit">编辑</el-button>
          <el-button type="warning" @click="fbdel" class="fb-btn" icon="el-icon-delete">删除</el-button>
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
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
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
  name:'FrontDatabaseManage',
  data() {
    return {
      FrontBaseData: [],
      ParamsPage: {
        CurrentPage: 1,
        PageSize: 10,
        TotalCount: 0
      },
      form:{
        fbid:'',
        name:'2222',
        ip:'',
        usesoftware:'',
        location:'',
        dept:'',
        effect:'',
        remark:'',
        status:''
      }
    };
  },
  mounted() {
    this.GetFrontBase(this.ParamsPage);
    this.initdiaglog();
  },
  methods: {
    // test123(){
    //   let xx = {propsData: {renderContent: (<h1>99999999999999999999999999999999</h1>)}}
    //   console.log(xx.propsData.renderContent)
    //   this.$store.dispatch('setrender',xx.propsData.renderContent)
    // },
    initdiaglog(){
      this.$iouform({data: {},propsData: {}});
      let xx = {propsData: {renderContent: (
            <el-form ref="form" model={this.form} label-width="80px">
            <el-form-item label="名称">
                <el-input v-model={this.form.name}></el-input>
            </el-form-item>
            <el-form-item label="前置库IP">
                <el-input v-model={this.form.ip}></el-input>
            </el-form-item>
            <el-form-item label="使用软件">
                <el-input v-model={this.form.usesoftware}></el-input>
            </el-form-item>
            <el-form-item label="位置">
                <el-input v-model={this.form.location}></el-input>
            </el-form-item>
            <el-form-item label="所属部门">
                <el-input v-model={this.form.dept}></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <select v-model={this.form.status} placeholder="请选状态">
                <option label="可用" value="可用"/>
                <option label="不可用" value="不可用"/>
                </select>
            </el-form-item>
            <el-form-item label="作用">
                <el-input type="textarea" v-model={this.form.effect}></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" v-model={this.form.remark}></el-input>
            </el-form-item>
            <div class="formfooter">
                <el-button nativeOnClick={() => this.$store.dispatch('setDialogVisible',false)}>取消</el-button>
                <el-button type="primary" nativeOnClick={() => this.fbsave()}>保存</el-button>
            </div>
            </el-form>
      )}};
      this.$store.dispatch('setrender',xx.propsData.renderContent);
    },
    handleSizeChange(value) {
      this.ParamsPage.PageSize = value;
      this.GetFrontBase(this.ParamsPage);
    },
    handleCurrentChange(value) {
      this.ParamsPage.CurrentPage = value;
      this.GetFrontBase(this.ParamsPage);
    },
    async GetFrontBase(params) {
      const FrontBase = await this.$Data.FrontBase(params);
      this.FrontBaseData = FrontBase;
      this.ParamsPage.CurrentPage = FrontBase.page.page_index;
      this.ParamsPage.TotalCount = FrontBase.page.item_count;
    },
    fbins() {

      this.$store.dispatch('setDialogVisible',true)
    },
    fbup() {
      
      this.$store.dispatch('setDialogVisible',true)
    },
    fbsave(){

      this.$store.dispatch('setDialogVisible',false)
    },
    fbdel() {
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
.formfooter{
    margin-top: 10px;
    height: 80px;
    padding-top: 20px;
    margin: auto;
    width: 100%;
    text-align:center
}
</style>