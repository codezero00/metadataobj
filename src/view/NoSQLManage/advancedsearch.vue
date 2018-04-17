// JSX测试

<script>
export default {
  data() {
    return {
      ResourceBaseData: [],
      ParamsPage: {
        CurrentPage: 1,
        PageSize: 10,
        TotalCount: 0
      },
      form: {
        fbid: null,
        name: "123",
        ip: "123",
        usesoftware: "123",
        location: "",
        dept: "",
        effect: "",
        remark: "",
        status: "",
        createuserid: "",
        updateuserid: "",
        isdel: 1
      },
      TmpSelectRows: [],
      UpButtionDisabled: true,
      test1: "hahaha",
      currentValue: "123",
      value: "1234556"
    };
  },

  render: function(createElement) {
    var self = this;
    return createElement("input", {
      domProps: {
        value: self.value
      },
      on: {
        input: function(event) {
          self.updateValue(event.target.value);
        }
      }
    });
  },
  methods: {
    updateValue: function(value) {
      this.$emit("input", value);
    },

    sync(prop, value) {
      this[prop] = value;
    },
    Save() {
      this.test = "8888";
    }
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
  height: 333px;
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
  height: 45px;
}
.right {
  margin: 0 15px 0 15px;
}
</style>