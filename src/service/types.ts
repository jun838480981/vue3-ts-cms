// 这里的data类型不确定，可以添加泛型让外界来决定
export interface IDataType<T = any> {
  code: number
  data: T
}
