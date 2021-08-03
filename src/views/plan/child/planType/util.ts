import { useAuth } from "context/auth-context";
import { useSetUrlSearchParam, useUrlQueryParam } from "hook/useUrlQueryParam";
import { usePlanTypeDetail } from "./request";

export const usePlanTypeModal = () => {
  const { visible, setVisible, editId, setEditId } = useAuth()

  const { data: editingPlanType, isLoading } = usePlanTypeDetail(
    Number(editId)
  );

  const open = () => setVisible(true)
  const close = () => {
    setEditId(undefined)
    setVisible(false)
  }
  const startEdit = (id: number) =>
    setEditId(id)

  return {
    ModalOpen: visible === true || Boolean(editId),
    open,
    close,
    startEdit,
    editingPlanType,
    isLoading,
    editId
  };
};