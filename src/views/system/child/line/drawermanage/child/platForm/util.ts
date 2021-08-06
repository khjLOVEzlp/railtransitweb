import { useLinePlatformDetail } from "./request";
import { useLineContext } from "../../..";

export const useLinePlatFormModal = () => {
  const { platId, openPlatVisible, setPlatId, setOpenPlatVisible } = useLineContext()

  const { data: editingLinePlatForm, isLoading } = useLinePlatformDetail(
    Number(platId)
  );

  const open = () => setOpenPlatVisible(true)
  const close = () => {
    setPlatId(undefined)
    setOpenPlatVisible(false)
  }
  const startEdit = (id: number) =>
    setPlatId(id)

  return {
    ModalOpen: openPlatVisible === true || Boolean(platId),
    open,
    close,
    startEdit,
    editingLinePlatForm,
    isLoading,
    platId
  };
};