import type { AxiosRequestConfig, AxiosResponse } from 'axios'
// 定义拦截器中的四个函数类型
// 接口里面有不确定类型 接收的泛型要提到接口上
export interface JCRequestInterceptors<T = AxiosResponse> {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig // 请求拦截成功
  requestInterceptorsCatch?: (error: any) => any
  responseInterceptors?: (res: T) => T
  responseInterceptorsCatch?: (error: any) => any
}

// 由于AxiosRequestConfig类型没有自定义拦截器函数的类型 所以
// 让JCRequestConfig继承AxiosRequestConfig类型 并添加自定义拦截器函数类型
export interface JCRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: JCRequestInterceptors<T>
  showLoading?: boolean
}
