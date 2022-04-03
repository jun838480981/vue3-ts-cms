<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />
    <el-table :data="userList" border style="width: 100%">
      <el-table-column prop="name" label="用户名" min-width="180" />
      <el-table-column prop="realname" label="真实姓名" min-width="180" />
      <el-table-column prop="cellphone" label="电话号码" min-width="180" />
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
// 直接获取封装好的配置文件 使代码结果简洁
import { searchFormConfig } from './config/search.config'
import PageSearch from '@/components/page-search'

export default defineComponent({
  name: 'user',
  components: { PageSearch },
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
    const userCount = computed(() => store.state.system.usercount)
    return {
      userList,
      userCount,
      searchFormConfig
    }
  }
})
</script>

<style scoped lang="less"></style>
