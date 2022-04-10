<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <hy-card title="分类商品数量（饼图）"></hy-card>
      </el-col>
      <el-col :span="10">
        <hy-card title="不同城市商品销量"></hy-card>
      </el-col>
      <el-col :span="7">
        <hy-card title="分类商品数量（玫瑰图）"></hy-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <hy-card title="商品分类的销量"></hy-card>
      </el-col>
      <el-col :span="12">
        <hy-card title="商品分类的收藏"></hy-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

import HyCard from '@/base-ui/card'

export default defineComponent({
  components: {
    HyCard
  },
  name: 'dashboard',
  setup() {
    const store = useStore()

    store.dispatch('dashboard/getDashboardDataAction')
    return {}
  }
})
</script>

<style scoped lang="less">
.dashboard {
  background-color: #f5f5f5;
  .content-row {
    margin-top: 10px;
  }
}
</style>
