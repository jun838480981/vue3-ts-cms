import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'

import localCache from '@/utils/cache'
import router from '@/router'
import { mapMenusToRoutes, mapMenuToPermissions } from '@/utils/map-menus'

import type { Module } from 'vuex'
import type { IRootState } from '../types'
import type { ILoginState } from './types'

// ts中要导入使用Module类型并且传递两个泛型<模块中的state类型, 根中的state类型>
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // userMenus -> routes
      const routes = mapMenusToRoutes(userMenus)

      // 将routes -> route.main.children
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 获取用户按钮权限
      const permissions = mapMenuToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  getters: {},
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: any) {
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      // 本地缓存用户登录过下次不需要再登录
      localCache.setCache('token', token)

      // 发送初始化的请求(完整的role/department)
      dispatch('getInitialDataAction', null, { root: true })

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      let userMenus = userMenusResult.data
      // 转换接口中的icon
      userMenus = userMenus.map((item: any) => {
        const icon: string = item.icon
        const upIcon: string[] = icon
          .slice(8)
          .split('-')
          .map((str) => {
            return str.replace(str[0], str[0].toUpperCase())
          })
        item.icon = upIcon.join('')
        return item
      })
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 4.跳到首页
      router.push('/main')
    },
    // 刷新或者直接加载时重新获取数据并保存至本地缓存中
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)

        // 发送初始化的请求(完整的role/department)
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
