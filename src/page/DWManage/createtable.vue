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

  <div class='fltag'>
    <h3>{{dbtabletitle.label}}</h3>
  </div> 

  <div v-if = 'dbtabletitle.isresource != 1'>

    <el-table
      :data="dbtablelist"
      border
      style="width: 100%">
      <el-table-column
        prop="BZWMC"
        label="表中文名称"
        >
      </el-table-column>
      <el-table-column
        prop="SSZYK"
        label="所属资源库"
        >
      </el-table-column>
      <el-table-column
        prop="SJL"
        label="数据量">
      </el-table-column>
      <el-table-column
        prop="CJSJ"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="ZHXGSJ"
        label="修改时间">
      </el-table-column>
    </el-table>

  </div>
  <div v-else>

    <el-card class="box-card">
      <p>
        <span>所属资源库:  {{dbtablelist[0].SSZYK}}</span>
        <span style="margin-left:220px">表英文名称:  {{dbtablelist[0].BYWMC}}</span>
        <span style="margin-left:220px">表中文名称:  {{dbtablelist[0].BZWMC}}</span>
      </p>
      <p>
        <span>创建时间:{{dbtablelist[0].CJSJ}}</span>
        <span style="margin-left:190px">最后修改时间:  {{dbtablelist[0].ZHXGSJ}}</span>
      </p>
      <p>
        <span>描述:  {{dbtablelist[0].MS}}</span>
      </p>

    </el-card>

    <el-tabs type="border-card">
      <el-tab-pane label="表详情"><detail ref="detail" v-bind:current-list="dbtablecolumnlist"></detail></el-tab-pane>
      <el-tab-pane label="表数据">配置管理</el-tab-pane>
      <el-tab-pane label="数据交换">角色管理</el-tab-pane>
    </el-tabs>


  </div>

    </div>
  </el-col>
</el-row>
</template>

<script>
import detail from "./components/createtable/detail.vue";

export default {
  components: {
    detail
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    async nodeclick(data) {
      if (data.isresource == 0) {
        const dbtablelist = await this.$Data.dbtable();
        this.dbtablelist = dbtablelist;
      } else if (data.isresource == 1) {
        const dbtablelist = await this.$Data.dbtable(data.id);
        this.dbtablelist = dbtablelist;
        const columnlist = await this.$Data.dbtablecolumn(data.id);
        this.dbtablecolumnlist = columnlist;
        this.dbtabletitle = data;
      }
    }
  },

  data() {
    return {
      dbtablecolumnlist: [],
      dbtabletitle: [],
      dbtablelist: [],
      filterText: "",
      treedata: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },

  mounted() {
    (async () => {
      const dbtabletree = await this.$Data.dbtabletree();
      this.treedata = dbtabletree;
      // 默认加载
      this.nodeclick(this.treedata[0]);
    })();
  }
};
</script>

<style scoped>
.box-card {
  margin-bottom: 15px;
}
.el-row {
  margin-bottom: 20px;
  min-height: 800px;
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
}
.right {
  margin: 0 15px 0 0;
}
</style>