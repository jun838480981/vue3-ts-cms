export interface ISystemState {
  // 对于服务器返回的数据使用any即可
  usersList: any[]
  usersCount: number
  roleList: any[]
  roleCount: number
  goodsList: any[]
  goodsCount: number
}
