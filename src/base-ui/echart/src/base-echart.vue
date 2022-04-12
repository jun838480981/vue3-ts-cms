<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
import useEchart from '@/base-ui/echart/hooks/useEchart'
// 导入options类型
// import { EChartsOption } from 'echarts'

// setup中定义props 通过泛型使用ts类型此时泛型中的prop都是必传的属性，使用?变成可选类型
// defineProps<{
//   width?: string
//   height?: string
// }>()
// 在setup中给props定义默认值的方法 将上面定义props作为函数的第一个参数，第二个参数就是props默认值对象
// 函数会将props作为返回值返回出来
const props = withDefaults(
  defineProps<{
    options: any
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

const echartDivRef = ref<HTMLElement>()
onMounted(() => {
  const { setOptions } = useEchart(echartDivRef.value!)
  // 当options数据改变时，宠幸执行一下数据绑定
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style scoped></style>
