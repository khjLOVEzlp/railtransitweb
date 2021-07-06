import {useSetUrlSearchParam, useUrlQueryParam} from "hook/useUrlQueryParam";
import {useDictItemDetail} from "utils/system/dictItem";

export const useDictItemModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{createDictItem}, setCreateDictItem] = useUrlQueryParam([
    "createDictItem"
  ])

  const [{editingDictItemId}, setEditingDictItemId] = useUrlQueryParam([
    "editingDictItemId",
  ]);

  const {data: editingDictItem, isLoading} = useDictItemDetail(
    Number(editingDictItemId)
  );

  const open = () => setCreateDictItem({createDictItem: true})
  const close = () => setUrlParams({editingDictItemId: "", createDictItem: ""});
  const startEdit = (id: number) =>
    setEditingDictItemId({editingDictItemId: id});

  return {
    ModalOpen: createDictItem === "true" || Boolean(editingDictItemId),
    open,
    close,
    startEdit,
    editingDictItem,
    isLoading,
    editingDictItemId
  };
};