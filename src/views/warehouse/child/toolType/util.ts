import {useSetUrlSearchParam, useUrlQueryParam} from "hook/useUrlQueryParam";
import {useToolTypeDetail} from "utils/warehouse/toolType";

export const useToolTypeModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{createToolType}, setCreateToolType] = useUrlQueryParam([
    "createToolType"
  ])

  const [{editingToolTypeId}, setEditingToolTypeId] = useUrlQueryParam([
    "editingToolTypeId",
  ]);

  const {data: editingToolType, isLoading} = useToolTypeDetail(
    Number(editingToolTypeId)
  );

  const open = () => setCreateToolType({createToolType: true})
  const close = () => setUrlParams({editingToolTypeId: "", createToolType: ""});
  const startEdit = (id: number) =>
    setEditingToolTypeId({editingToolTypeId: id});

  return {
    ModalOpen: createToolType === "true" || Boolean(editingToolTypeId),
    open,
    close,
    startEdit,
    editingToolType,
    isLoading,
    editingToolTypeId
  };
};
