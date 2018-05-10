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
        :highlight-current = "true"
        node-key="id"
        :default-expanded-keys="['2f8daa54-4927-11e8-aa05-000c2958c75b']"
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

  <div v-if = "ResourceStatus!= false">
      <div class='fltag'>
          <h3 style="float:left;">资源属性</h3>

          <el-dialog
            title="添加资源属性"
            :visible.sync="dialogVisible"
            width="35%"
            :before-close="handleClose">
            <div class="formcontent">
              <el-form
                ref="form"
                :rules="{}"
                label-width="100px"
              >
                <el-form-item label="资源属性编号" prop="checkName">
                  <el-input v-model="this.form.resourceno" />
                </el-form-item>
                <el-form-item label="标准编码">
                  <el-input v-model="this.form.standardno" />
                </el-form-item>
                <el-form-item label="字段名称">
                  <el-input v-model="this.form.columnname" />
                </el-form-item>
                <el-form-item label="原始字段名称">
                  <el-input v-model="this.form.oldcolumnname" />
                </el-form-item>
                <el-form-item label="资源属性中文名称">
                  <el-input v-model="this.form.metaname" />
                </el-form-item>
                <el-form-item label="资源属性中文全拼">
                  <el-input v-model="this.form.metapy" />
                </el-form-item>
                <el-form-item label="类型">
                  <el-select v-model="form.columntype" placeholder="请选择字段类型">
                    <el-option label="VARCHAR" value="VARCHAR"></el-option>
                    <el-option label="NUMBER" value="NUMBER"></el-option>
                    <el-option label="TEXT" value="TEXT"></el-option>
                    <el-option label="DATE" value="DATE"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="长度">
                  <el-input v-model="this.form.columnlen" /> 
                </el-form-item>
                <el-form-item label="资源属性定义">
                  <el-input type="textarea" v-model="this.form.metadefine" />
                </el-form-item>
                <el-form-item label="备注">
                  <el-input type="textarea" v-model="this.form.remark" />
                </el-form-item>
                <div class="formfooter">
                  <el-button @click="dialogVisible = false">
                    取消
                  </el-button>
                  <el-button type="primary" @click="Save()">
                    保存
                  </el-button>
                </div>
              </el-form>
            </div>
          </el-dialog>

          <el-button type="primary" style="float:left;margin:12px 0 0 20px" size="small" icon="el-icon-plus" @click="Ins">添加</el-button>
          <!-- <el-button type="primary" style="float:left;margin:12px 0 0 5px;" size="small" icon="el-icon-upload">导入</el-button>
          <el-button type="primary" style="float:left;margin:12px 0 0 5px;" size="small" icon="el-icon-download">导出</el-button> -->
          <!-- <el-input placeholder="请输入搜索内容" v-model="input3" style="float:left;width:200px;margin:12px 0 0 5px;" size="small">
          <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input> -->

          <el-input placeholder="请输入搜索内容" v-model="searchcolumn" style="float:left;width:400px;margin:12px 0 0 5px;" size="small">
            <el-select v-model="selectcolumn" slot="prepend" placeholder="请选择列" style="width:130px;">
              <el-option label="资源属性编号" value="ZYSXBH"></el-option>
              <el-option label="标准编码" value="BZBM"></el-option>
              <el-option label="字段名称" value="ZDMC"></el-option>
              <el-option label="原始字段名称" value="YSZDMC"></el-option>
              <!-- <el-option label="资源属性中文名称" value="5"></el-option> -->
              <el-option label="资源属性定义" value="ZYSXDY"></el-option>
              <el-option label="备注" value="BZ"></el-option>

            </el-select>
            <el-button slot="append" @click="Search" icon="el-icon-search"></el-button>
          </el-input>

      </div>
      <el-table
        :data="metadatadetail"
        border
        fit
        height="600px"
        style="width: 100%;">
        <el-table-column
          label="操作"
          min-width="60">
          <template slot-scope="scope">

            <el-button @click="Upd(scope.row)" type="text" size="small">
              <svg-icon icon-class="update" />
            </el-button>

            <el-button @click="Del(scope.row)" style="margin-left:0px;" type="text" size="small">
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
        height="600px"
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
  data() {
    return {
      dialogVisible: false,
      tempnodeid: null,
      searchcolumn: null,
      selectcolumn: null,
      ResourceStatus: null,
      upmetadataclass: [],
      downmetadataclass: [],
      metadatadetail: [],
      filterText: "",
      treedata: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      metaparams: {
        id: "",
        col: "",
        str: ""
      },
      form: {
        metaid: "",
        metaclsid: "",
        resourceno: "",
        standardno: "",
        metaname: "",
        metapy: "",
        columnname: "",
        oldcolumnname: "",
        columntype: "",
        columnlen: "",
        metadefine: "",
        remark: "",
        isdel: 1
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
      const metaclass = await this.$Data.metaclass(data.id);
      this.upmetadataclass = metaclass.upclass;
      this.downmetadataclass = metaclass.downclass;
      if (Number(data.isresource) === 1) {
        // this.tempNodeid = data.id
        this.form.metaclsid = data.pid;
        this.metaparams.id = data.id;
        this.metaparams.col = "";
        this.metaparams.str = "";
        this.GetMetaDataDetail(this.metaparams);
        // const metadata = await this.$Data.metadatadetail(this.metaparams);
        // console.log('METADATA')
        // console.log(metadata)
        // this.metadatadetail = metadata
        this.ResourceStatus = true;
      } else {
        this.ResourceStatus = false;
      }
    },
    async GetMetaDataDetail(params) {
      const tablelist = await this.$Data.metadatadetail(params);
      this.metadatadetail = tablelist;
    },
    Search() {
      // this.metaparams.id = data.id
      this.metaparams.col = this.selectcolumn;
      this.metaparams.str = this.searchcolumn;
      this.GetMetaDataDetail(this.metaparams);
    },
    Ins() {
      this.dialogVisible = true;
    },
    Upd(data) {
      // console.log(data)
      this.form.metaid = data.metaid;
      this.form.resourceno = data.ZYSXBH;
      this.form.standardno = data.BZBM;
      this.form.metaname = data.ZYSXZWMC;
      this.form.metapy = data.ZYSXZWQP;
      this.form.columnname = data.ZDMC;
      this.form.oldcolumnname = data.YSZDMC;
      this.form.columntype = data.LX;
      this.form.columnlen = data.CD;
      this.form.metadefine = data.ZYSXDY;
      this.form.remark = data.BZ;
      this.dialogVisible = true;
    },
    Del(data) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Object.keys(this.TmpSelectRows).forEach(async key => {
            const metaid = data.metaid; // 这里要改
            const delform = {
              metaid: metaid, // 这里要改
              isdel: 0
            };
            const res2 = await this.$Data.MetaDataInsOrUp(delform); //这里
            if (res2 === 1) {
              //这里
              this.$message({ message: "删除成功!", type: "success" });
            } else {
              this.$message.error("数据删除失败！");
            }
            this.GetMetaDataDetail(this.metaparams); //这里
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: err //"已取消删除"
          });
        });
      this.FormClear();
    },
    async Save() {
      const res = await this.$Data.MetaDataInsOrUp(this.form); //这里
      if (res === 1) {
        //这里
        this.$message({
          message: "数据添加成功！",
          type: "success"
        });
      } else {
        this.$message.error("数据添加失败！");
      }
      this.dialogVisible = false;
      this.GetMetaDataDetail(this.metaparams); //这里
      this.FormClear();
    },
    FormClear() {
      this.form.metaid = "";
      // this.form.metaclsid:''
      this.form.resourceno = "";
      this.form.standardno = "";
      this.form.metaname = "";
      this.form.metapy = "";
      this.form.columnname = "";
      this.form.oldcolumnname = "";
      this.form.columntype = "";
      this.form.columnlen = "";
      this.form.metadefine = "";
      this.form.remark = "";
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style scoped>
.row-bg {
  height: 100%;
  position: relative;
}
.el-row {
  margin-bottom: 20px;
  min-height: 500px;
}
.el-col {
  border-radius: 4px;
}

.fltag {
  margin-bottom: 20px;
  border-bottom: #d3dce6 solid 1px;
  /* float: left; */
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

.filter-tree {
  font-size: 13px;
}
.formcontent {
  position: relative;
  background-color: #ffffff;
  padding: 20px 60px 0px 60px;
  border-radius: 8px;
}
</style>
