
<template>
  <!-- <treeselect
    v-model="value"
    :multiple="false"
    :options="source"
    /> -->
<div>
<tree-select
  :options="options2"
  :disable-branch-nodes="true"
  :show-count="true"
  :searchable="searchable"
  v-model="value"
  @select="select"
  placeholder="Where are you from?"
  />
  <el-button type="primary" @click="getvalue" class="fb-btn" icon="el-icon-plus">获取值</el-button>
</div>
</template>

<script>
// import TreeSelect from "@riophae/vue-treeselect";

export default {
  //帮助
  // https://vue-treeselect.js.org/#basic-features 
  // components: { TreeSelect },
  data() {
    return {
      value: null,
      options2:[],
      options: [
        {
          id: "node-1",
          label: "Node 1",
          children: [
            {
              id: "node-1-a",
              label: "Node 1-A"
            }
          ]
        },
        {
          id: "node-2",
          label: "Node 2"
        }
      ]
    };
  },
  mounted(){
    this.gettree()
  },
  methods:{
    async gettree(){
      const dbtabletree = await this.$Data.dbtabletree();
      this.options2 = dbtabletree;
      console.log(this.options2)
    },
    getvalue(){
      alert(this.value)
      console.log(this.value)
    },
    select(node /*,id*/){
      console.log(node)
      // console.log(id)
    }
  }
};
</script>

<style src="@riophae/vue-treeselect/dist/vue-treeselect.min.css"></style>