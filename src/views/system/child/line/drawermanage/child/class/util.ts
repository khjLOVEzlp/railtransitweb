import {useSetUrlSearchParam, useUrlQueryParam} from "hook/useUrlQueryParam";
import {useLineClassDetail} from "utils/system/lineClass";

export const useLineClassModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{createLineClass}, setCreateLineClass] = useUrlQueryParam([
    "createLineClass"
  ])

  const [{editingLineClassId}, setEditingLineClassId] = useUrlQueryParam([
    "editingLineClassId",
  ]);

  const {data: editingLineClass, isLoading} = useLineClassDetail(
    Number(editingLineClassId)
  );

  const open = () => setCreateLineClass({createLineClass: true})
  const close = () => setUrlParams({editingLineClassId: "", createLineClass: ""});
  const startEdit = (id: number) =>
    setEditingLineClassId({editingLineClassId: id});

  return {
    ModalOpen: createLineClass === "true" || Boolean(editingLineClassId),
    open,
    close,
    startEdit,
    editingLineClass,
    isLoading,
    editingLineClassId
  };
};