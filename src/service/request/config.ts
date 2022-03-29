// 环境变量
// 根据process.env.NODE_ENV区分
// 开发环境：development
// 生产环境：production
// 测试环境：test

let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  // 开发环境下webpack配置api解决跨域问题 使用/api即可
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://123.207.32.32:8000/prod'
} else {
  BASE_URL = 'http://123.207.32.32:8000/test'
}

export { BASE_URL, TIME_OUT }
