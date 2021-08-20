import { useModalContext } from "context/modal-context";
import { useDictTypeDetail } from "./request";

export const useDictTypeModal = () => {
  const { visible, setVisible, editId, setEditId } = useModalContext()

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