import { useHistoryDetail } from "api/work-plan/work-history";
import { usePlanContext } from "views/work-plan/work-plan";

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