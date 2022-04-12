import { IForm } from '@/base-ui/form/types'
export const modalConfig: IForm = {
  title: '部门',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '部门名称',
      placeholder: '请输入部门名称'
    },
    {
      field: 'parentId',
      type: 'select',
      label: '上级部门',
      placeholder: '请选择上级部门',
      options: []
    },
    {
      field: 'leader',
      type: 'input',
      label: '领导名称',
      placeholder: '请输入领导名称'
    }
  ],
  itemStyle: { padding: 0 },
  // 适配col在各个屏幕宽度下的占比
  colLayout: {
    span: 24
  }
}
