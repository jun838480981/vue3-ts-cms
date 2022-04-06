<template>
  <div class="jc-form">
    <div class="header"><slot name="header"></slot></div>
    <el-form :label-width="labalWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:model-value="handleValueChange($event, item.field)"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  style="width: 100%"
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:model-value="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.title"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:model-value="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer"><slot name="footer"></slot></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'

import { IFormItem } from '../types'

export default defineComponent({
  // PropType vue3加TS语法 给数组相应类型的方法
  // 通过配置文件来对组件进行创建
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labalWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },

  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 1.双向绑定 v-model方法
    // const formData = ref({ ...props.modelValue })
    // watch(
    //   formData,
    //   (newValue) => {
    //     emit('update:modelValue', newValue)
    //   },
    //   // 进行深度监听
    //   { deep: true }
    // )
    // 在组件上使用v-model，组件内部的实现原理，现在就是拿着外部v-model传递过来的值，直接在表单组件中进行原理实现绑定
    // 2. 将外面v-model传递过来的modelValue直接绑定到表单中，在通过组件双向绑定的原理方法改变传递过来的值
    // handleValueChange这个方法是表单组件中实现原理方法
    const handleValueChange = (value: any, field: string) => {
      // 表单组件的值改变，触发事件将v-model传递进来的原本的值结构，在将现在改变的值放进去覆盖
      // 这里发送出去的是外面通过v-model，组件内部事项原理的那个方法，并将值改变后传递出去
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }

    return {
      handleValueChange
      // formData
    }
  }
})
</script>

<style scoped lang="less">
.jc-form {
  padding-top: 22px;
}
</style>
