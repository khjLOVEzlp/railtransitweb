import {useSetUrlSearchParam, useUrlQueryParam} from "hook/useUrlQueryParam";
import {usePlaDetail} from "utils/hardware/pla";

export const usePlaModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{createPla}, setCreatePla] = useUrlQueryParam([
    "createPla"
  ])

  const [{editingPlaId}, setEditingPlaId] = useUrlQueryParam([
    "editingPlaId",
  ]);

  const {data: editingPla, isLoading} = usePlaDetail(
    Number(editingPlaId)
  );

  const open = () => setCreatePla({createPla: true})
  const close = () => setUrlParams({editingPlaId: "", createPla: ""});
  const startEdit = (id: number) =>
    setEditingPlaId({editingPlaId: id});

  return {
    ModalOpen: createPla === "true" || Boolean(editingPlaId),
    open,
    close,
    startEdit,
    editingPla,
    isLoading,
    editingPlaId
  };
};