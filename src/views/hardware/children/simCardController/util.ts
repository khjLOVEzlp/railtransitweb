import {useSetUrlSearchParam, useUrlQueryParam} from "hook/useUrlQueryParam";
import {useSimDetail} from "utils/hardware/sim";

export const useSimModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{createSim}, setCreateSim] = useUrlQueryParam([
    "createSim"
  ])

  const [{editingSimId}, setEditingSimId] = useUrlQueryParam([
    "editingSimId",
  ]);

  const {data: editingSim, isLoading} = useSimDetail(
    Number(editingSimId)
  );

  const open = () => setCreateSim({createSim: true})
  const close = () => setUrlParams({editingSimId: "", createSim: ""});
  const startEdit = (id: number) =>
    setEditingSimId({editingSimId: id});

  return {
    ModalOpen: createSim === "true" || Boolean(editingSimId),
    open,
    close,
    startEdit,
    editingSim,
    isLoading,
    editingSimId
  };
};