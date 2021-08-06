import { useLineClassDetail } from "./request";
import { useLineContext } from "../../../index";

export const useLineClassModal = () => {
  const { openClassVisible, setOpenClassVisible, classId, setClassId } = useLineContext()

  const { data: editingLineClass, isLoading } = useLineClassDetail(
    Number(classId)
  );

  const open = () => setOpenClassVisible(true)
  const close = () => {
    setClassId(undefined)
    setOpenClassVisible(false)
  }
  const startEdit = (id: number) =>
    setClassId(id)

  return {
    ModalOpen: openClassVisible === true || Boolean(classId),
    open,
    close,
    startEdit,
    editingLineClass,
    isLoading,
    classId
  };
};