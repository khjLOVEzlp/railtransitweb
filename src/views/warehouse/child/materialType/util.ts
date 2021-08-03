import { useAuth } from "context/auth-context";
import { useSetUrlSearchParam, useUrlQueryParam } from "hook/useUrlQueryParam";
import { useMaterialDetail } from "utils/warehouse/materialType";

export const useMaterialModal = () => {
  const { visible, setVisible, editId, setEditId } = useAuth()

  const { data: editingMaterial, isLoading } = useMaterialDetail(
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
    editingMaterial,
    isLoading,
    editId
  };
};
