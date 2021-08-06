import { useAuth } from "context/auth-context";
import { usePlaDetail } from "./request";

export const usePlaModal = () => {
  const { visible, setVisible, editId, setEditId } = useAuth()

  const { data: editingPla, isLoading } = usePlaDetail(
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
    editingPla,
    isLoading,
    editId
  };
};