<template>
  <el-form label-width="70px" :rules="rules" :model="phone">
    <el-form-item label="手机号" prop="number">
      <el-input v-model="phone.number" placeholder="请输入手机号码" />
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <div class="phone-code">
        <el-input v-model="phone.code" placeholder="请输入验证码" />
        <el-button class="get-code" type="primary">获取验证码</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

import { rules } from '../config/phone-config'

export default defineComponent({
  setup() {
    const phone = reactive({
      number: '',
      code: ''
    })
    return {
      phone,
      rules
    }
  }
})
</script>

<style scoped>
.phone-code {
  display: flex;
  justify-content: space-around;
}
.get-code {
  width: 80px;
  margin-left: 5px;
}
</style>
