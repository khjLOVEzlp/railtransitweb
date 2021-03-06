import { useModalContext } from "context/modal-context";
import { useMenuDetail } from "./request";

export const useMenuModal = () => {
  const { visible, setVisible, editId, setEditId } = useModalContext()

  const { data: editingMenu, isLoading } = useMenuDetail(
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
    editingMenu,
    isLoading,
    editId
  };
};