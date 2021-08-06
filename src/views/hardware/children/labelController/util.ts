import { useAuth } from "context/auth-context";
import { useLabDetail } from "./request";

export const useLabModal = () => {
  const { visible, setVisible, editId, setEditId } = useAuth()


  const { data: editingLab, isLoading } = useLabDetail(
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
    editingLab,
    isLoading,
    editId
  };
};