// import axios from 'axios'

// axios实例对象
// 1. 模拟get请求
// axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
//   console.log(res.data)
// })

// 2. 模拟get请求，并传入参数
// axios
//   .get('http://httpbin.org/get', {
//     params: {
//       name: 'kobe',
//       age: 24
//     }
//   })
//   .then((res) => {
//     console.log(res, 'get传递参数')
//   })

// // 3. 模拟post请求，并传入参数
// axios
//   .post('http://httpbin.org/post', {
//     data: {
//       name: 'kobe',
//       age: 24
//     }
//   })
//   .then((res) => {
//     console.log(res, 'post传递参数')
//   })

// 全局配置
// axios.defaults.baseURL = 'http://httpbin.org'
// axios.defaults.timeout = 10000

// axios
//   .get('/get', {
//     params: {
//       name: 'kobe',
//       age: 24
//     }
//   })
//   .then((res) => {
//     console.log(res.data, 'get传递参数')
//   })

// // 3. 模拟post请求，并传入参数
// axios
//   .post('/post', {
//     data: {
//       name: 'kobe',
//       age: 24
//     }
//   })
//   .then((res) => {
//     console.log(res.data, 'post传递参数')
//   })

// axios.all 多个请求，一起返回
// axios
//   .all([
//     axios.get('/get', { params: { name: 'kobe', age: 24 } }),
//     axios.post('/post', { data: { name: 'kobe', age: 24 } })
//   ])
//   .then((res) => {
//     console.log(res[0].data)
//     console.log(res[1].data)
//   })

// axios拦截器
// fn1: 请求成功会执行的函数
// fn2: 请求失败会执行的函数
// axios.interceptors.request.use(
//   (config) => {
//     // 想做的操作
//     // 1. 给请求添加token
//     // 2. 给请求添加isLoading动画
//     console.log('请求发送成功')
//     return config
//   },
//   (err) => {
//     console.log('请求发送失败')
//     return err
//   }
// )

// fn1: 数据响应成功（服务器正常的返回了数据 20X)
// axios.interceptors.response.use(
//   (res) => {
//     console.log('响应成功的拦截')
//     return res
//   },
//   (err) => {
//     console.log('服务器响应失败')
//     return err
//   }
// )

// console.log(process.env.VUE_APP_BASE_URL)
// console.log(process.env.VUE_APP_BASE_NAME)
