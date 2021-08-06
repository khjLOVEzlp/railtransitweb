import { useAuth } from "context/auth-context";
import { useDepartmentDetail } from "views/system/child/department/request";

export const useDepartmentModal = () => {
  const { visible, setVisible, editId, setEditId } = useAuth()

  const { data: editingDepartment, isLoading } = useDepartmentDetail(
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
    editingDepartment,
    isLoading,
    editId
  };
};