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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'

import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'

import { usePageSearch } from '@/hooks/use-page-search'

export default defineComponent({
  name: 'goods',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    const { pageContentRef, handleResetClick, handleQueryClick } =
      usePageSearch()
    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped></style>
