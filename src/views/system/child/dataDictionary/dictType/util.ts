import { useAuth } from "context/auth-context";
import { useDictTypeDetail } from "./request";

export const useDictTypeModal = () => {
  const { visible, setVisible, editId, setEditId } = useAuth()

  const { data: editingDictType, isLoading } = useDictTypeDetail(
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
    editingDictType,
    isLoading,
    editId
  };
};