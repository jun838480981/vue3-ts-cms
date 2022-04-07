import { createStore, Store, useStore as useVuexStore } from 'vuex'

import { getPageListData } from '@/service/main/system/system'

import type { IRootState, IRootType } from './types'
// 导入模块
import login from './login/login'
import system from './main/system/system'

// createStore接收一个泛型，泛型就是state的类型
const store = createStore<IRootState>({
  state() {
    return {
      entireDepartment: [],
      entireRole: []
    }
  },
  getters: {},
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
    }
  },
  modules: {
    login,
    system
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  store.dispatch('getInitialDataAction')
}

// 定义返回值的类型，添加了module模块中的数据类型
export function useStore(): Store<IRootType> {
  return useVuexStore()
}

export default store
