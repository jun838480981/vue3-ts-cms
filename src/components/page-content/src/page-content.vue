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
        <el-button type="primary" v-if="isCreate" @click="handleNewClick">
          新建<el-icon style="padding-left: 5px"><Plus /></el-icon>
        </el-button>
        <!-- <div class="hader-handle-btn">
            <el-button size="small" type="success ">导出</el-button>
            <el-button size="small">打印</el-button>
          </div> -->
      </template>
      <!-- 列中的插槽 -->
      <template #enable="scope">
        <el-button
          size="small"
          plain
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btn">
          <el-button
            :icon="Edit"
            size="small"
            type="text"
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            :icon="Delete"
            size="small"
            type="text"
            v-if="isDelete"
            @click="handleDeleteClick(scope.row)"
            >删除
          </el-button>
        </div>
      </template>

      <!-- 动态插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </jc-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import JcTable from '@/base-ui/table'
import { usePermission } from '@/hooks/use-permission'

import { Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

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
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    // 0. 获取操作权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 1. 双向绑定page信息
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    // 监听变化,重新进行页面请求
    watch(pageInfo, () => getPageData())

    // 2. 派发事件进行网络请求获取数据
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 3. 拿到vuex中保存好的数据
    const dataList = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters['system/pageListCount'](props.pageName)
    )

    // 4. 获取其他动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'enable') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )

    // 5. 删除/修改/新增操作
    const handleDeleteClick = (item: any) => {
      ElMessageBox.confirm('确定要删除这条信息?', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 传递pageName和id进行拼接成url
          store.dispatch('system/deletePageDataAction', {
            pageName: props.pageName,
            id: item.id
          })
          // ElMessage({
          //   type: 'success',
          //   message: '删除成功'
          // })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消'
          })
        })
    }

    const handleNewClick = () => {
      emit('newBtnClick')
    }
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }

    return {
      dataList,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      Edit,
      Delete,
      getPageData,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
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
