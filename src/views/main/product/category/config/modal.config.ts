import { IForm } from '@/base-ui/form/types'
export const modalConfig: IForm = {
  title: '类别',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '类别名称',
      placeholder: '请输入类别名称'
    }
  ],
  itemStyle: {},
  // 适配col在各个屏幕宽度下的占比
  colLayout: {
    span: 24
  }
}
