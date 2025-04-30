<template>
  <div class="login">
    <!--  标题  -->
    <div class="el-login-header">
      <img src="../assets/images/login/logo.png">
      <span>CPE智能管理平台</span>
    </div>
    <div class="logo">
       <img src="../assets/images/login/Wi-Fi.png">
    </div>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
    >
      <h3 class="title">登录</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="账号"
        >
          <!-- <svg-icon
            slot="prefix"
            icon-class="user"
            class="el-input__icon input-icon"
          /> -->
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          show-password
          @keyup.enter.native="tologin"
        >
          <!-- <svg-icon
            slot="prefix"
            icon-class="password"
            class="el-input__icon input-icon"
          /> -->
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaOnOff">
        <el-input
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter.native="tologin"
        >
          <svg-icon
            slot="prefix"
            icon-class="validCode"
            class="el-input__icon input-icon"
          />
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img" />
        </div>
      </el-form-item>
      <!-- <el-checkbox
        v-model="loginForm.rememberMe"
        style="margin: 0px 0px 25px 0px"
        >记住密码</el-checkbox
      > -->
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width: 100%"
          @click.native.prevent="tologin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <div style="float: right" v-if="register">
          <router-link class="link-type" :to="'/register'"
            >立即注册</router-link
          >
        </div>
      </el-form-item>
    </el-form>
  
  </div>
</template>

<script>
import { getCodeImg, loginInfo} from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import { getToken, setToken, removeToken } from '@/utils/auth'
import { getDataInfo, } from "@/api/cpeApi/system.js";

export default {
  name: "Login",
  data() {
    return {
      codeUrl: "",
      loginForm: {
        username: "admin",
        password: "admin123",
        rememberMe: false,
        code: "",
        uuid: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入您的账号" },
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" },
        ],
        code: [{ required: true, trigger: "change", message: "请输入验证码" }],
      },
      loading: false,
      // 验证码开关
      captchaOnOff: false,
      // 注册开关
      register: false,
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    // this.getCode();
    // this.getCookie();
  },
  methods: {
    getCode() {
      getCodeImg().then((res) => {
        this.captchaOnOff =
          res.captchaOnOff === undefined ? true : res.captchaOnOff;
        if (this.captchaOnOff) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.loginForm.uuid = res.uuid;
        }
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password:
          password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
      };
    },
    handleLogin() {
      this.$router.push({ path: this.redirect || "/systemState/vanStatus" }).catch(() => {});
      // this.$refs.loginForm.validate((valid) => {
      //   if (valid) {
      //     this.loading = true;
      //     if (this.loginForm.rememberMe) {
      //       Cookies.set("username", this.loginForm.username, { expires: 30 });
      //       Cookies.set("password", encrypt(this.loginForm.password), {
      //         expires: 30,
      //       });
      //       Cookies.set("rememberMe", this.loginForm.rememberMe, {
      //         expires: 30,
      //       });
      //     } else {
      //       Cookies.remove("username");
      //       Cookies.remove("password");
      //       Cookies.remove("rememberMe");
      //     }
      //     this.$store
      //       .dispatch("Login", this.loginForm)
      //       .then(() => {
      //         this.$router.push({ path: this.redirect || "/" }).catch(() => {});
      //       })
      //       .catch(() => {
      //         this.loading = false;
      //         if (this.captchaOnOff) {
      //           this.getCode();
      //         }
      //       });
      //   }
      // });
    },
    tologin(){
       var data = 
       {
          "password": this.loginForm.password
        } 
      console.log('发送请求',data);
      // this.$router.push({ path: this.redirect || "/systemState/vanStatus" }).catch(() => {});
      // sessionStorage.setItem("token","893835255");
      loginInfo(data).then((res) => {
        console.log('接受参数',res);
        this.$message.closeAll()
        if(res.error == "password error"){
          this.$message({
            type: 'error',
            message: '密码错误'
          });
        }else{
          var token = res.token;
          // sessionStorage.setItem("token",token);
          setToken(token);
          this.$router.push({ path: this.redirect || "/systemState/vanStatus" }).catch(() => {});
          var data = {
              "m":        1,
              "n":        77,
              "timestamp":    123421312,
              "value":  {
              }
          };
          getDataInfo(data).then((res) => {
            this.$message.closeAll()
            if(res.value.error != null && response.data.error != undefined && response.data.error != 'undefined' && response.data.error != ''){
              if(res.value.result >=0 && res.value.result <=9){
                this.$message({
                  type: 'success',
                  message: '升级成功'
                });
              }else{
                this.$message({
                  type: 'error',
                  message: res.value.result_desc
                });
              }
            }
          })
          // this.captchaOnOff =
          //   res.captchaOnOff === undefined ? true : res.captchaOnOff;
          // if (this.captchaOnOff) {
          //   this.codeUrl = "data:image/gif;base64," + res.img;
          //   this.loginForm.uuid = res.uuid;
          // }
        }
      });
    }
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/login/bg 2.png");
  background-size: cover;
}
.el-login-header {
  height: 40px;
  line-height: 40px;
  position: fixed;
  top: 4%;
  left: 4%;
  text-align: left;
  color: #000;
  font-family: Arial;
  font-size: 36px;
  font-weight: bold;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
}
.el-login-header img{
  height: 40px;
  margin-right: 20px;
}
.logo{
  width: 50%;
  padding: 10% 8% 10% 12%;
  box-sizing: border-box;
  text-align: right;
  margin-top: 12%;
  img{
    width: 90%;
  }
}
.login-form {
  border-radius: 3%;
  background: #ffffff;
  padding: 5%;
  box-sizing: border-box;
  width: 35%;
  /* margin-left: 5%; */
  .el-input {
    height: 60px;
    margin-bottom: 20px;
    input {
      height: 60px;
      background-image: url('../assets/images/login/inoutbox.png');
      background-size: 100% 100%;
      font-size: 20px;
      border: 0;
    }
  }
  .input-icon {
    height: 50px;
    width: 14px;
    margin-left: 2px;
  }
}
.title {
  margin: 0px auto 40px auto;
  text-align: left;
  font-size: 36px;
  color: #303135;
}
.login .el-button--primary {
  height: 60px;
  font-size: 28px;
  background-size: 100% 100%;
  background-color: #0B5CF7;
  margin-top: 20px;
  border-radius: 30px;
}


.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.login-code-img {
  height: 38px;
}

/* 适用于比6.7寸屏幕小的机型，使用的样式 */
@media screen and (min-width: 393px) and (max-width: 768px)  {
  .el-login-header{
    font-size: 24px;
    img{
      height: 30px;
    }
  }
  .logo{
      display: none;
  }
  .login-form{
    width: 90%;
    margin: 0 auto;
  }
    
}
</style>
