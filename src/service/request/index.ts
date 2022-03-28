import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { JCRequestInterceptors, JCRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

const DEFAULT_LOADING = true

class JCRequest {
  instance: AxiosInstance
  interceptors?: JCRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: JCRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 保存自定义拦截器函数
    this.interceptors = config.interceptors
    // 请求是否显示loading
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    // 使用请求拦截器 并使用自定义拦截器函数(同一个实例所有的请求)
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    // 使用响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )

    // 添加所有实例都有的拦截器(不同的实例所有的请求)
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有实例请求成功拦截')
        if (this.showLoading === true) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        console.log('所有实例请求失败拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有实例响应成功拦截')

        // 将loading移除
        this.loading?.close()

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败~，错误信息')
        } else {
          return data
        }
      },
      (err) => {
        console.log('所有实例响应失败拦截')

        // 将loading移除
        this.loading?.close()

        // 例子：判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404错误~')
        }
        return err
      }
    )
  }

  request<T>(config: JCRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 如果单个请求request中传递了请求拦截函数 将调用传递过来的请求拦截函数对 config进行处理(同一个实例不同的请求)
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }

      // 判断是否要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 如果config中有传递响应拦截函数 调用响应拦截函数对res进行处理 放回值是处理过的res
          if (config.interceptors?.responseInterceptors) {
            // res是外界调用的时候定义的结果的类型
            // responseInterceptors 而这个函数要求传入参数的类型是AxiosResponse
            // 主要错误就是该自定义的函数接收参数的类型和 现在外界定义好的res类型不一致
            // 解决方法 JCRequestConfig传入泛型 <T> 这个类型里面又有我们自定好的interceptors
            // 再将泛型传递给interceptors定义的类型JCRequestInterceptors<T>
            // 再将泛型<T> 放入JCRequestInterceptors类型下定义函数类型中
            res = config.interceptors.responseInterceptors(res)
          }

          // 将showLoading设置成true 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING

          // 将结果返回出去
          resolve(res)
        })
        .catch((err) => {
          // 将showLoading设置成true 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T>(config: JCRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: JCRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: JCRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: JCRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default JCRequest
