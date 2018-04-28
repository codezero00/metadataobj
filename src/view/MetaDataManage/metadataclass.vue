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
        :render-content="renderContent"
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

  data() {
    return {
      // dialogVisible: false,
      upmetadataclass: [],
      downmetadataclass: [],
      filterText: "",
      treedata: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      form: {
        mcid: null,
        pid: "",
        metaclsno: "",
        metaclspno: "",
        classno: "",
        isresource: "",
        level: "",
        metaclsname: "",
        metaclspy: "",
        remark: "",
        app: "",
        createname: "",
        isdel: 1
      }
    };
  },
  mounted() {
    // (async () => {
    //   const metaclasstree = await this.$Data.metaclasstree();
    //   this.treedata = metaclasstree;
    //   // 默认加载
    //   this.nodeclick(this.treedata[0]);
    // })();
    this.GetMetaClassTree();
  },
  computed: {
    mcno(){
      return this.form.metaclspno+this.form.classno
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    async GetMetaClassTree() {
      const metaclasstree = await this.$Data.metaclasstree();
      this.treedata = metaclasstree;
      // 默认加载
      this.nodeclick(this.treedata[0]);
    },
    async nodeclick(data) {
      // console.log("nodeclick");
      // console.log(data);
      // console.log("end nodeclick");
      // let id = 'GH';
      // if(data){
      //   id = data.id
      // }
      // debugger
      const metaclass = await this.$Data.metaclass(data.id);
      this.upmetadataclass = metaclass.upclass;
      this.downmetadataclass = metaclass.downclass;
      return metaclass
      // console.log(this.downmetadataclass.length);
    },

    async update(node, data) {
      let metaclass = await this.nodeclick(data);
      // console.log("node !!!!!!!!!!!");
      // console.log(node);
      // console.log("data !!!!!!!!!!!");
      // console.log(data);

      this.form.mcid = data.id
      // this.form.pid = data.pid
      this.form.metaclsno = metaclass.upclass[0].FLBM;
      // this.form.classno = "";
      this.form.isresource = data.isresource;
      // this.form.level = "";
      this.form.metaclsname = metaclass.upclass[0].FLMC;
      this.form.metaclspy = metaclass.upclass[0].ZWQP;
      this.form.remark = metaclass.upclass[0].FLDY;
      this.form.app = metaclass.upclass[0].YYXT;
      this.form.createname = metaclass.upclass[0].FZDW;

      this.InitDiaglog();
      this.$store.dispatch("setDialogTitle", "更新");
      this.$store.dispatch("setDialogWidth", "30%");
      this.$store.dispatch("setDialogVisible", true);
    },
    append(node, data) {
      // console.log("node !!!!!!!!!!!");
      // console.log(node);
      // console.log("data !!!!!!!!!!!");
      // console.log(data);
      this.FormClear();
      this.InitDiaglog(node, data);
      this.$store.dispatch("setDialogTitle", "插入");
      this.$store.dispatch("setDialogWidth", "30%");
      this.$store.dispatch("setDialogVisible", true);
      // const newChild = { id: id++, label: "testtest", children: [] };
      // if (!data.children) {
      //   this.$set(data, "children", []);
      // }
      // data.children.push(newChild);
    },
    remove(node, data) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {

            const delform = {
              mcid: data.id,
              isdel: 0
            };

            let res = await this.$Data.MetaDataClassInsOrUp(delform);
            if (res === 1) {
              this.$message({ message: "删除成功!", type: "success" });
            } else {
              this.$message.error("数据删除失败！");
            }

            this.GetMetaClassTree();

        })
        .catch(err => {
          this.$message({
            type: "info",
            message: err //"已取消删除"
          });
        });
      this.FormClear();
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span /*v-show={node.level != 1}*/>
            <el-button v-show={data.isresource != 1}
              style="color:#909399;margin-left:5px"
              type="text"
              on-click={() => this.append(node, data)}
            >
              <svg-icon icon-class="plus" />
            </el-button>
            <el-button
              style="color:#909399;margin-left:0px"
              type="text"
              on-click={() => this.update(node, data)}
            >
              <svg-icon icon-class="update" />
            </el-button>
            <el-button
              v-show={node.isLeaf == true}
              style="color:#909399;margin-left:0px"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              <svg-icon icon-class="del" />
            </el-button>
          </span>
        </span>
      );
    },

    FormClear() {
      this.form.mcid = "";
      this.form.pid = "";
      this.form.metaclsno = "";
      this.form.classno = "";
      this.form.isresource = "";
      this.form.level = "";
      this.form.metaclsname = "";
      this.form.metaclspy = "";
      this.form.remark = "";
      this.form.app = "";
      this.form.createname = "";
      this.form.isdel = 1;
    },
    InitDiaglog(node,data) {
      debugger;
      let bool = "undefined"!=typeof(node)&&"undefined"!=typeof(data)
      // const y = typeof(data)
      if(bool){
        this.form.metaclspno = data.metaclsno;
        this.form.pid = data.id;
        this.form.level = node.level+1
      } 

      let xx = {
        propsData: {
          renderContent: (
            <el-form
              ref="form"
              model={this.form}
              rules={this.rules}
              label-width="80px"
            >
              <el-form-item label="分类编码" prop="checkName">
              { (bool)?
                <el-input placeholder="请输入内容" v-model={this.form.classno}>
                  <template slot="prepend">{data.metaclsno}</template>
                </el-input>:
                <el-input v-model={this.form.metaclsno} disabled/>
              }
              </el-form-item>
              <el-form-item label="分类名称">
                <el-input v-model={this.form.metaclsname} />
              </el-form-item>
              <el-form-item label="中文全拼">
                <el-input v-model={this.form.metaclspy} />
              </el-form-item>
              <el-form-item label="负责单位">
                <el-input v-model={this.form.createname} />
              </el-form-item>
              <el-form-item label="应用系统">
                <el-input v-model={this.form.app} />
              </el-form-item>
              <el-form-item label="是否资源项">
                <select v-model={this.form.isresource} placeholder="请选状态">
                  <option label="是" value="1" />
                  <option label="否" value="0" />
                </select>
              </el-form-item>
              <el-form-item label="分类定义">
                <el-input type="textarea" v-model={this.form.remark} />
              </el-form-item>

              <div class="formfooter">
                <el-button
                  nativeOnClick={() =>
                    this.$store.dispatch("setDialogVisible", false)
                  }
                >
                  取消
                </el-button>
                <el-button type="primary" nativeOnClick={() => this.Save()}>
                  保存
                </el-button>
              </div>
            </el-form>
          )
        }
      };
      this.$store.dispatch("setrender", xx.propsData.renderContent);
    },
    async Save() {
      debugger;
      this.form.metaclsno=this.mcno;
      // console.log(this.mcno)
      console.log(this.form)
      // console.log(this.form.metaclspno+this.form.classno)
      const res = await this.$Data.MetaDataClassInsOrUp(this.form);
      // if (res === 1) {
      //   this.$message({
      //     message: "数据添加成功！",
      //     type: "success"
      //   });
      //   this.FormClear();
      // } else {
      //   this.$message.error("数据添加失败！");
      // }
      this.$store.dispatch("setDialogVisible", false);
      this.GetMetaClassTree();
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

.fltag {
  margin-bottom: 20px;
  border-bottom: #d3dce6 solid 1px;
}
/* .right {
  margin: 0 15px 0 0;
} */
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
/* .filter-tree {
  font-size: 13px;
  position: relative;
  overflow-y: auto;
  height: 660px;
} */
</style>
