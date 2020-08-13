<template>
  <div class="login_container">
    <div class="login_box">
      <!--  头像区-->
      <div class="avatar_box">
        <img src="../assets/logo.png">
      </div>
      <!--   表单区 ref的引用对象-->
      <el-form ref="loginFormRef" :model="loginForm" label-width="0px" class="login_form" :rules="loginFormRules">

        <el-form-item prop="username">
          <!--用户名-->
          <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <!--密码-->
          <el-input prefix-icon="iconfont icon-3702mima" v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item class="login_btNs">
          <el-button type="primary" @click="login">登入</el-button>

          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>export default {
  data () {
    return {
// 这是登入表单的数据对象
      loginForm: {
        username: '',
        password: ''
      },
//  这是表单的规章对象
      loginFormRules: {
//   验证用户名的规则
        username: [
          {
            required: true,
            message: '请输入正确登入账号',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
//   验证密码的规则
        password: [
          {
            required: true,
            message: '请输入正确登入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
// 重置表单的数据的函数
      this.$refs.loginFormRef.resetFields()
    },
    login () {
// 对整个表单进行校验的方法
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const result = await this.$axios.post('login', this.loginForm)
//   判断登入状态状态码
        if (result.data.meta.status === 200) {
          return this.$message.success('登入成功')
        } else {
          this.$message.error('登入失败')
        }
      })
    }
  }
}
</script>
<style scoped lang="scss" type="text/scss">
  .login_container {
    background-color: #2b4b6b;
    height: 100%;
  }

  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
      height: 130px;
      width: 130px;
      border: 1px solid #fff;
      border-radius: 50%;
      padding: 10px;
      //
      box-shadow: 0 0 10px #ddd;
      position: relative;
      left: 50%;
      transform: translate(-50%);
      top: -65px;
      background-color: #fff;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }

  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    /*规定两个并排的带边框的框：*/
    box-sizing: border-box;
  }

  .login_btNs {
    display: flex;
    justify-content: center;
  }
</style>
