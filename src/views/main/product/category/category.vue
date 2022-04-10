<template>
  <div class="category">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      pageName="category"
      :contentTableConfig="contentTableConfig"
      @newBtnClick="handleNewClick"
      @editBtnClick="handleEditClick"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
      pageName="category"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  name: 'category',
  setup() {
    const { pageContentRef, handleResetClick, handleQueryClick } =
      usePageSearch()
    const { pageModalRef, defaultInfo, handleNewClick, handleEditClick } =
      usePageModal()
    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      pageModalRef,
      defaultInfo,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped></style>
