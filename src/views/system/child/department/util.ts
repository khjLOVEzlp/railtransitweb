import { useAuth } from "context/auth-context";
import { useSetUrlSearchParam, useUrlQueryParam } from "hook/useUrlQueryParam";
import { useDepartmentDetail } from "utils/system/department";

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