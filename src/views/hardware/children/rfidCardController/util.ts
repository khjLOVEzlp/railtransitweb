import { useModalContext } from "context/modal-context";
import { useRfiDetail } from "./request";

export const useRfiModal = () => {
  const { visible, setVisible, editId, setEditId } = useModalContext()

  const { data: editingRfi, isLoading } = useRfiDetail(
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
    editingRfi,
    isLoading,
    editId
  };
};