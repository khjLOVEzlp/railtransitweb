import { useModalContext } from "context/modal-context";
import { useUserDetail } from "./request";

export const useUserModal = () => {
  const { visible, setVisible, editId, setEditId } = useModalContext()

  const { data: editingUser, isLoading, isSuccess } = useUserDetail(
    Number(editId)
  );

  const open = () => setVisible(true)
  const close = () => {
    setEditId(undefined)
    setVisible(false)
  }

  const startEdit = (id: number) => {
    setEditId(id)
  }

  return {
    ModalOpen: visible === true || Boolean(editId),
    open,
    close,
    startEdit,
    editingUser,
    isLoading,
    editId,
    isSuccess
  };
};