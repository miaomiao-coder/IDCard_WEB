<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <img class="gh" src="../../assets/imglogin/gh.png" />
        <h3 class="titlelogin">居民身份证自助取证终端后台</h3>
      </div>

      <div class="input-container">
        <div class="inputBox">
            <el-form-item prop="username">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="请输入用户名"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="on"
              />
            </el-form-item>

            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="请输入密码"
                name="password"
                tabindex="2"
                auto-complete="on"
                @keyup.enter.native="handleLogin"
              />
              
            </el-form-item>

            <el-checkbox style=" display:block;margin-bottom:20px; " v-model="checked">记住用户名及密码</el-checkbox>

            <el-button class="loginbtn" :loading="loading"   @click.native.prevent="handleLogin">登录</el-button>
            
        </div>
        
        <p  class="downloadtitle">请根据系统选择下载chrome安装包：</p>
        <div class="download">
            <p>用于win7、8、10系统安装</p>
            <a href="#"><img src="../../assets/imglogin/load1.png" /></a>
            <a href="#"><img src="../../assets/imglogin/load2.png" /></a>
        </div>
          <div class="download">
            <p>用于winXP系统安装</p>
            <a href="#"><img src="../../assets/imglogin/load3.png" /></a>
            <a href="#"><img src="../../assets/imglogin/load4.png" /></a>
        </div>
       
      
      </div>
    
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码错误'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      checked: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    // color: $cursor;
  }
}
/* reset element-ui css */
.login-container {
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #fff;
    color: #454545;
    width: 320px;
    padding: 0 15px;
  }
  .el-input {
    display: inline-block;
    height: 41px;
    width: calc(100% - 22px);

    input {
      background: transparent;
      border: 0px;
      // -webkit-appearance: none;
      border-radius: 0px;
      padding: 0 5px 0 15px;
      height: 41px;
      caret-color: #000;

      // &:-webkit-autofill {
      //   box-shadow: 0 0 0px 1000px $bg inset !important;
      //   -webkit-text-fill-color: $cursor !important;
      // }
    }
  }


}
.el-form-item__content{
  line-height: 0;
}
.loginbtn{
    width:320px;
    height: 41px;
    margin-bottom:30px;
    background: linear-gradient(180deg, #53A2FF 0%, #569FFF 100%);
    font-size: 24px;
    border-radius: 0;
    line-height: 41px;
    color: #fff;
    padding: 0;
    border:none;
    &:hover{
      color: #fff ;
    }
}
.el-checkbox__input.is-checked+.el-checkbox__label {
    color: #606266;
}

.el-form-item__error {
    font-size: 14px;
    left: -15px;
}
</style>

<style lang="scss" scoped>
$bg:#53A2FF;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 768px;
    max-width: 100%;
    padding: 57px 0 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }


  .input-container{
    width: 100%;
    height: 585px;
    background: url('../../assets/imglogin/box.png') no-repeat left top;
    background-size: 100% 100%;
    
    .inputBox{
      padding: 48px 0 0 223px;
    }
  }

  .svg-container {
    color:#499AEF;
    vertical-align: middle;
    height: 24px;
    display: inline-block;
    .svg-icon{
      width: 20px;
      height: 24px;
    }
  }

  .title-container {
    position: relative;
    text-align:center;
    .gh{
      width: 130px;
    }
    .titlelogin {
      font-family: 'Source Han Sans SC';
      font-size: 42px;
      color: $light_gray;
      margin: 30px auto 25px auto;
      text-align: center;
    }
  }

  // .show-pwd {
  //   position: absolute;
  //   right: 10px;
  //   top: 7px;
  //   font-size: 16px;
  //   color: $dark_gray;
  //   cursor: pointer;
  //   user-select: none;
  // }
}


.downloadtitle{
  text-align: center;
  font-size: 26px;
  color: #464646;
  margin: 16px auto;
}

.download{
  overflow:hidden;
   padding: 0 0 0 223px;
  p{
    font-size: 20px;
    color: #414141 ;
    position:relative;
    margin: 16px 0 0;
  }
  a{
    display: block;
    float: left;
    margin: 16px 20px 0 0;
    img{
      display: block;
      width: 150px;
      height:41px;
    }
  }
}













</style>
<style lang="scss" scoped>

// <span class="show-pwd" @click="showPwd">
//             <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
//           </span>
</style>
