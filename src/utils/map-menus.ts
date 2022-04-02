import { RouteRecordRaw } from 'vue-router'

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.先去加载默认所有的routes(就是去找之前在router/main下创建的路由映射 route对象)
  const allRoutes: RouteRecordRaw[] = []
  // webpack中的方法，查找到对应路径的.ts文件 true递归下层或多层中的文件
  const routeFiles = require.context('../router/main', true, /\.ts/)

  // 返回找到文件路径的数组
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    // 获取模块中导出的对象，里面就是一个个route对象
    allRoutes.push(route.default)
  })

  // 2. 根据菜单获取需要添加的routes
  // usermenu:
  // type === 1 -> children type === 1
  // type === 2 -> url -> route
  const _recuresGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
      } else {
        _recuresGetRoute(menu.children)
      }
    }
  }

  _recuresGetRoute(userMenus)

  return routes
}
