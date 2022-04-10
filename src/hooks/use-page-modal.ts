import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type CallbackFn = (item?: any) => void

export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})
  const handleNewClick = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
      pageModalRef.value.handleName = '新建'
    }
    newCb && newCb()
  }
  const handleEditClick = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
      pageModalRef.value.handleName = '编辑'
    }
    editCb && editCb(item)
  }
  return {
    pageModalRef,
    defaultInfo,
    handleNewClick,
    handleEditClick
  }
}
