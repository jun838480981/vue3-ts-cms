import type { ILoginState } from './login/types'
import type { ISystemState } from './main/system/types'
export interface IRootState {
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}

// 类型交叉 让rootState中包含module
export type IRootType = IRootState & IRootWithModule
