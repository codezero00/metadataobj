<template>
  <div class="login">

    <div class="main" style="height:475px;">
        <!-- <div class="loginbox"> -->
          <el-form :model="loginform" status-icon :rules="loginRules" ref="loginform" class="loginbox">
          <div class="loginheader">
            <h3>账户登录</h3>
          </div>
          <div class="loginmain">
            <el-form-item prop="username" sytle='margin-bottom:0px'>
            <el-input placeholder="请输入您的账号" v-model="loginform.username" auto-complete="off" style="line-height:40px">
              <i slot="prefix" class="fa fa-user-o fa-fw "></i>
            </el-input>
            </el-form-item>
            <el-form-item prop="passwd" sytle='margin-bottom:0px'>
            <el-input placeholder="请输入您的密码" v-model="loginform.passwd" auto-complete="off" style="margin-top:20px;line-height:40px">
              <i slot="prefix" class="fa fa-key fa-fw"></i>
            </el-input>
            </el-form-item>
            <div class="autologin">
              <!-- <el-checkbox style="float:left" v-model="checked">七天之内自动登录</el-checkbox> -->
              <el-button style="float:right; padding:0" type="text">忘记密码？</el-button>
            </div>
            <div class="loginbutton">
              <el-button type="danger" :loading="loading" plain style="width:100%" @click='login("loginform")'>登&nbsp&nbsp&nbsp陆</el-button>
            </div>
          </div>
          <div class="loginfooter">
            <el-button style="float:right; padding:0;color:red" type="text">立即注册</el-button>
            <i class="el-icon-arrow-right" style="font-size:11px;color:red;float:right;margin:3px 5px 0 0;"></i>
          </div>
          </el-form>
        <!-- </div> -->
    </div>
    <div class="footer" style="height: 220px;"></div>

  </div>
</template>

<script>

import { setToken,getToken } from "@/utils/auth";
import { isvalidUsername } from "@/utils/check";

export default {
  name: "detailpage",
  components: {  },
  data() {
    //表单验证规则 B
    // const validateUsername = async (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     await new Error("请输入正确的用户名");
    //   } else {
    //     callback();
    //   }
    // };

    const validateUsername = (rule, value, callback) => {
      console.log('测试')
      console.log(value)
      if (!value) {
        callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };

    const validatePassword = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error("密码不能小于3位"));
      } else {
        callback();
      }
    };
    //表单验证规则 E

    return {
      checked: true,
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        passwd: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      loading: false,
      loginform: {
        username: "",
        passwd: ""
      }
    };
  },
  methods: {
    login(formName) {
      // setToken('sfsgasega')
      // getToken()
      this.$refs[formName].validate(async (valid) => {
        if(valid){
          this.loading = true;
          // console.log(this.loginform);
          // try{
          const udata = await this.$store.dispatch("LoginByUsername", this.loginform);

          if(udata.failure){
            this.loading = false;
            this.$message.error(udata.failure);
          } else {
            console.log("else")
            this.$router.push({ path: "/home" });
          }
          // if(udata && !udata.failure){
          //   this.loading = false;
          //   this.$router.push({ path: "/home" });
          // } else {
          //   this.loading = false;
          //   console.log('test111')
          //   this.$message.error(udata.failure);
          // }
          // }
          // catch(err){
          //   console.log(err)
          //   this.$message.error(err);
          // }
        } else {
          return false
        }
      });

    }
  }
};
</script>

<style scoped>
.header {
  background-color: black;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.footer {
  background-color: #7d7d7d;
  color: #333;
  text-align: center;
  /* line-height: 60px; */
}

.login {
  background-image: url("../assets/img/bgLogin.png");
}

.loginbox {
  float: right;
  width: 346px;
  height: 361px;
  margin: 40px 80px 0 0;
  background-color: white;
  border-radius: 10px;
  border: 7px solid rgba(255, 255, 255, 0.4);
}
.loginheader {
  height: 55px;
  text-align: center;
  color: #999;
  margin: 0 20px 0 20px;
  border-bottom: 1px solid #f4f4f4;
}
.loginheader h3 {
  margin: 0;
  padding: 10px 0 10px 0;
}
.loginmain {
  height: 220px;
  padding: 40px 30px 0 30px;
}
.loginfooter {
  height: 55px;
  margin: 0 20px 0 20px;
  border-top: 1px solid #f4f4f4;
  padding: 10px 20px 0 20px;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #333;
}
.autologin {
  margin-top: 20px;
  position: relative;
  height: 40px;
}
</style>
