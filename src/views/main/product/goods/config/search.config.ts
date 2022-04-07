import { IForm } from '@/base-ui/form'
// 将所有的配置属性单独封装成一个配置文件，使用直接v-bind="formConfig" 绑定到组件标签上
export const searchFormConfig: IForm = {
  labalWidth: '120px',
  // 根据这里进行组件的配置，输入不同的属性进行页面配置加载
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '商品名称',
      placeholder: '请输入商品名称'
    },
    {
      field: 'status',
      type: 'select',
      label: '商品状态',
      placeholder: '请选择商品状态',
      options: [
        { title: '上架', value: 1 },
        { title: '下架', value: 0 }
      ]
    }
    // {
    //   field: 'createAt',
    //   type: 'datepicker',
    //   label: '创建时间',
    //   otherOptions: {
    //     startPlaceholder: '开始时间',
    //     endPlaceholder: '结束时间',
    //     type: 'daterange'
    //   }
    // }
  ]
}
