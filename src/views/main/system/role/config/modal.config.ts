import { IForm } from '@/base-ui/form/types'
export const modalConfig: IForm = {
  title: '角色',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名',
      placeholder: '请输入角色名'
    },
    {
      field: 'intro',
      type: 'input',
      label: '角色介绍',
      placeholder: '请输入角色介绍'
    }
  ],
  itemStyle: {},
  // 适配col在各个屏幕宽度下的占比
  colLayout: {
    span: 24
  }
}
