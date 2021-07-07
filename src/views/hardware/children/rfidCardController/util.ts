import {useSetUrlSearchParam, useUrlQueryParam} from "hook/useUrlQueryParam";
import {useRfiDetail} from "utils/hardware/rfi";

export const useRfiModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{createRfi}, setCreateRfi] = useUrlQueryParam([
    "createRfi"
  ])

  const [{editingRfiId}, setEditingRfiId] = useUrlQueryParam([
    "editingRfiId",
  ]);

  const {data: editingRfi, isLoading} = useRfiDetail(
    Number(editingRfiId)
  );

  const open = () => setCreateRfi({createRfi: true})
  const close = () => setUrlParams({editingRfiId: "", createRfi: ""});
  const startEdit = (id: number) =>
    setEditingRfiId({editingRfiId: id});

  return {
    ModalOpen: createRfi === "true" || Boolean(editingRfiId),
    open,
    close,
    startEdit,
    editingRfi,
    isLoading,
    editingRfiId
  };
};