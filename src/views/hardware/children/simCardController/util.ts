import { useAuth } from "context/auth-context";
import { useSetUrlSearchParam, useUrlQueryParam } from "hook/useUrlQueryParam";
import { useSimDetail } from "./request";

export const useSimModal = () => {
  const { visible, setVisible, editId, setEditId } = useAuth()

  const { data: editingSim, isLoading } = useSimDetail(
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
    editingSim,
    isLoading,
    editId
  };
};