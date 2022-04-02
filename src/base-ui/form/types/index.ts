type IFormType = 'input' | 'password' | 'select' | 'datepicker'

// formItems的类型
export interface IFormItem {
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对特殊属性（例如startPlaceholder，endPlaceholder, type）
  otherOptions?: any
}

// formConfig的类型
export interface IForm {
  formItems: IFormItem[]
  labalWidth: string
  itemStyle: any
  colLayout: any
}
