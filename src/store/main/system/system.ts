import { Module } from 'vuex'
import type { ISystemState } from './types'
import type { IRootState } from '@/store/types'

import { getPageListData } from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      usercount: 0
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.usercount = userCount
    }
  },
  actions: {
    async getListAction({ commit }, payload: any) {
      // 1.进行页面网络请求
      const pageResult = await getPageListData(
        payload.pageUrl,
        payload.queryInfo
      )
      const { list, totalCount } = pageResult.data
      // 保存用户信息和用户数量
      commit('changeUserList', list)
      commit('changeUserCount', totalCount)
    }
  }
}

export default systemModule
