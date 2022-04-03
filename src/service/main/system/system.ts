import jcRequest from '../../index'
import type { IDataType } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return jcRequest.post<IDataType>({
    url,
    data: queryInfo
  })
}
