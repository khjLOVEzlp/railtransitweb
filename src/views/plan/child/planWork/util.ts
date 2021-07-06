import {useSetUrlSearchParam, useUrlQueryParam} from "hook/useUrlQueryParam";
import {usePlanWorkDetail} from "utils/plan/planWork";

export const usePlanWorkModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{createPlanWork}, setCreatePlanWork] = useUrlQueryParam([
    "createPlanWork"
  ])

  const [{editingPlanWorkId}, setEditingPlanWorkId] = useUrlQueryParam([
    "editingPlanWorkId",
  ]);

  const {data: editingPlanWork, isLoading} = usePlanWorkDetail(
    Number(editingPlanWorkId)
  );

  const open = () => setCreatePlanWork({createPlanWork: true})
  const close = () => setUrlParams({editingPlanWorkId: "", createPlanWork: ""});
  const startEdit = (id: number) =>
    setEditingPlanWorkId({editingPlanWorkId: id});

  return {
    ModalOpen: createPlanWork === "true" || Boolean(editingPlanWorkId),
    open,
    close,
    startEdit,
    editingPlanWork,
    isLoading,
    editingPlanWorkId
  };
};

/*发布计划弹框*/
export const useShareModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{publishPlanWorkId}, setPublishPlanWorkId] = useUrlQueryParam([
    "publishPlanWorkId",
  ]);

  const close = () => setUrlParams({publishPlanWorkId: ""});

  const startEdit = (id: number) =>
    setPublishPlanWorkId({publishPlanWorkId: id});

  return {
    ModalOpen: Boolean(publishPlanWorkId),
    publishPlanWorkId,
    startEdit,
    close
  }
}
