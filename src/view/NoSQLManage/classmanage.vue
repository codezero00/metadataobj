// JSX测试

<script>
export default {
  data() {
    return {
      msg: "Hello JSX",
      radioModel: "1234",
      label: "123"
    };
  },
  methods: {
    hello() {
      alert("Hello Vue 2.0");
      this.msg='okkkkkkk'
    }
  },
  render(h) {
    const data = {
      attrs: {
        id: "hehe"
      },
      on: {
        click: () => {
          console.log("click");
        }
      },
      props: {
        innerHTML: "hihihi"
      },
      hook: {
        insert: () => {
          console.log("insert");
        }
      }
    };
    // return <div href="hoho" {...data}/>
    return (
      <div id="hi">
        <span
          class={{ a: true, b: true }}
          style={{ fontSize: "15px" }}
          on-click={this.hello}
          {...data}
        >
          {this.msg}
        </span>
      </div>
    );
  }
};
</script>

<style scoped>

</style>