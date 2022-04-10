import { Module } from 'vuex'
import type { ISystemState } from './types'
import type { IRootState } from '@/store/types'

import {
  deletePageData,
  getPageListData,
  createPageData,
  editPageData
} from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      categoryList: [],
      categoryCount: 0
    }
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count
    },
    changeCategoryList(state, list: any[]) {
      state.categoryList = list
    },
    changeCategoryCount(state, count: number) {
      state.categoryCount = count
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        // 断言成any类型才能这样使用
        return (state as any)[`${pageName}List`]
        // switch (pageName) {
        //   case 'users': {
        //     return state.usersList
        //   }
        //   case 'role': {
        //     return state.roleList
        //   }
        // }
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    async getListAction({ commit }, payload: any) {
      // 1.获取pageUrl
      const pageName = payload.pageName
      // 接口规范时直接拼 不规范时使用switch
      const pageUrl = `/${pageName}/list`
      // let pageUrl = ''
      // switch (pageName) {
      //   case 'user': {
      //     pageUrl = '/users/list'
      //     break
      //   }
      //   case 'role': {
      //     pageUrl = '/role/list'
      //     break
      //   }
      // }

      // 2.对页面网络请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      // 3.将数据存储到state中
      const { list, totalCount } = pageResult.data
      const firstUpName = pageName[0].toUpperCase() + pageName.substr(1)
      commit(`change${firstUpName}List`, list)
      commit(`change${firstUpName}Count`, totalCount)
    },

    async deletePageDataAction({ dispatch }, payload: any) {
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      // 调用网络请求
      await deletePageData(pageUrl)
      // 重新获取最新的值
      dispatch('getListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    async createPageDataAction({ dispatch }, payload: any) {
      // 1. 创建 数据的请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)

      // 2. 请求最新的数据
      // 重新获取最新的值
      dispatch('getListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    async editPageDataAction({ dispatch }, payload: any) {
      // 1. 编辑 数据的请求
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)

      // 2. 请求最新的数据
      // 重新获取最新的值
      dispatch('getListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
