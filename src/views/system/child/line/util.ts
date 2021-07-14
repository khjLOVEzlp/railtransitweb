import { useSetUrlSearchParam, useUrlQueryParam } from "hook/useUrlQueryParam";
import { useLineDetail } from "utils/system/line";

/*抽屉*/
export const useProjectModal = () => {
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);

  const setUrlParams = useSetUrlSearchParam();
  const { data: editingProject, isLoading } = useLineDetail(
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

/*地铁弹框*/

export const useLineModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{createLine}, setCreateLine] = useUrlQueryParam([
    "createLine"
  ])

  const [{editingLineId}, setEditingLineId] = useUrlQueryParam([
    "editingLineId",
  ]);

  const {data: editingLine, isLoading} = useLineDetail(
    Number(editingLineId)
  );

  const open = () => setCreateLine({createLine: true})
  const close = () => setUrlParams({editingLineId: "", createLine: ""});
  const startEdit = (id: number) =>
    setEditingLineId({editingLineId: id});

  return {
    ModalOpen: createLine === "true" || Boolean(editingLineId),
    open,
    close,
    startEdit,
    editingLine,
    isLoading,
    editingLineId,
  };
};