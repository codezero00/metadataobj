<template>
  <el-dialog
  title="添加字段"
  :visible.sync="dialogVisible"
  width="70%"
  :before-close="handleClose">

    <el-row type="flex">
        <el-col :span="6">
            <div class="leftc">
            <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
            </el-input>

            <el-tree
            class="filter-treec"
            show-checkbox
            :data="treedata"
            :props="defaultProps"
            :filter-node-method="filterNode"
            ref="tree">
            </el-tree>
            </div>
        </el-col>
        <el-col :span="1" style="margin-left:5px;">
          <div style="margin-top:200px">
            <el-button @click="AddColumn" icon="el-icon-arrow-right" circle></el-button>
            <el-button @click="DelColumn" icon="el-icon-arrow-left" style="margin-left:0;margin-top:20px" circle></el-button>
          </div>
        </el-col>
        <el-col :span="17" style="margin-left:0px">
            <div class="rightc">
            <el-table :data="ColumnData" 
						border 
						stripe 
						height=500
						style="width: 100%">
                <el-table-column prop="columnname" label="字段名称"  align=center min-width="100">
                </el-table-column>
                <el-table-column prop="name" label="中文名"  align=center min-width="150">
                </el-table-column>
                <el-table-column label="字段类型"  align=center width="140">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.type" placeholder="请选择" :disabled="true">
                      <el-option label="VARCHAR" value="1"></el-option>
                      <el-option label="NUMBER" value=2></el-option>
                      <el-option label="DATE" value=3></el-option>
                      <el-option label="TEXT" value=4></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="len" label="字段长度"  align=center>
                  <!-- <template slot-scope="scope">
                    <el-input v-model="scope.row.len" placeholder="长度.."></el-input>
                  </template> -->
                </el-table-column>
                <el-table-column label="是否主键"  align=center width="50">
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.ispk"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column label="是否非空"  align=center width="50">
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.isnull"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column label="是否唯一"  align=center width="50">
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.isuq"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column label="值域"  align=center>
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.range" placeholder="值域.."></el-input>
                  </template>
                </el-table-column>
            </el-table>
            </div>
        </el-col>
    </el-row>


    <span slot="footer" class="dialog-footer">
        <el-button @click="Cancel">取 消</el-button>
        <el-button type="primary" @click="Save">确 定</el-button>
    </span>
</el-dialog>
</template>

<script>
export default {
  props: {
    inDialogVisible: {
      type: Boolean,
      default: false
    },
    inTabid:{
      type:String
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    inDialogVisible(val) {
      this.dialogVisible = val;
    }
  },
  data() {
    return {
      ColumnData: [],
      filterText: "",
      treedata: [],
      dialogVisible: false,
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  mounted(){
    this.GetMetaDataTree()
  },
  methods: {
    async GetMetaDataTree(){
      let res = await this.$Data.MetaDataTree()
      this.treedata = res
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          this.dialogVisible = false;
          this.$emit("getDialogVisible", false);
        })
        .catch(_ => {});
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    Cancel() {
      this.dialogVisible = false;
      this.$emit("getDialogVisible", false);
    },
    Save() {
      this.dialogVisible = false;
      this.$emit("getDialogVisible", false);
      if(this.ColumnData.length>0){
        this.ColumnData.forEach(async x=>{
          // addparams={}
          let res2 = await this.$Data.DBTableColumnInsOrUp(x)
          console.log(res2)
        })
      }
    },
    AddColumn(){
      console.log('ok')
      let addlist = new Array(this.$refs.tree.getCheckedNodes().filter(x=>{return x.isresource==1}))
      // this.treedata = new Array(this.treedata.map(x=>{return new Object(id=x.id,pid=x.pid,)}))
      this.$refs.tree.getCheckedNodes().filter(x=>{return x.isresource==1}).map(x=>x.disabled=true)
      // addlist.forEach(x=> {this.ColumnData.push({tabid:this.inTabid,name:x.label})})
      addlist[0].forEach(x=> this.ColumnData.push({tabid:this.inTabid,
                                                    metaid:x.id,
                                                    columnname:x.columnname,
                                                    name:x.label,
                                                    type:x.columntype,
                                                    len:x.columnlen,
                                                    ispk:0,
                                                    isnull:0,
                                                    isuq:0,
                                                    range:0
                                                    }))
      // console.log(this.ColumnData)
      // console.log("hhh")
      //       debugger;

      // const x1 = this.$refs.tree.getCheckedNodes().filter(x=>{return x.isresource==1})
      // console.log(x1)
      // // const y1 = new Array(x1.map(x=>console.log(x)))
      // // const y1 = new Array(x1.map(x=>{return {id:x.id,pid:x.pid,label:x.label,disabled:true}}))
      // console.log(y1)
    },
    DelColumn(){

    }
  }
};
</script>

<style scoped>
.leftc {
  height: 540px;
  margin: 0px 15px 0 0px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: #dadddf 5px 5px 20px;
}
.rightc {
  height: 540px;
  position: relative;
  margin-top: 0px;
  margin-right: 0px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: #dadddf 14px 14px 20px;
}
.filter-treec {
  margin-top: 10px;
  font-size: 13px;
  position: relative;
  overflow-y: auto;
  overflow-X: auto;
  height: 450px;
}
</style>
