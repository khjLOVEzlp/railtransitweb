import { useSetUrlSearchParam, useUrlQueryParam } from "hook/useUrlQueryParam";
import { useLinePlatformDetail } from "utils/system/linePlatform";
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