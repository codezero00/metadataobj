// JSX双向绑定测试 完成版

<script>
export default {
  data() {
    return {
      msg: "Hello JSX",
      msg2: 100,
      radioModel: "1234",
      label: "123",
      value: 10000,
      status: "可用"
    };
  },
  methods: {
    hello() {
      // alert("Hello Vue 2.0");
      this.msg2 += 1;
      this.value += 100;
    },
    updateValue: function(value) {
      this.$emit("input", value);
    },
    save() {
      alert(this.value)
      alert(this.status)
      alert()
      alert("Hello Vue 2.0");
      this.value = "kkkk";
    }
  },
  render(h) {
    const data = {
      domProps: {
        value: this.value
      }
      // on: {
      //   input: function(event) {
      //     this.updateValue(event.target.value);
      //   }
      // }
    };
    // return <div href="hoho" {...data}/>
    return (
      <div id="hi">
        <input on-input={this.value} {...data} />
        <input v-model={this.value} />
        <select v-model={this.status} placeholder="请选状态">
          <option label="可用" value="可用" />
          <option label="不可用" value="不可用" />
        </select>
        <span
          class={{ a: true, b: true }}
          style={{ fontSize: "15px" }}
          on-click={this.hello}
          {...data}
        >
          {this.msg2}
        </span>
        <span>{this.value}</span>
        <button on-click={this.save} />
      </div>
    );
  }
};
</script>

<style scoped>

</style>