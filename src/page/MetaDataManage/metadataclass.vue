<template>
<el-row type="flex" class="row-bg">
  <el-col :span="4"><div class="grid-content left"> 
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>

      <el-tree
        class="filter-tree"
        :data="data2"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree2">
      </el-tree>
    </div></el-col>

  <el-col :span="20"><div class="grid-content right">
    
  <el-table
    :data="upmetadataclass"
    border
    style="width: 100%">
    <el-table-column
      prop="ZYSXBH"
      label="分类名称"
      >
    </el-table-column>
    <el-table-column
      prop="BZBM"
      label="分类编码"
      >
    </el-table-column>
    <el-table-column
      prop="ZDMC"
      label="是否资源项">
    </el-table-column>
    <el-table-column
      prop="YSZDMC"
      label="中文全拼">
    </el-table-column>
    <el-table-column
      prop="ZYSXZWMC"
      label="负责单位">
    </el-table-column>
    <el-table-column
      prop="ZYSXZWQP"
      label="应用系统">
    </el-table-column>
    <el-table-column
      prop="CD"
      label="分类定义">
    </el-table-column>
    <el-table-column
      prop="LX"
      label="数据库表">
    </el-table-column>
    <el-table-column
      prop="ZYSXDY"
      label="数据库表（原始）"
      width="140">
    </el-table-column>
    <!-- <el-table-column
      fixed="left"
      label="操作"
      width="90">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column> -->
  </el-table>
  <div class='fltag'>
    <h3>下级分类</h3>
  </div>
  <el-table
    :data="downmetadataclass"
    border
    style="width: 100%">
    <el-table-column
      prop="ZYSXBH"
      label="分类名称"
      >
    </el-table-column>
    <el-table-column
      prop="BZBM"
      label="分类编码"
      >
    </el-table-column>
    <el-table-column
      prop="ZDMC"
      label="是否资源项">
    </el-table-column>
    <el-table-column
      prop="YSZDMC"
      label="中文全拼">
    </el-table-column>
    <el-table-column
      prop="ZYSXZWMC"
      label="负责单位">
    </el-table-column>
    <el-table-column
      prop="ZYSXZWQP"
      label="应用系统">
    </el-table-column>
    <el-table-column
      prop="CD"
      label="分类定义">
    </el-table-column>
    <el-table-column
      prop="LX"
      label="数据库表">
    </el-table-column>
    <el-table-column
      prop="ZYSXDY"
      label="数据库表（原始）"
      width="140">
    </el-table-column>
  </el-table>

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
      }
    },

    data() {
      return {
        filterText: '',
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
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
.fltag{
  margin-bottom: 20px;
  border-bottom: #d3dce6 solid 1px;
}
.right {
  margin: 0 15px 0 0;
}
/* .bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
} */
</style>