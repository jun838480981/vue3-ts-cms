import { createStore } from 'vuex'

import type { IRootState } from './types'
import login from './login/login'

// createStore接收一个泛型，泛型就是state的类型
const store = createStore<IRootState>({
  state() {
    return {
      name: 'kobe'
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store
