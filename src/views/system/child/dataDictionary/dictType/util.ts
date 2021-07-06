import {useSetUrlSearchParam, useUrlQueryParam} from "hook/useUrlQueryParam";
import {useDictTypeDetail} from "utils/system/dictType";

export const useDictTypeModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{createDictType}, setCreateDictType] = useUrlQueryParam([
    "createDictType"
  ])

  const [{editingDictTypeId}, setEditingDictTypeId] = useUrlQueryParam([
    "editingDictTypeId",
  ]);

  const {data: editingDictType, isLoading} = useDictTypeDetail(
    Number(editingDictTypeId)
  );

  const open = () => setCreateDictType({createDictType: true})
  const close = () => setUrlParams({editingDictTypeId: "", createDictType: ""});
  const startEdit = (id: number) =>
    setEditingDictTypeId({editingDictTypeId: id});

  return {
    ModalOpen: createDictType === "true" || Boolean(editingDictTypeId),
    open,
    close,
    startEdit,
    editingDictType,
    isLoading,
    editingDictTypeId
  };
};