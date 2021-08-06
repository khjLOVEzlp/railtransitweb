import { useAuth } from "context/auth-context";
import { useDictItemDetail } from "./request";

export const useDictItemModal = () => {
  const { visible, setVisible, editId, setEditId } = useAuth()

  const { data: editingDictItem, isLoading } = useDictItemDetail(
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
    editingDictItem,
    isLoading,
    editId
  };
};