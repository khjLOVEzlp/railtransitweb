import {useSetUrlSearchParam, useUrlQueryParam} from "hook/useUrlQueryParam";
import {useAlcDetail} from "utils/hardware/alc";

export const useAlcModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{createAlc}, setCreateAlc] = useUrlQueryParam([
    "createAlc"
  ])

  const [{editingAlcId}, setEditingAlcId] = useUrlQueryParam([
    "editingAlcId",
  ]);

  const {data: editingAlc, isLoading} = useAlcDetail(
    Number(editingAlcId)
  );

  const open = () => setCreateAlc({createAlc: true})
  const close = () => setUrlParams({editingAlcId: "", createAlc: ""});
  const startEdit = (id: number) =>
    setEditingAlcId({editingAlcId: id});

  return {
    ModalOpen: createAlc === "true" || Boolean(editingAlcId),
    open,
    close,
    startEdit,
    editingAlc,
    isLoading,
    editingAlcId
  };
};