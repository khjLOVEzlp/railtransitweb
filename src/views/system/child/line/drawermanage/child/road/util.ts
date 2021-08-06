import { useLineRoadDetail } from "./request";
import { useLineContext } from "../../..";

export const useLineRoadModal = () => {
  const { roadId, setRoadId, openRoadVisible, setOpenRoadVisible } = useLineContext()

  const { data: editingLineRoad, isLoading } = useLineRoadDetail(
    Number(roadId)
  );

  const open = () => setOpenRoadVisible(true)
  const close = () => {
    setRoadId(undefined)
    setOpenRoadVisible(false)
  }
  const startEdit = (id: number) =>
    setRoadId(id);

  return {
    ModalOpen: openRoadVisible === true || Boolean(roadId),
    open,
    close,
    startEdit,
    editingLineRoad,
    isLoading,
    roadId
  };
};