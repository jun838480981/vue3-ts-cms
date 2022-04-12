<template>
  <div class="pie-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
// echart的分层结构
// 1. base-echart使用useEchart.ts里面二次封装好的echart
// 2. pie-echart使用base-echart，并且将options传递出去,同时将options中需要变动的属性暴露出去
// 3，dashboard使用pie-echart，并将pie-echart中暴露的属性值传过去（pieData,...）
import BaseEchart from '@/base-ui/echart'
import { defineProps, computed } from 'vue'
import type { IDataType } from '../types'

const porps = defineProps<{
  pieData: IDataType[]
}>()
// 只绑定了一个数据，需要使用computed来进行相应
const options = computed(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'center'
    },
    color: [
      '#fd79a8',
      '#81ecec',
      '#74b9ff',
      '#f1c40f',
      '#ff7f50',
      '#FF9393',
      '#55efc4'
    ],
    series: [
      {
        name: '数据分类',
        type: 'pie',
        radius: '50%',
        data: porps.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style scoped></style>
