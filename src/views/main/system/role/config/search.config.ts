import { IForm } from '@/base-ui/form'
// 将所有的配置属性单独封装成一个配置文件，使用直接v-bind="formConfig" 绑定到组件标签上
export const searchFormConfig: IForm = {
  labalWidth: '120px',
  // 根据这里进行组件的配置，输入不同的属性进行页面配置加载
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名称',
      placeholder: '请输入角色名称'
    },
    {
      field: 'intro',
      type: 'input',
      label: '权限介绍',
      placeholder: '请输入权限介绍'
    },
    {
      field: 'createTime',
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
