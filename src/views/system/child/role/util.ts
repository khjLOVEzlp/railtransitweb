import { useModalContext } from "context/modal-context";
import { useRoleDetail } from "./request";

export const useRoleModal = () => {
  const { visible, setVisible, editId, setEditId } = useModalContext()

  const { data: editingRole, isLoading, isSuccess } = useRoleDetail(
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
    editingRole,
    isLoading,
    editId,
    isSuccess
  };
};