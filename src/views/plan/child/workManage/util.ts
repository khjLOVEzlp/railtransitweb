import { usePlanContext } from "views/plan";
import { useHistoryDetail } from './request'

export const useHistoryModal = () => {
  const { editId, setEditId } = usePlanContext()

  const { data: planHistory, isLoading, isSuccess } = useHistoryDetail(
    Number(editId)
  )

  const close = () => setEditId(undefined)

  const startEdit = (id: number) =>
    setEditId(id)

  return {
    ModalOpen: Boolean(editId),
    editId,
    startEdit,
    close,
    planHistory,
    isLoading,
    isSuccess
  }
}