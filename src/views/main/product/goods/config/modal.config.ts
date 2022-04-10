import { IForm } from '@/base-ui/form/types'
export const modalConfig: IForm = {
  title: '商品',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '商品名称',
      placeholder: '请输入商品名称'
    },
    {
      field: 'oldPrice',
      type: 'input',
      label: '原价格',
      placeholder: '请输入商品原价格'
    },
    {
      field: 'newPrice',
      type: 'input',
      label: '现价格',
      placeholder: '请输入商品现价格'
    },
    {
      field: 'imgUrl',
      type: 'input',
      label: '商品图片',
      placeholder: '请输入商品图片(链接格式)'
    }
  ],
  itemStyle: {},
  // 适配col在各个屏幕宽度下的占比
  colLayout: {
    span: 24
  }
}
