<template>
  <div class="login-panel">
    <h1 class="title">Login to System</h1>

    <el-tabs v-model="currentTab" stretch type="border-card">
      <el-tab-pane name="account">
        <template #label>
          <span class="tab-pane">
            <el-icon class="icon"><user-filled /></el-icon>
            <span> 账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="tab-pane">
            <el-icon class="icon"><iphone /></el-icon><span> 手机登录</span>
          </span>
        </template>
        <login-phone ref="phoneRef" />
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
    // ts中使用ref要添加泛型指定参数类型，不添加会根据括号内容推导，括号内容为空时类型为any
    const isKeepPassword = ref(true)
    // vue3+ts获取有ref组件实例类型 只要使用要获取组价信息使用ref类型都是这样获取
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref('account')

    // 定义方法
    const handleLoginClick = () => {
      console.log('登录成功')
      // 切换登录方式
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        console.log('调用phoneRef中的loginAction函数')
      }
    }

    return {
      isKeepPassword,
      accountRef,
      phoneRef,
      currentTab,

      handleLoginClick
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  margin-bottom: 130px;
  // color: #409eff;
  color: #fff;
  .title {
    text-align: center;
    background-image: linear-gradient(120deg, #f093fb 0%, #f5576c 100%);
    background-clip: text;
    color: transparent;
    height: 40px;
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
