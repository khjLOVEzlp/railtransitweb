import { useSetUrlSearchParam, useUrlQueryParam } from "hook/useUrlQueryParam";
import { useTemDetail } from "./request";

export const useTemModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{ createTem }, setCreateTem] = useUrlQueryParam([
    "createTem"
  ])

  const [{ editingTemId }, setEditingTemId] = useUrlQueryParam([
    "editingTemId",
  ]);

  const { data: editingTem, isLoading } = useTemDetail(
    Number(editingTemId)
  );

  const open = () => setCreateTem({ createTem: true })
  const close = () => setUrlParams({ editingTemId: "", createTem: "" });
  const startEdit = (id: number) =>
    setEditingTemId({ editingTemId: id });

  return {
    ModalOpen: createTem === "true" || Boolean(editingTemId),
    open,
    close,
    startEdit,
    editingTem,
    isLoading,
    editingTemId
  };
};