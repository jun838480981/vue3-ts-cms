<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="username">
        <el-input v-model="account.username" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="account.password"
          placeholder="请输入密码"
          show-password
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
// import { useRouter } from 'vue-router'
import { ElForm } from 'element-plus'

import { rules } from '../config/account-config'
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    // const router = useRouter()
    const account = reactive({
      // 如果存在缓存，优先使用缓存
      username: localCache.getCache('username') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPassword: boolean) => {
      // 获取验证的回调结果(Boolean)
      formRef.value?.validate((vaild) => {
        if (vaild) {
          if (isKeepPassword) {
            // 勾选记住密码
            localCache.setCache('username', account.username)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('username')
            localCache.deleteCache('password')
          }
        }
      })
    }

    return {
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped></style>
