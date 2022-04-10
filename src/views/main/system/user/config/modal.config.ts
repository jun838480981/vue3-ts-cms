import { IForm } from '@/base-ui/form/types'
export const modalConfig: IForm = {
  title: '用户',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'password',
      type: 'input',
      label: '密码',
      placeholder: '请输入密码',
      isHidden: true
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      field: 'departmentId',
      type: 'select',
      label: '部门选择',
      placeholder: '请选择部门',
      options: []
    },
    {
      field: 'roleId',
      type: 'select',
      label: '角色选择',
      placeholder: '请选择角色',
      options: []
    }
  ],
  itemStyle: {},
  // 适配col在各个屏幕宽度下的占比
  colLayout: {
    span: 24
  }
}
