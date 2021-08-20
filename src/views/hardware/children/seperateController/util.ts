import { useModalContext } from "context/modal-context";
import { useSepDetail } from "./request";

export const useSepModal = () => {
  const { visible, setVisible, editId, setEditId } = useModalContext()


  const { data: editingSep, isLoading } = useSepDetail(
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
    editingSep,
    isLoading,
    editId
  };
};