import type { ILoginState } from './login/types'
export interface IRootState {
  name: string
}

export interface IRootWithModule {
  login: ILoginState
}

// 类型交叉 让rootState中包含module
export type IRootType = IRootState & IRootWithModule
