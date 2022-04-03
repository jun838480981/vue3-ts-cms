<template>
  <div class="page-search">
    <!-- 直接使用配置文件里面的属性 -->
    <jc-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h2 class="title">高级检索</h2>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button :icon="RefreshLeft">重置</el-button>
          <el-button type="primary" :icon="Search">搜索</el-button>
        </div>
      </template>
    </jc-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import JcForm from '@/base-ui/form'
import { Search, RefreshLeft } from '@element-plus/icons-vue'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      require: true
    }
  },
  components: {
    JcForm
  },
  setup() {
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })
    return {
      formData,
      Search,
      RefreshLeft
    }
  }
})
</script>

<style scoped lang="less">
.title {
  background-image: linear-gradient(to top, #00c6fb 0%, #005bea 100%);
  background-clip: text;
  color: transparent;
}
.handle-btns {
  text-align: right;
  padding: 0 40px 20px 0;
}
</style>
