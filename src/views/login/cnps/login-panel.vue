<template>
  <div class="login-panel">
    <h1 class="title">Login to System</h1>
    <el-tabs stretch type="border-card">
      <el-tab-pane>
        <template #label>
          <span class="tab-pane">
            <el-icon class="icon"><user-filled /></el-icon>
            <span> 账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span class="tab-pane">
            <el-icon class="icon"><iphone /></el-icon><span> 手机登录</span>
          </span>
        </template>
        <login-phone />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox class="keep-pwd" v-model="isKeepPassword"
        >记住密码</el-checkbox
      >
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button class="login-btn" type="primary" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    const isKeepPassword = ref(true)
    // vue3+ts获取有ref组件实例类型 只要使用要获取组价信息使用ref类型都是这样获取
    const accountRef = ref<InstanceType<typeof LoginAccount>>()

    const handleLoginClick = () => {
      console.log('登录成功')
      accountRef.value?.loginAction()
    }

    return {
      isKeepPassword,
      handleLoginClick,
      accountRef
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  margin-bottom: 200px;
  color: #fff;
  .title {
    text-align: center;
  }
  .tab-pane .icon {
    vertical-align: -15%;
  }
  .account-control {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    .keep-pwd {
      color: rgb(255, 255, 255);
    }
  }
  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
