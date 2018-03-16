<template>
  <div class="hometree">
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
    ref="tree1">
    </el-tree>
  </div>
</template>

<script>
export default {
  watch: {
    filterText(val) {
      this.$refs.tree1.filter(val);
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
      filterText: "",
      data2: [],
      // [
      //   {
      //     id: 1,
      //     pid:2,
      //     label: "name1",
      //     children: [
      //       {
      //         id: 4,
      //         label: "name4",
      //         children: [{ id: 12, label: "name12"}]
      //       },
      //       { id: 5, label: "name5" },
      //       { id: 6, label: "name6"}
      //     ]
      //   },
      //   {
      //     id: 2,
      //     label: "name2",
      //     children: [
      //       { id: 7, label: "name7" },
      //       {
      //         id: 8,
      //         label: "name8",
      //         children: [{ id: 13, label: "name12" }]
      //       }
      //     ]
      //   },
      //   {
      //     id: 3,
      //     label: "name3",
      //     children: [
      //       { id: 9, label: "name9" },
      //       { id: 10, label: "name10" },
      //       { id: 11, label: "name11" }
      //     ]
      //   }
      // ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  mounted() {
    (async () => {
      const metagroupdata = await this.$Data.metagroup();
      console.log(metagroupdata);
      //metagroupdata.map(x => {this.data.push({name: x.name,today: x.today,status: x.gaptype,code: x.code});});
      this.data2 = metagroupdata;
    })();
  }
};
</script>

<style scoped>
.hometree {
  /* width: 200px; */
  float: left;
  margin-left: 10px;
}
</style>
