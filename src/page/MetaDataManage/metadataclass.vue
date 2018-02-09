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
        node-key="id"
        :default-expanded-keys="['GH']"
        :filter-node-method="filterNode"
        @node-click="nodeclick"
        ref="tree2">
      </el-tree>
    </div></el-col>

  <el-col :span="18"><div class="grid-content right">
    
  <el-table
    :data="upmetadataclass"
    border
    style="width: 100%">
    <el-table-column
      prop="FLMC"
      label="分类名称"
      >
    </el-table-column>
    <el-table-column
      prop="FLBM"
      label="分类编码"
      >
    </el-table-column>
    <el-table-column
      prop="SFZYX"
      label="是否资源项">
    </el-table-column>
    <el-table-column
      prop="ZWQP"
      label="中文全拼">
    </el-table-column>
    <el-table-column
      prop="FZDW"
      label="负责单位">
    </el-table-column>
    <el-table-column
      prop="YYXT"
      label="应用系统">
    </el-table-column>
    <el-table-column
      prop="FLDY"
      label="分类定义">
    </el-table-column>
    <el-table-column
      prop="SJKB"
      label="数据库表">
    </el-table-column>
    <el-table-column
      prop="YSSJKB"
      label="数据库表（原始）"
      width="140">
    </el-table-column>
  </el-table>

  <div v-show="downmetadataclass.length!=0">
    <div class='fltag'>
      <h3>下级分类</h3>
    </div>
    <el-table
      :data="downmetadataclass"
      border
      style="width: 100%">
      <el-table-column
        prop="FLMC"
        label="分类名称"
        >
      </el-table-column>
      <el-table-column
        prop="FLBM"
        label="分类编码"
        >
      </el-table-column>
      <el-table-column
        prop="SFZYX"
        label="是否资源项">
      </el-table-column>
      <el-table-column
        prop="ZWQP"
        label="中文全拼">
      </el-table-column>
      <el-table-column
        prop="FZDW"
        label="负责单位">
      </el-table-column>
      <el-table-column
        prop="YYXT"
        label="应用系统">
      </el-table-column>
      <el-table-column
        prop="FLDY"
        label="分类定义">
      </el-table-column>
      <el-table-column
        prop="SJKB"
        label="数据库表">
      </el-table-column>
      <el-table-column
        prop="YSSJKB"
        label="数据库表（原始）"
        width="140">
      </el-table-column>
    </el-table>
  </div>

    </div></el-col>
</el-row>
</template>

<script>
export default {
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
      // console.log("nodeclick");
      // console.log(data);
      // console.log("end nodeclick");
      // let id = 'GH';
      // if(data){
      //   id = data.id
      // }
      const metaclass = await this.$Data.metaclass(data.id);
      this.upmetadataclass = metaclass.upclass;
      this.downmetadataclass = metaclass.downclass;
      // console.log(this.downmetadataclass.length);
    }
  },

  data() {
    return {
      upmetadataclass: [],
      downmetadataclass: [],
      filterText: "",
      treedata: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  mounted(){
    (async () => {
      const metaclasstree = await this.$Data.metaclasstree();
      this.treedata = metaclasstree;
      // 默认加载
      this.nodeclick(this.treedata[0]);
    })();
  }
};
</script>

<style scoped>
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

<style>
.filter-tree {
  font-size: 13px;
}
</style>
