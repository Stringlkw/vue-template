<script setup lang="ts">
  import { validatePassword } from '@/utils/validate'
  import SvgIcon from '@/components/SvgIcon/index.vue'
  import useUserStore from '@/store/modules/useUserStore'
  import { ref } from 'vue'

  // 数据源
  const loginForm = ref({
    account: '666@qq.com',
    password: '123456',
    type: 100,
  })

  // 验证规则
  const loginRules = ref({
    account: [
      {
        required: true,
        trigger: 'blur',
        message: 'email为必填项',
      },
    ],
    password: [
      {
        required: true,
        trigger: 'blur',
        validator: validatePassword(),
      },
    ],
  })

  // 处理登录
  const loading = ref(false)
  const store = useUserStore()
  const loginFormRef = ref<any>(null)
  const handleLogin = () => {
    loginFormRef.value.validate((valid: boolean) => {
      if (!valid) return
      loading.value = true
      store
        .login(loginForm.value)
        .then(() => {
          loading.value = false
        })
        .catch((error) => {
          loading.value = false
        })
    })
  }
</script>
<template>
  <div class="login-container">
    <el-form ref="loginFormRef" class="login-form" :model="loginForm" :rules="loginRules">
      <h3 class="title">用户登录</h3>
      <!--email-->
      <el-form-item class="login-form-item" prop="account">
        <div class="item-icon"><svg-icon icon="user" /></div>
        <el-input
          v-model="loginForm.account"
          placeholder="email"
          name="account"
          class="item-input"
          type="text"
        />
      </el-form-item>
      <!--password-->
      <el-form-item class="login-form-item" prop="password">
        <div class="item-icon"><svg-icon icon="password" /></div>
        <el-input
          v-model="loginForm.password"
          placeholder="password"
          name="password"
          class="item-input"
          type="password"
        />
      </el-form-item>
      <!--登录按钮-->
      <el-button class="login-button" type="primary" :loading="loading" @click="handleLogin">
        登录
      </el-button>
      <div class="sign-up">
        还没账户？
        <router-link :to="{ name: 'register' }" style="color: deepskyblue">立即注册</router-link>
      </div>
    </el-form>
  </div>
</template>
<style lang="scss" scoped>
  .login-container {
    display: flex;
    align-items: center;
    justify-content: center;

    min-height: 100vh;
    width: 100%;

    background-image: url(http://127.0.0.1:5000/image/background.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    overflow: hidden;

    .login-form {
      width: 600px;
      height: 400px;
      background-color: rgba(40, 9, 9, 0.36);
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: space-around;
      flex-direction: column;
      border: 10px;
      padding: 20px 50px;
      border-radius: 20px;
      box-shadow: 0 10px 8px 0 rgba(73, 20, 20, 0.2), 0 10px 8px 0 rgba(227, 35, 35, 0.19);
      .title {
        font-size: 30px;
        text-align: center;
        color: #fff;
        padding-bottom: 30px;
      }
      .login-form-item {
        width: 100%;
        .item-icon {
          display: inline-block;
          text-align: center;
          width: 5%;
          padding-bottom: 10px;
        }
        .item-input {
          width: 60%;
          :deep(.el-input__inner) {
            background-color: rgba(246, 189, 189, 0.22) !important;
          }
        }
      }
      .login-button {
        width: 50%;
        background-image: linear-gradient(to right, #af68e8, #f39bab);
        font-size: 20px;
        border: none;
      }
      .sign-up {
        color: #efdede;
        padding-top: 30px;
      }
    }
  }
</style>
