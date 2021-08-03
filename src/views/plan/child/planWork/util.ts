import { useAuth } from "context/auth-context";
import { useSetUrlSearchParam, useUrlQueryParam } from "hook/useUrlQueryParam";
import { usePlanWorkDetail, useShare } from "./request";

export const usePlanWorkModal = () => {
  const { visible, setVisible, editId, setEditId } = useAuth()

  const { data: editingPlanWork, isLoading, isSuccess } = usePlanWorkDetail(
    Number(editId)
  );

  const open = () => setVisible(true)
  const close = () => {
    setEditId(undefined)
    setVisible(false)
  }
  const startEdit = (id: number) =>
    setEditId(id)

  return {
    ModalOpen: visible === true || Boolean(editId),
    open,
    close,
    startEdit,
    editingPlanWork,
    isLoading,
    editId,
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
