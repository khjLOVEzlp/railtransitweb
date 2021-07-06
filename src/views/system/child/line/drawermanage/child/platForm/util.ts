import {useSetUrlSearchParam, useUrlQueryParam} from "hook/useUrlQueryParam";
import {useLinePlatformDetail} from "utils/system/linePlatform";

export const useLinePlatFormModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{createLinePlatForm}, setCreateLinePlatForm] = useUrlQueryParam([
    "createLinePlatForm"
  ])

  const [{editingLinePlatFormId}, setEditingLinePlatFormId] = useUrlQueryParam([
    "editingLinePlatFormId",
  ]);

  const {data: editingLinePlatForm, isLoading} = useLinePlatformDetail(
    Number(editingLinePlatFormId)
  );

  const open = () => setCreateLinePlatForm({createLinePlatForm: true})
  const close = () => setUrlParams({editingLinePlatFormId: "", createLinePlatForm: ""});
  const startEdit = (id: number) =>
    setEditingLinePlatFormId({editingLinePlatFormId: id});

  return {
    ModalOpen: createLinePlatForm === "true" || Boolean(editingLinePlatFormId),
    open,
    close,
    startEdit,
    editingLinePlatForm,
    isLoading,
    editingLinePlatFormId
  };
};