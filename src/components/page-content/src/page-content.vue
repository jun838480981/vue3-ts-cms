<template>
  <div class="page-content">
    <jc-table :listData="userList" v-bind="contentTableConfig">
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
import { defineComponent, computed } from 'vue'
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
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    JcTable
  },
  setup() {
    const store = useStore()
    // 派发事件进行网络请求获取数据
    store.dispatch('system/getListAction', {
      pageUrl: 'users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    // 拿到vuex中保存好的数据
    const userList = computed(() => store.state.system.userList)
    // const userCount = computed(() => store.state.system.usercount)
    return {
      Edit,
      Delete,
      userList
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
