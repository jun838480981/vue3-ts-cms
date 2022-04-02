<template>
  <div class="user">
    <div class="search">
      <!-- 直接使用配置文件里面的属性 -->
      <jc-form v-bind="formConfig" />
    </div>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import JcForm from '@/base-ui/form'
// 直接获取封装好的配置文件 使代码结果简洁
import { formConfig } from './config/search.config'

export default defineComponent({
  components: {
    JcForm
  },
  name: 'user',
  setup() {
    return {
      formConfig
    }
  }
})
</script>

<style scoped lang="less"></style>
