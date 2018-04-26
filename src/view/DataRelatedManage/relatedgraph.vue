<template>
<el-row type="flex" class="row-bg">
  <el-col :span="6">
    <div class="grid-content left1">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="选择表">
          <TreeSelect
          :options="this.OptionsTree"
          :disable-branch-nodes="true"
          :show-count="true"
          :searchable="true"
          :on-select="this.selectsrc"
          placeholder="请选择需要分析的表?"
          />
        </el-form-item>
        <!-- <el-form-item label="分析范围">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="分析深度">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="level 1" value="1"></el-option>
            <el-option label="level 2" value="2"></el-option>
            <el-option label="level 3" value="3"></el-option>
            <el-option label="level 4" value="4"></el-option>
            <el-option label="level 5" value="5"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">开始分析</el-button>

        </el-form-item>
      </el-form>
    </div>
  </el-col>
  <el-col :span="18">
    <div class="grid-content right1">
      <el-tabs :tab-position="this.tabPosition" style="margin-left:-20px;height:100%;width:100%">
        <el-tab-pane label="圆形图"><BloodGraphCircular></BloodGraphCircular></el-tab-pane>
        <el-tab-pane label="网状图"><BloodGraph></BloodGraph></el-tab-pane>
      </el-tabs>
            <!-- <BloodGraph ></BloodGraph> -->
            <!-- <BloodGraphCircular></BloodGraphCircular> -->

    </div>
  </el-col>
</el-row>
</template>


<script>
import BloodGraph from "./components/relatedgraph/bloodgraph.vue";
import BloodGraphCircular from "./components/relatedgraph/bloodgraph_circular.vue";
import TreeSelect from "@riophae/vue-treeselect";
export default {
  name: "test123",
  components: { BloodGraph, TreeSelect, BloodGraphCircular },
  data() {
    return {
      tabPosition: "left",
      OptionsTree: [],
      form: {}
      // GraphData:null
    };
  },
  mounted() {
    this.GetTree();
  },
  methods: {
    // 获取表树
    async GetTree(params) {
      const dbtabletree = await this.$Data.DBTableColumnTree();
      this.OptionsTree = dbtabletree;
    }
  }
};
</script>


<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
/* .bg-purple-dark {
    background: #99a9bf;
  } */
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background-color: white;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.right1 {
  height: 840px;
  position: relative;
  margin-top: 20px;
  margin-right: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: #dadddf 14px 14px 20px;
}
.left1 {
  height: 840px;
  margin: 20px 15px 0 15px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: #dadddf 5px 5px 20px;
}
</style>