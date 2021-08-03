import { useAuth } from "context/auth-context";
import { useUserDetail } from "./request";

export const useUserModal = () => {
  const { visible, setVisible, editId, setEditId } = useAuth()

  const { data: editingUser, isLoading } = useUserDetail(
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
    editId
  };
};