import { useSetUrlSearchParam, useUrlQueryParam } from "hook/useUrlQueryParam";
import { usePlanTypeDetail } from "./request";

export const usePlanTypeModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{ createPlanType }, setCreatePlanType] = useUrlQueryParam([
    "createPlanType"
  ])

  const [{ editingPlanTypeId }, setEditingPlanTypeId] = useUrlQueryParam([
    "editingPlanTypeId",
  ]);

  const { data: editingPlanType, isLoading } = usePlanTypeDetail(
    Number(editingPlanTypeId)
  );

  const open = () => setCreatePlanType({ createPlanType: true })
  const close = () => setUrlParams({ editingPlanTypeId: "", createPlanType: "" });
  const startEdit = (id: number) =>
    setEditingPlanTypeId({ editingPlanTypeId: id });

  return {
    ModalOpen: createPlanType === "true" || Boolean(editingPlanTypeId),
    open,
    close,
    startEdit,
    editingPlanType,
    isLoading,
    editingPlanTypeId
  };
};