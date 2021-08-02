import { useSetUrlSearchParam, useUrlQueryParam } from "hook/useUrlQueryParam";
import { usePlanWorkDetail, useShare } from "./request";

export const usePlanWorkModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{ createPlanWork }, setCreatePlanWork] = useUrlQueryParam([
    "createPlanWork"
  ])

  const [{ editingPlanWorkId }, setEditingPlanWorkId] = useUrlQueryParam([
    "editingPlanWorkId",
  ]);

  const { data: editingPlanWork, isLoading, isSuccess } = usePlanWorkDetail(
    Number(editingPlanWorkId)
  );

  const open = () => setCreatePlanWork({ createPlanWork: true })
  const close = () => setUrlParams({ editingPlanWorkId: "", createPlanWork: "" });
  const startEdit = (id: number) =>
    setEditingPlanWorkId({ editingPlanWorkId: id });

  return {
    ModalOpen: createPlanWork === "true" || Boolean(editingPlanWorkId),
    open,
    close,
    startEdit,
    editingPlanWork,
    isLoading,
    editingPlanWorkId,
    isSuccess
  };
};

/*发布计划弹框*/
export const useShareModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{ publishPlanWorkId }, setPublishPlanWorkId] = useUrlQueryParam([
    "publishPlanWorkId",
  ]);

  const { data: editingPlanWork, isLoading } = useShare(
    Number(publishPlanWorkId)
  );

  const close = () => setUrlParams({ publishPlanWorkId: "" });

  const startEdit = (id: number) =>
    setPublishPlanWorkId({ publishPlanWorkId: id });

  return {
    ModalOpen: Boolean(publishPlanWorkId),
    publishPlanWorkId,
    startEdit,
    close,
    isLoading,
    editingPlanWork
  }
}

/*添加工具弹框*/

export const useAddToolModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{ AddTool }, setAddTool] = useUrlQueryParam([
    "AddTool"
  ])

  const open = () => setAddTool({ AddTool: true })
  const close = () => setUrlParams({ AddTool: "" });

  return {
    ModalOpen: AddTool === "true",
    open,
    close,
  };
}
