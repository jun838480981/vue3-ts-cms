<template>
  <div class="page-search">
    <!-- 直接使用配置文件里面的属性 -->
    <jc-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h2 class="title">高级检索</h2>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button :icon="RefreshLeft" @click="handleResetClick"
            >重置</el-button
          >
          <el-button type="primary" :icon="Search" @click="handleQueryClick"
            >搜索</el-button
          >
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
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 双向绑定的属性应该是由配置文件里的field来决定
    // 1.优化一：formData中的属性动态来决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      // 将field作为key放到对象中
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    // 2.优化二：当用户点击重置
    const handleResetClick = () => {
      // 方法一 和 JcForm组件中对应
      // for (const key in formOriginData) {
      //   formData.value[`${key}`] = formOriginData[key]
      // }
      // 方法二 和 JcForm组价中对应
      formData.value = formOriginData
      emit('resetBtnClick')
    }

    // 3.优化三：当用户点击搜索
    const handleQueryClick = () => {
      // 将搜索框的数据传递给父组件
      emit('queryBtnClick', formData.value)
    }

    return {
      formData,
      Search,
      RefreshLeft,
      handleResetClick,
      handleQueryClick
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
