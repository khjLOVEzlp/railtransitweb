import {useSetUrlSearchParam, useUrlQueryParam} from "hook/useUrlQueryParam";
import {useLabDetail} from "utils/hardware/lab";

export const useLabModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{createLab}, setCreateLab] = useUrlQueryParam([
    "createLab"
  ])

  const [{editingLabId}, setEditingLabId] = useUrlQueryParam([
    "editingLabId",
  ]);

  const {data: editingLab, isLoading} = useLabDetail(
    Number(editingLabId)
  );

  const open = () => setCreateLab({createLab: true})
  const close = () => setUrlParams({editingLabId: "", createLab: ""});
  const startEdit = (id: number) =>
    setEditingLabId({editingLabId: id});

  return {
    ModalOpen: createLab === "true" || Boolean(editingLabId),
    open,
    close,
    startEdit,
    editingLab,
    isLoading,
    editingLabId
  };
};