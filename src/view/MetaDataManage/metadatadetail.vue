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
        :expand-on-click-node="false"
        ref="tree2">
      </el-tree>
    </div>
  </el-col>

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

  <div v-if = "metadatadetail.length!=0">
      <div class='fltag'>
          <h3 style="float:left;">资源属性</h3>

          <el-button type="primary" style="float:left;margin:12px 0 0 20px" size="small" icon="el-icon-plus">添加</el-button>
          <el-button type="primary" style="float:left;margin:12px 0 0 5px;" size="small" icon="el-icon-upload">导入</el-button>
          <el-button type="primary" style="float:left;margin:12px 0 0 5px;" size="small" icon="el-icon-download">导出</el-button>
          <el-input placeholder="请输入搜索内容" v-model="input3" style="float:left;width:200px;margin:12px 0 0 5px;" size="small">
          <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>

      </div>
      <el-table
        :data="metadatadetail"
        border
        fit
        style="width: 100%;">
        <el-table-column
          label="操作"
          min-width="60">
          <template slot-scope="scope">

            <el-button @click="handleClick(scope.row)" type="text" size="small">
              <svg-icon icon-class="update" />
            </el-button>

            <el-button style="margin-left:0px;" type="text" size="small">
              <svg-icon icon-class="del" />
            </el-button>

          </template>
        </el-table-column>

        <el-table-column
          prop="ZYSXBH"
          label="资源属性编号"
          min-width="130"
          >
        </el-table-column>
        <el-table-column
          prop="BZBM"
          label="标准编码"
          min-width="100"
          >
        </el-table-column>
        <el-table-column
          prop="ZDMC"
          label="字段名称"
          min-width="100"
          >
        </el-table-column>
        <el-table-column
          prop="YSZDMC"
          label="原始字段名称"
          min-width="180"
          >
        </el-table-column>
        <el-table-column
          prop="ZYSXZWMC"
          label="资源属性中文名称"
          min-width="160"
          >
        </el-table-column>
        <el-table-column
          prop="ZYSXZWQP"
          label="资源属性中文全拼"
          min-width="240"
          >
        </el-table-column>
        <el-table-column
          prop="CD"
          label="长度"
          min-width="60"
          >
        </el-table-column>
        <el-table-column
          prop="LX"
          label="类型"
          min-width="60"
          >
        </el-table-column>
        <el-table-column
          prop="ZYSXDY"
          label="资源属性定义"
          min-width="140"
          >
        </el-table-column>
        <el-table-column
          prop="BZ"
          label="备注"
          min-width="100">
        </el-table-column>
      </el-table>
  </div>
  <div v-else>
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
  </div>

  </div>
  </el-col>
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
      const metaclass = await this.$Data.metaclass(data.id);
      this.upmetadataclass = metaclass.upclass;
      this.downmetadataclass = metaclass.downclass;
      if(Number(data.isresource)===1){
        const metadata = await this.$Data.metadatadetail(data.id);  
        console.log('METADATA') 
        console.log(metadata)
        this.metadatadetail = metadata   
      }
      else {
        this.metadatadetail = ''
      }
    }
  },

  data() {
    return {
      upmetadataclass: [],
      downmetadataclass: [],
      metadatadetail: [],
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
      const metaclasstree = await this.$Data.metaclasstree();
      this.treedata = metaclasstree;
      // 默认加载
      this.nodeclick(this.treedata[0]);
    })();
  }
};
</script>

<style scoped>
.row-bg{
  height: 100%;
  position: relative;
}
.el-row {
  margin-bottom: 20px;
  min-height: 500px;
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
  /* float: left; */
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
