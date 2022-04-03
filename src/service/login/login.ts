import jcRequest from '../index'

import type { IDataType } from '../types'
import type { IAccount, ILoginResult } from './types'

// 将所有的url提取出来，方便修改
enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法：/users/1
  UserMenus = '/role/' // 用法：/role/1/menu
}

export function accountLoginRequest(account: IAccount) {
  return jcRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return jcRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenusByRoleId(id: number) {
  return jcRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
