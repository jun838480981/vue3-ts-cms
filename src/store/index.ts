import { createStore, Store, useStore as useVuexStore } from 'vuex'

import type { IRootState, IRootType } from './types'
// 导入模块
import login from './login/login'
import system from './main/system/system'

// createStore接收一个泛型，泛型就是state的类型
const store = createStore<IRootState>({
  state() {
    return {
      name: 'kobe',
      age: 24
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login,
    system
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

// 定义返回值的类型，添加了module模块中的数据类型
export function useStore(): Store<IRootType> {
  return useVuexStore()
}

export default store
