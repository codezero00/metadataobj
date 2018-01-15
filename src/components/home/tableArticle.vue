<template>
<div class="table1">
  <el-table
    :data="list"
    height="500"
    border
    style="width: 100%">
    <el-table-column
      prop="xh"
      label="序号"
      width="50"
      >
    </el-table-column>
    <el-table-column
      prop="sj"
      label="时间"
      >
    </el-table-column>
    <el-table-column
      label="标题">
      <template slot-scope="scope">
      <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.bt}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="zz"
      label="作者"
      >
    </el-table-column>
    <el-table-column
      prop="fl"
      label="分类"
      >
    </el-table-column>
    <el-table-column
      prop="sytp"
      label="首页图片"
      >
    </el-table-column>
    <el-table-column
      prop="ydsl"
      label="阅读数量"
      >
    </el-table-column>
    <el-table-column
      label="状态"
      width="90"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
    </el-table-column>
    <el-table-column
      label="操作"
      fixed="right"
      width="150"
      >
        <template slot-scope="scope">
          <el-button v-if="scope.row.status!='published'" size="small" type="success" @click="handleModifyStatus(scope.row,'published')">发布
          </el-button>
          <el-button v-if="scope.row.status!='draft'" size="small" @click="handleModifyStatus(scope.row,'draft')">草稿
          </el-button>
          <el-button v-if="scope.row.status!='deleted'" size="small" type="danger" @click="handleModifyStatus(scope.row,'deleted')">删除
          </el-button>
        </template>
    </el-table-column>
  </el-table>

  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
      :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>

</div>
</template>

<script>
const calendarTypeOptions = [
  { key: "CN", display_name: "中国" },
  { key: "US", display_name: "美国" },
  { key: "JP", display_name: "日本" },
  { key: "EU", display_name: "欧元区" }
];

const testlist = [
  {
    xh: "1",
    sj: "2017-01-01",
    bt: "哈哈哈哈哈哈",
    zz: "喵帕斯",
    fl: "宅男女神",
    sytp: "xxxxxxxx",
    ydsl: "12314",
    status: "published"
  },
  {
    xh: "2",
    sj: "2017-01-01",
    bt: "哈哈哈哈哈哈222",
    zz: "喵帕斯",
    fl: "明星",
    sytp: "xxxxxxx2",
    ydsl: "14214",
    status: "draft"
  },
  {
    xh: "2",
    sj: "2017-01-01",
    bt: "哈哈哈哈哈哈222",
    zz: "喵帕斯",
    fl: "明星",
    sytp: "xxxxxxx2",
    ydsl: "14214",
    status: "deleted"
  }
];

export default {
  data() {
    return {
      list: testlist,
      total: 300,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      temp: {
        id: undefined,
        importance: 0,
        remark: "",
        timestamp: 0,
        title: "",
        type: "",
        status: "published"
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [
        { label: "按ID升序列", key: "+id" },
        { label: "按ID降序", key: "-id" }
      ],
      statusOptions: ["published", "draft", "deleted"],
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "创建"
      },
      dialogPvVisible: false,
      pvData: [],
      showAuditor: false,
      tableKey: 0
    };
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    }
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    timeFilter(time) {
      if (!time[0]) {
        this.listQuery.start = undefined;
        this.listQuery.end = undefined;
        return;
      }
      this.listQuery.start = parseInt(+time[0] / 1000);
      this.listQuery.end = parseInt((+time[1] + 3600 * 1000 * 24) / 1000);
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作成功",
        type: "success"
      });
      row.status = status;
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
    },
    handleDelete(row) {
      this.$notify({
        title: "成功",
        message: "删除成功",
        type: "success",
        duration: 2000
      });
      const index = this.list.indexOf(row);
      this.list.splice(index, 1);
    },
    create() {
      this.temp.id = parseInt(Math.random() * 100) + 1024;
      this.temp.timestamp = +new Date();
      this.temp.author = "原创作者";
      this.list.unshift(this.temp);
      this.dialogFormVisible = false;
      this.$notify({
        title: "成功",
        message: "创建成功",
        type: "success",
        duration: 2000
      });
    },
    update() {
      this.temp.timestamp = +this.temp.timestamp;
      for (const v of this.list) {
        if (v.id === this.temp.id) {
          const index = this.list.indexOf(v);
          this.list.splice(index, 1, this.temp);
          break;
        }
      }
      this.dialogFormVisible = false;
      this.$notify({
        title: "成功",
        message: "更新成功",
        type: "success",
        duration: 2000
      });
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 0,
        remark: "",
        timestamp: 0,
        title: "",
        status: "published",
        type: ""
      };
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData;
        this.dialogPvVisible = true;
      });
    }
  }
};
</script>

<style scoped>
.table1 {
  /* float: left; */
  width: 100%;
}
.pagination-container{
  margin-top:15px;
}
.link-type, .link-type:focus {
    color: #337ab7;
    cursor: pointer;
}
.link-type:hover, .link-type:focus {
    color: #20a0ff;
}
</style>
