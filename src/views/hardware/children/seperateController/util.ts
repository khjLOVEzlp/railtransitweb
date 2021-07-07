import {useSetUrlSearchParam, useUrlQueryParam} from "hook/useUrlQueryParam";
import {useSepDetail} from "utils/hardware/sep";

export const useSepModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{createSep}, setCreateSep] = useUrlQueryParam([
    "createSep"
  ])

  const [{editingSepId}, setEditingSepId] = useUrlQueryParam([
    "editingSepId",
  ]);

  const {data: editingSep, isLoading} = useSepDetail(
    Number(editingSepId)
  );

  const open = () => setCreateSep({createSep: true})
  const close = () => setUrlParams({editingSepId: "", createSep: ""});
  const startEdit = (id: number) =>
    setEditingSepId({editingSepId: id});

  return {
    ModalOpen: createSep === "true" || Boolean(editingSepId),
    open,
    close,
    startEdit,
    editingSep,
    isLoading,
    editingSepId
  };
};