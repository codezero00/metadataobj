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

  <!-- <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">

            <el-form
              ref="form"
              model={this.form}
              rules={this.rules}
              label-width="80px"
            >
              <el-form-item label="名称" prop="checkName">
                <el-input v-model="this.treedata" />
              </el-form-item>
              <el-form-item label="前置库IP">
                <el-input v-model="this.treedata" />
              </el-form-item>
              <el-form-item label="使用软件">
                <el-input v-model="this.treedata" />
              </el-form-item>
              <el-form-item label="位置">
                <el-input v-model="this.treedata" />
              </el-form-item>
              <el-form-item label="所属部门">
                <el-input v-model="this.treedata" />
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="this.treedata" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="作用">
                <el-input type="textarea" v-model="this.treedata" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" v-model="this.treedata" />
              </el-form-item>
              <div class="formfooter">
                <el-button >
                  取消
                </el-button>
                <el-button type="primary" >
                  保存
                </el-button>
              </div>
            </el-form>

  </el-dialog> -->

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
        mcid:null,
        pid:'',
        metaclsno:'',
        classno:'',
        isresource:'',
        level:'',
        metaclsname:'',
        metaclspy:'',
        remark:'',
        app:'',
        createname:'',
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
    },

    update(node, data) {
      this.FormClear();
      this.InitDiaglog();
      this.$store.dispatch("setDialogTitle", "插入");
      this.$store.dispatch("setDialogWidth", "30%");
      this.$store.dispatch("setDialogVisible", true);
    },
    append(node, data) {
      console.log("node !!!!!!!!!!!")
      console.log(node)
      console.log("data !!!!!!!!!!!")
      console.log(data)
      this.FormClear();
      this.InitDiaglog(data.metaclsno);
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
      this.dialogVisible = true;
      console.log("remove");
      // const parent = node.parent;
      // const children = parent.data.children || parent.data;
      // const index = children.findIndex(d => d.id === data.id);
      // children.splice(index, 1);
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span /*v-show={node.level != 1}*/>
            <el-button
              style="color:#909399;margin-left:5px"
              type="text"
              on-click={() => this.append(node,data)}
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
    InitDiaglog(data) {
      // this.$iouform({ data: {}, propsData: {} });
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
                <el-input placeholder="请输入内容" v-model={this.form.classno}>
                  <template slot="prepend">{data}</template>
                </el-input>
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
                <el-input type="textarea" v-model={this.form.effect} />
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
