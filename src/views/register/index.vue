<script setup lang="ts">
  import { validatePassword } from '@/utils/validate'
  import SvgIcon from '@/components/SvgIcon/index.vue'
  import useUserStore from '@/store/modules/useUserStore'
  import { ref } from 'vue'

  // 数据源
  const registerForm = ref({
    account: '',
    username: '',
    password: '',
    type: 100,
  })

  // 验证规则
  const registerRules = ref({
    account: [
      {
        required: true,
        trigger: 'blur',
        message: 'email为必填项',
      },
    ],
    username: [
      {
        required: true,
        trigger: 'blur',
        message: '用户名为必填项',
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

  // 处理注册
  const loading = ref(false)
  const store = useUserStore()
  const registerFormRef = ref<any>(null)
  const handleRegister = () => {
    registerFormRef.value.validate((valid: boolean) => {
      if (!valid) return
      loading.value = true
      store
        .register(registerForm.value)
        .then(() => {
          loading.value = true
        })
        .catch((error) => {
          loading.value = false
        })
    })
  }
</script>
<template>
  <div class="register-container">
    <el-form
      ref="registerFormRef"
      class="register-form"
      :model="registerForm"
      :rules="registerRules"
      au
    >
      <h3 class="title">用户注册</h3>
      <!--user-email-->
      <el-form-item class="register-form-item" prop="account">
        <div class="item-icon"><svg-icon icon="email" /></div>
        <el-input
          v-model="registerForm.account"
          placeholder="email"
          name="email"
          class="item-input"
          type="text"
        />
      </el-form-item>

      <!--username-->
      <el-form-item class="register-form-item" prop="username">
        <div class="item-icon"><svg-icon icon="user" /></div>
        <el-input
          v-model="registerForm.username"
          placeholder="username"
          name="username"
          class="item-input"
          type="text"
        />
      </el-form-item>
      <!--password-->
      <el-form-item class="register-form-item" prop="password">
        <div class="item-icon"><svg-icon icon="password" /></div>

        <el-input
          v-model="registerForm.password"
          placeholder="password"
          name="password"
          class="item-input"
          type="password"
        />
      </el-form-item>
      <!--登录按钮-->
      <el-button class="register-button" type="primary" :loading="loading" @click="handleRegister">
        注册
      </el-button>
      <div class="sign-up">
        已有账号？
        <router-link :to="{ name: 'login' }" style="color: deepskyblue">直接登录</router-link>
      </div>
    </el-form>
  </div>
</template>
<style lang="scss" scoped>
  .register-container {
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

    .register-form {
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
      .register-form-item {
        width: 100%;
        .item-icon {
          display: inline-block;
          text-align: center;
          width: 5%;
        }
        .item-input {
          width: 60%;
          :deep(.el-input__inner) {
            background-color: rgba(246, 189, 189, 0.22) !important;
          }
        }
      }
      .register-button {
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
