<template>
<el-row type="flex" class="row-bg">
  <el-col :span="6"><div class="grid-content left"> 
    
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>

      <el-tree
        class="filter-tree"
        :data="treedata"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        @node-click="nodeclick"
        ref="tree2">
      </el-tree>
    </div></el-col>

  <el-col :span="18">
    <div class="grid-content right">




    <!-- <el-button type="primary" style="float:left;margin:0 0 20px 0" size="" icon="el-icon-plus">添加</el-button>
    <el-button type="primary" style="float:left;margin:0 0 20px 5px;" size="" icon="el-icon-upload">导入</el-button>
    <el-button type="primary" style="float:left;margin:0 0 20px 5px;" size="" icon="el-icon-download">导出</el-button> -->
    <el-input placeholder="请输入要搜索的文件名称" v-model="ParamsPage.FileName" style="float:left;width:300px;margin:0 0 20px 0px;" size="">
    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
    <el-upload
      :on-success="uploadSuccess"
      :on-change="uploadChange"
      :file-list="fileList"
      style="float:left;margin:0 0 20px 5px"
      action="http://127.0.0.1:9000/api/v1/UploadFile">
      <el-tooltip class="item" effect="dark" content="只能上传jpg/png文件，且不超过500kb" placement="top">
        <el-button size="" type="primary" icon="el-icon-upload">上传文件</el-button>
      </el-tooltip>

    </el-upload>

    <el-table
      :data="tablelist"
      border
      height=680
      style="width: 100%">
      <el-table-column
        label="编号"
        width="250">
        <template slot-scope="scope">
          <el-button @click="filedetail(scope.row)" type="text" size="small">{{scope.row._id}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="filename"
        label="文件名称">
      </el-table-column>
      <el-table-column
        prop="format"
        label="格式类型"
        width="100"
        >
      </el-table-column>
      <el-table-column
        prop="uploadDate"
        label="上传时间">
      </el-table-column>
      <el-table-column
        prop="length"
        label="文件大小(M)"
        width="150">
      </el-table-column>
    </el-table>

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
  </el-col>
</el-row>
</template>

<script>

export default {
  data() {
    return {
      fileList:[],
      tablelist: [],
      filterText: "",
      treedata: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      ParamsPage: {
        FileName: '',
        CurrentPage: 1,
        PageSize: 10,
        TotalCount: 0
      },
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  mounted() {
    (async () => {
      const treelist = await this.$Data.NosqlBaseTree();
      this.treedata = treelist;
      // 默认加载
      this.nodeclick(this.treedata[0]);
    })();
  },
  methods: {
    async GetNosqlData(params) {
      const list = await this.$Data.NosqlQuery(params);
      this.tablelist = list.res;
      this.ParamsPage.CurrentPage = list.page.page_index;
      this.ParamsPage.TotalCount = list.page.item_count;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    nodeclick(data) {
      console.log(data)
      this.GetNosqlData(this.ParamsPage)
      // let list = await this.$Data.NosqlQuery(this.ParamsPage);
      // this.tablelist = list.res
      // this.ParamsPage.CurrentPage = list.page.page_index;
      // this.ParamsPage.TotalCount = list.page.item_count;
      // console.log(list)
    },
    filedetail(data){
      this.InitDiaglog(data);
      this.$store.dispatch("setDialogTitle", "文件详情");
      this.$store.dispatch("setDialogWidth", "80%");
      this.$store.dispatch("setDialogVisible", true);
    },
    InitDiaglog(data) {
      let imgsrc =
        "//127.0.0.1:9000/api/v1/GetImage?FileID=" +
        data._id;
      let xx = {
        propsData: {
          renderContent: (
            <el-form ref="form" label-width="80px">
              <el-form-item label="编号">{data._id}</el-form-item>
              <el-form-item label="文件名称">{data.filename}</el-form-item>
              <el-form-item label="格式类型">{data.format}</el-form-item>
              <el-form-item label="上传时间">{data.uploadDate}</el-form-item>
              <el-form-item label="文件大小">{data.length}M</el-form-item>
              <el-form-item label="图片">
                <img style="height:700px" src={imgsrc} />
              </el-form-item>

              <div class="formfooter">
                <el-button
                  nativeOnClick={() =>
                    this.$store.dispatch("setDialogVisible", false)
                  }
                >
                  取消
                </el-button>
              </div>
            </el-form>
          )
        }
      };
      this.$store.dispatch("setrender", xx.propsData.renderContent);
    },
    async search(){
      let list = await this.$Data.NosqlQuery(this.ParamsPage);
      this.tablelist = list.res
    },
    uploadSuccess(){
      this.GetNosqlData(this.ParamsPage);
    },
    uploadChange(file, fileList){
      this.fileList = fileList.slice(-1);  
    },
    HandleSizeChange(value) {
      this.ParamsPage.PageSize = value;
      this.GetNosqlData(this.ParamsPage);
    },
    HandleCurrentChange(value) {
      this.ParamsPage.CurrentPage = value;
      this.GetNosqlData(this.ParamsPage);
    },
  },


};
</script>

<style scoped>
.box-card {
  margin-bottom: 15px;
}
.el-row {
  margin-bottom: 20px;
  min-height: 500px;
}
.el-col {
  border-radius: 4px;
}
.fltag {
  /* margin-bottom: 20px;
  border-bottom: #d3dce6 solid 1px; */
}
.right {
  height: 840px;
  position: relative;
  margin-top: 20px;
  margin-right: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: #dadddf 14px 14px 20px;
}
</style>