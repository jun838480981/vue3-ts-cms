import { IBreadcrumb } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null

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
        if (!firstMenu) {
          // 保存第一个子路由
          firstMenu = menu
        }
      } else {
        _recuresGetRoute(menu.children)
      }
    }
  }

  _recuresGetRoute(userMenus)

  return routes
}

export function pathMapToBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export function mapMenuToPermissions(userMenus: any[]) {
  const permissions: string[] = []
  const _recuresGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recuresGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recuresGetPermission(userMenus)

  return permissions
}

export function mapMenuLeafKeys(menuList: any[]) {
  const leafKeys: number[] = []
  const _recuresGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recuresGetLeaf(menu.children)
      } else {
        leafKeys.push(menu.id)
      }
    }
  }
  _recuresGetLeaf(menuList)
  return leafKeys
}

export { firstMenu }
