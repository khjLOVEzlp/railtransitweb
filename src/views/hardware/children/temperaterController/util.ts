import { useModalContext } from "context/modal-context";
import { useTemDetail } from "./request";

export const useTemModal = () => {
  const { visible, setVisible, editId, setEditId } = useModalContext()

  const { data: editingTem, isLoading } = useTemDetail(
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
    editingTem,
    isLoading,
    editId
  };
};