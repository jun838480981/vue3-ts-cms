<template>
  <div class="goods">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="goods"
      @newBtnClick="handleNewClick"
      @editBtnClick="handleEditClick"
    >
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          fit="cover"
          preview-teleported
        />
      </template>
      <template #status="scope">
        <el-button
          size="small"
          plain
          :type="scope.row.status ? 'success' : 'danger'"
        >
          {{ scope.row.status ? '上架' : '下架' }}
        </el-button>
      </template>
      <template #oldPrice="scope">
        {{ `￥${scope.row.oldPrice}` }}
      </template>
      <template #newPrice="scope">
        {{ `￥${scope.row.newPrice}` }}
      </template>
    </page-content>
    <page-modal
      ref="pageModalRef"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
      pageName="goods"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import PageModal from '@/components/page-modal'

import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  name: 'goods',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const { pageContentRef, handleResetClick, handleQueryClick } =
      usePageSearch()
    const { pageModalRef, defaultInfo, handleNewClick, handleEditClick } =
      usePageModal()
    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      modalConfig,
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
