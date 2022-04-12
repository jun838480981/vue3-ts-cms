import { IForm } from '@/base-ui/form'
// 将所有的配置属性单独封装成一个配置文件，使用直接v-bind="formConfig" 绑定到组件标签上
export const searchFormConfig: IForm = {
  // label的宽度
  labelWidth: '100px',
  // formItem的边距
  itemStyle: {
    padding: '10px 40px'
  },
  // 适配col在各个屏幕宽度下的占比
  colLayout: {
    span: 8
  },
  // 根据这里进行组件的配置，输入不同的属性进行页面配置加载
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '部门名称',
      placeholder: '请输入部门名称'
    },
    {
      field: 'leader',
      type: 'input',
      label: '部门领导',
      placeholder: '请输入部门领导'
    },
    {
      field: 'createAt',
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}
