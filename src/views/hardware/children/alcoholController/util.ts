import { useModalContext } from "context/modal-context";
import { useAlcDetail } from "./request";

export const useAlcModal = () => {
  const { visible, setVisible, editId, setEditId } = useModalContext()

  const { data: editingAlc, isLoading } = useAlcDetail(
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
    editingAlc,
    isLoading,
    editId
  };
};