import jcRequest from '../../index'
import type { IDataType } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return jcRequest.post<IDataType>({
    url,
    data: queryInfo
  })
}

// url: /users/id
export function deletePageData(url: string) {
  return jcRequest.delete<IDataType>({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return jcRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return jcRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
