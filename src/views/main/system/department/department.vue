<template>
  <div class="department">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="department"
      @newBtnClick="handleNewClick"
      @editBtnClick="handleEditClick"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :modalConfig="modalConfigRef"
      :defaultInfo="defaultInfo"
      pageName="department"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

// 直接获取封装好的配置文件 使代码结构简洁
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  name: 'department',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const { pageContentRef, handleResetClick, handleQueryClick } =
      usePageSearch()

    // 1.动态添加部门和角色列表(vuex中的数据请求需要时间，这个修改的值，在页面中不会立马响应，需要使用副作用函数)
    const store = useStore()
    const modalConfigRef = computed(() => {
      const parentItem = modalConfig.formItems.find(
        (item) => item.field === 'parentId'
      )
      parentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modalConfig
    })

    // 3.调用hooks获取公共变量和函数
    const { pageModalRef, defaultInfo, handleNewClick, handleEditClick } =
      usePageModal()
    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      pageModalRef,
      modalConfigRef,
      defaultInfo,
      handleResetClick,
      handleQueryClick,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped lang="less"></style>
