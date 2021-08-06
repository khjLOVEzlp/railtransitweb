import { useAuth } from "context/auth-context";
import { useSafDetail } from "./request";

export const useSepModal = () => {
  const { visible, setVisible, editId, setEditId } = useAuth()


  const { data: editingSep, isLoading } = useSafDetail(
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