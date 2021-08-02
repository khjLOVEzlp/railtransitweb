import { useSetUrlSearchParam, useUrlQueryParam } from "hook/useUrlQueryParam";
import { useHistoryDetail } from './request'

export const useHistoryModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{ planId }, setPlanId] = useUrlQueryParam([
    "planId",
  ]);

  const { data: planHistory, isLoading } = useHistoryDetail(
    Number(planId)
  )

  const close = () => setUrlParams({ planId: "" });

  const startEdit = (id: number) =>
    setPlanId({ planId: id });

  return {
    ModalOpen: Boolean(planId),
    planId,
    startEdit,
    close,
    planHistory,
    isLoading
  }
}