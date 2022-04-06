<template>
  <div class="page-content">
    <jc-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- header中的插槽 -->
      <template #headerHandler>
        <el-button type="primary">
          新建<el-icon style="padding-left: 5px"><Plus /></el-icon>
        </el-button>
        <!-- <div class="hader-handle-btn">
            <el-button size="small" type="success ">导出</el-button>
            <el-button size="small">打印</el-button>
          </div> -->
      </template>

      <!-- 列中的插槽 -->
      <template #enable="slotProps">
        <el-button
          size="small"
          plain
          :type="slotProps.row.enable ? 'success' : 'danger'"
        >
          {{ slotProps.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="slotProps">
        <span>{{ $filters.formatTime(slotProps.row.createAt) }}</span>
      </template>
      <template #updateAt="slotProps">
        <span>{{ $filters.formatTime(slotProps.row.updateAt) }}</span>
      </template>
      <template #handler>
        <div class="handle-btn">
          <el-button :icon="Edit" size="small" type="text">编辑</el-button>
          <el-button :icon="Delete" size="small" type="text">删除</el-button>
        </div>
      </template>
    </jc-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import JcTable from '@/base-ui/table'

import { Edit, Delete } from '@element-plus/icons-vue'

// 定义了全局方法后需要扩充类型
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: any
  }
}

export default defineComponent({
  components: {
    JcTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore()

    // 双向绑定page信息
    const pageInfo = ref({ currentPage: 0, pageSize: 10 })
    // 监听变化,重新进行页面请求
    watch(pageInfo, () => getPageData())

    // 派发事件进行网络请求获取数据
    const getPageData = (queryInfo: any = {}) => {
      store.dispatch('system/getListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 拿到vuex中保存好的数据
    const dataList = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters['system/pageListCount'](props.pageName)
    )
    return {
      Edit,
      Delete,
      dataList,
      dataCount,
      pageInfo,

      getPageData
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
