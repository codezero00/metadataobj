<template>
  <transition name="fade" @after-leave="afterleave">
    <div v-if="status">
    <el-dialog
      :title="DialogTitle"
      :visible.sync="GolbalVisible"
      :width="DialogWidth"
      :before-close="handleClose">
      <div class="formcontent">
        <render-form></render-form>
      </div>
    </el-dialog>
    </div>

  </transition>
</template>

<script>
// import IouForm from "@/components/GlobalForm";
import store from '@/vuex/index'

export default {
  store,
  name: "InsertOrUpdateForm",
  components: {
    // IouForm,
    RenderForm: {
      props: {},
      // render: function (h) {
      //   //return createElement('h1', '9999998')
      //   // const parent = this.$parent.$parent;
      //   return (<h1>123</h1>)
      // }
      // mounted(){
      //   (() => {
      //         console.log("kkk")
      //         console.log(this)
      //         console.log(this.RenderContent2)
      //   })();
      // },
      computed: {
        RenderContent2(){
          return this.$store.getters.dialogrender
        }
      },
      render:function(h){
        // const parent = this.$parent.$parent;
        //return (parent.renderContent)
        return (this.RenderContent2)
      }
      // render: function(createElement){
      //   return createElement('p', [
      //     '1234',
      //     createElement('span','HAHA')
      //   ])
      // }
      // render: function(h){
      //   console.log("78787")
      //   console.log(this.RenderContent2)
      //   return (this.RenderContent2.call())
      // }
    }
  },
  props:{
    renderContent: Object,
    inTitle:{
      type: String,
      default: "模态框"
    },
    // inDialogVisible:{
    //   type:Boolean,
    //   default:false
    // }
  },
  data() {
    return {
      title: this.inTitle,
      status:true,
      lswidth: '80%',
      // dialogVisible: true
    }
  },
  computed: {
    GolbalVisible() {
      return store.getters.gbdiaglog
    },
    DialogWidth(){
      return store.getters.dialogwidth
    },
    DialogTitle(){
      return store.getters.dialogtitle
    }
  },
  methods: {
    handleClose(done) {

      this.$confirm("确认关闭？")
        .then(_ => {
          store.dispatch('setDialogVisible',false)
          // this.status=false
          // done();
        })
        .catch(_ => {});
    },
    afterleave(){
      // this.$emit("closed")
      // this.status=false
    }
  }
};
</script>

<style scoped>
.formcontent {
  position: relative;
  background-color: #ffffff;
  padding: 20px 60px 0px 60px;
  border-radius: 8px;
}
</style>
