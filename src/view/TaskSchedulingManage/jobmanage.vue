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
            :data="etljobsdata"
            border
            stripe
            height=680
            style="width: 100%"
            >
            <el-table-column
              type="selection"
              width="55"
              align=center
              >
            </el-table-column>
    <!-- <el-table-column
      prop="jobnum"
      label="作业编号"
      sortable
      align=center
      >
    </el-table-column> -->
    <el-table-column
      label="作业编号"
      sortable
      align=center
      >
      <template slot-scope="scope">
        <el-button @click="jobdetail(scope.row)" type="text" size="small">{{scope.row.jobnum}}</el-button>
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="作业名称"
      sortable
      align=center
      >
    </el-table-column>
    <el-table-column
      prop="remark"
      label="作业描述"
      sortable
      align=center
      >
    </el-table-column>
    <el-table-column
      prop="clientname"
      label="子服务器"
      width="80"
      sortable
      align=center
      >
    </el-table-column>
    <el-table-column
      prop="url"
      label="URL"
      width="200"
      sortable
      align=center
      >
    </el-table-column>
    <el-table-column
      prop="createtime"
      label="创建时间"
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
          :type="scope.row.status === 'Running' ? 'success' : 'danger'"
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
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
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
      etljobsdata: [],
      EtlJobLogData: null,
      joblogparams: {
        Url: null,
        JobName: null
      }
    };
  },

  mounted() {
    this.getjobs();
  },
  methods: {
    async getjobs() {
      const etljobs = await this.$Data.etljobs();
      this.etljobsdata = etljobs;
    },
    async GetJobLog() {
      const etljoblog = await this.$Data.etljoblog(this.joblogparams);
      // this.EtlJobLogData = etljoblog;
      return etljoblog
    },
    async jobdetail(value) {
      console.log(value);
      this.joblogparams.Url=value.url;
      this.joblogparams.JobName=value.name;
      this.EtlJobLogData = await this.GetJobLog()
      this.InitDiaglog(value);
      this.$store.dispatch("setDialogTitle", "作业详情");
      this.$store.dispatch("setDialogWidth", "60%");
      this.$store.dispatch("setDialogVisible", true);
    },
    InitDiaglog(value) {
      let imgsrc =
        "//172.16.1.13:9000/api/v1/EtlJobImage?Url=" +
        value.url +
        "&Jobid=" +
        value.jobnum;
      let xx = {
        propsData: {
          renderContent: (
            <el-form ref="form" label-width="80px">
              <el-form-item label="作业名称">{value.name}</el-form-item>
              <el-form-item label="作业描述">{value.remark}</el-form-item>
              <el-form-item label="作业状态">
                <slot>
                  <el-tag
                    type={value.status === "Running" ? "success" : "danger"}
                    close-transition
                  >
                    {value.status}
                  </el-tag>
                </slot>
              </el-form-item>
              <el-form-item label="作业模型">
                <img src={imgsrc} />
              </el-form-item>
              <el-form-item label="运行日志">

                <el-input
                  type="textarea"
                  autosize="{ minRows: 2, maxRows: 4}"
                  disabled="true"
                  v-model={this.EtlJobLogData}>
                </el-input>
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
  height: 800px;
  margin: 0 15px 0 15px;
}
</style>