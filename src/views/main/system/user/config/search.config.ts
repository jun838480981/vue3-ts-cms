import { IForm } from '@/base-ui/form'
// 将所有的配置属性单独封装成一个配置文件，使用直接v-bind="formConfig" 绑定到组件标签上
export const searchFormConfig: IForm = {
  // label的宽度
  labalWidth: '120px',
  // formItem的边距
  itemStyle: {
    padding: '10px 40px'
  },
  // 适配col在各个屏幕宽度下的占比
  colLayout: {
    xl: 6,
    lg: 8,
    md: 12,
    sm: 24,
    xs: 24
  },
  // 根据这里进行组件的配置，输入不同的属性进行页面配置加载
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: 'id',
      placeholder: '请输入id'
    },
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'password',
      type: 'password',
      label: '密码',
      placeholder: '请输入密码'
    },
    {
      field: 'sport',
      type: 'select',
      label: '喜欢的运动',
      placeholder: '请选择运动',
      options: [
        { title: '篮球', value: 'basketball' },
        { title: '足球', value: 'football' }
      ]
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
