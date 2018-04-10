<template>
<div class='tabledetail'>
    <el-table
      :data="currentList"
      border
      style="width: 100%">
      <el-table-column
        prop="ZDMC"
        label="字段名称"
        >
      </el-table-column>
      <el-table-column
        prop="ZWM"
        label="中文名"
        >
      </el-table-column>
      <el-table-column
      width="100"
        prop="ZDLX"
        label="字段类型">
      </el-table-column>
      <el-table-column
      width="100"
        prop="ZDDX"
        label="字段大小">
      </el-table-column>
      <el-table-column
      width="50"
        prop="ZJ"
        label="主键">
      </el-table-column>
      <el-table-column
      width="50"
        prop="FK"
        label="非空">
      </el-table-column>
      <el-table-column
      width="50"
        prop="WY"
        label="唯一">
      </el-table-column>
      <el-table-column
        width="90"
        prop="ZY"
        label="值域">
      </el-table-column>
    </el-table>
  
</div>
</template>

<script>
export default {
  props: {
    currentList:{
      required: true,
      type: Array
    }
  },
  // data() {
  //   return {
  //     // dbtablecolumnlist: this.currentList
  //   };
  // }
  // props: {
  //   selectid: {
  //     type: String
  //   },
  //   dbtablecolumnlist1:{
  //     type: Array
  //   }
  // },

  // data() {
  //   return {
  //     id:selectid,
  //     dbtablecolumnlist: []
  //   };
  // },
  // methods: {
  //   test(){
  //     console.log('test okkkkkkkkkk')
  //   },
  //   async nodeclick(data) {
  //     const columnlist = await this.$Data.dbtablecolumn(data);
  //     console.log('data~~')
  //     console.log(data)
  //     console.log(columnlist)
  //     this.dbtablecolumnlist = columnlist;
  //   }
  // },
  // mounted() {
  //   console.log('props~~~')
  //   console.log(selectid)
  // },
  // watch:{
  //   id(){
  //     this.nodeclick(this.id)
  //   }
  // }
};
</script>
