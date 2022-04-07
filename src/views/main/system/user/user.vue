<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @newBtnClick="handleNewClick"
      @editBtnClick="handleEditClick"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :modalConfig="modalConfigRef"
      :defaultInfo="defaultInfo"
      pageName="users"
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
  name: 'users',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const { pageContentRef, handleResetClick, handleQueryClick } =
      usePageSearch()

    // pageModal相关的hooks逻辑，将这两个函数作为callback放入hooks中
    // 因为里面有之前定义好的新建和编辑按钮的事件
    // 1. 处理密码的逻辑
    const newCallback = () => {
      // 点击新增按钮，找到password配置，将是否显isHideen设置为false表示显示
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      // 点击编辑按钮，将password隐藏
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }

    // 2.动态添加部门和角色列表(vuex中的数据请求需要时间，这个修改的值，在页面中不会立马响应，需要使用副作用函数)
    const store = useStore()
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modalConfig
    })

    // 3.调用hooks获取公共变量和函数
    const { pageModalRef, defaultInfo, handleNewClick, handleEditClick } =
      usePageModal(newCallback, editCallback)
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
