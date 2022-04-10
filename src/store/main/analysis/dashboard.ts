import { Module } from 'vuex'
import { IDashboardState } from './types'
import { IRootState } from '../../types'
import {
  getAddressGoodsSale,
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale
} from '@/service/main/analysis/dashboard'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryCountResult = await getCategoryGoodsCount()
      commit('changeCategoryGoodsCount', categoryCountResult.data)

      const categoryCountSale = await getAddressGoodsSale()
      commit('changeCategoryGoodsSale', categoryCountSale.data)

      const categoryCountFavor = await getCategoryGoodsFavor()
      commit('changeCategoryGoodsFavor', categoryCountFavor.data)

      const addressSaleResult = await getCategoryGoodsSale()
      commit('changeAddressGoodsSale', addressSaleResult.data)
    }
  }
}

export default dashboardModule
