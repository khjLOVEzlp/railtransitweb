import { useModalContext } from "context/modal-context";
import { useSimDetail } from "./request";

export const useSimModal = () => {
  const { visible, setVisible, editId, setEditId } = useModalContext()

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