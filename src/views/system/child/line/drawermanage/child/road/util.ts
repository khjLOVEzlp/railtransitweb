import {useSetUrlSearchParam, useUrlQueryParam} from "hook/useUrlQueryParam";
import {useLineRoadDetail} from "utils/system/lineRoad";

export const useLineRoadModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{createLineRoad}, setCreateLineRoad] = useUrlQueryParam([
    "createLineRoad"
  ])

  const [{editingLineRoadId}, setEditingLineRoadId] = useUrlQueryParam([
    "editingLineRoadId",
  ]);

  const {data: editingLineRoad, isLoading} = useLineRoadDetail(
    Number(editingLineRoadId)
  );

  const open = () => setCreateLineRoad({createLineRoad: true})
  const close = () => setUrlParams({editingLineRoadId: "", createLineRoad: ""});
  const startEdit = (id: number) =>
    setEditingLineRoadId({editingLineRoadId: id});

  return {
    ModalOpen: createLineRoad === "true" || Boolean(editingLineRoadId),
    open,
    close,
    startEdit,
    editingLineRoad,
    isLoading,
    editingLineRoadId
  };
};