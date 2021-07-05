import { useSetUrlSearchParam, useUrlQueryParam } from "hook/useUrlQueryParam";
import { useDetail } from "utils/system/line";

export const useProjectModal = () => {
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);

  const setUrlParams = useSetUrlSearchParam();
  const { data: editingProject, isLoading } = useDetail(
    Number(editingProjectId)
  );
  const close = () => setUrlParams({ editingProjectId: "" });
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    ModalOpen: Boolean(editingProjectId),
    close,
    startEdit,
    editingProject,
    isLoading,
    editingProjectId
  };
};
