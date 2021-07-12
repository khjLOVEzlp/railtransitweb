import {useSetUrlSearchParam, useUrlQueryParam} from "hook/useUrlQueryParam";
import {useToolTypeDetail, useViewToolDetail} from "utils/warehouse/toolType";

export const useToolTypeModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{createToolType}, setCreateToolType] = useUrlQueryParam([
    "createToolType"
  ])

  const [{editingToolTypeId}, setEditingToolTypeId] = useUrlQueryParam([
    "editingToolTypeId",
  ]);

  const {data: editingToolType, isLoading} = useToolTypeDetail(
    Number(editingToolTypeId)
  );

  const open = () => setCreateToolType({createToolType: true})
  const close = () => setUrlParams({editingToolTypeId: "", createToolType: ""});
  const startEdit = (id: number) =>
    setEditingToolTypeId({editingToolTypeId: id});

  return {
    ModalOpen: createToolType === "true" || Boolean(editingToolTypeId),
    open,
    close,
    startEdit,
    editingToolType,
    isLoading,
    editingToolTypeId
  };
};

/*查看工具*/

export const useViewTool = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{viewToolId}, setViewToolId] = useUrlQueryParam([
    "viewToolId"
  ])

  const {data: viewTool, isLoading} = useViewToolDetail(
    Number(viewToolId)
  )

  const close = () => setUrlParams({viewToolId: ""});
  const startEdit = (id: number) =>
    setViewToolId({viewToolId: id});

  return {
    ModalOpen: Boolean(viewToolId),
    close,
    viewToolId,
    viewTool,
    startEdit,
    isLoading
  }
}

export const useToolModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{viewToolId}, setViewToolId] = useUrlQueryParam([
    "viewToolId"
  ])

  const {data: viewTool, isLoading} = useViewToolDetail(
    Number(viewToolId)
  )

  const close = () => setUrlParams({viewToolId: ""});
  const startEdit = (id: number) =>
    setViewToolId({viewToolId: id});

  return {
    ModalOpen: Boolean(viewToolId),
    close,
    viewToolId,
    viewTool,
    startEdit,
    isLoading
  }
}