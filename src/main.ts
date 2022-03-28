import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import globalRegister from './global' /**element-plus导入 */
// import jcRequest from './service'
import 'normalize.css'
import './assets/css/index.less'

const app = createApp(App)

app.use(router).use(store).use(globalRegister)

app.mount('#app')

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }
//  单独拦截用的不多
// jcRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptors: (config) => {
//       console.log('单独请求的config')
//       return config
//     },
//     responseInterceptors: (res) => {
//       console.log('单独响应的response')

//       return res
//     }
//   }
// })

// showLoading是否显示loading
// jcRequest
//   .get<DataType>({
//     url: '/home/multidata'
//   })
//   .then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
//   })
//   .catch((err) => {
//     console.log(err)
//   })
