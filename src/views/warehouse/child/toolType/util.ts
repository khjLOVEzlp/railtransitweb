import { useSetUrlSearchParam, useUrlQueryParam } from "hook/useUrlQueryParam";
import { useToolTypeDetail, useViewToolDetail, useGetMaterialDetail } from "utils/warehouse/toolType";

/*新增修改弹框*/
export const useToolTypeModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{ createToolType }, setCreateToolType] = useUrlQueryParam([
    "createToolType"
  ])

  const [{ editingToolTypeId }, setEditingToolTypeId] = useUrlQueryParam([
    "editingToolTypeId",
  ]);

  const { data: editingToolType, isLoading } = useToolTypeDetail(
    Number(editingToolTypeId)
  );

  const open = () => setCreateToolType({ createToolType: true })
  const close = () => setUrlParams({ editingToolTypeId: "", createToolType: "" });
  const startEdit = (id: number) =>
    setEditingToolTypeId({ editingToolTypeId: id });

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

/*查看工具抽屉*/

export const useViewTool = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{ viewToolId }, setViewToolId] = useUrlQueryParam([
    "viewToolId"
  ])

  const { data: viewTool, isLoading } = useViewToolDetail(
    Number(viewToolId)
  )

  const close = () => setUrlParams({ viewToolId: "" });
  const startEdit = (id: number) =>
    setViewToolId({ viewToolId: id });

  return {
    ModalOpen: Boolean(viewToolId),
    close,
    viewToolId,
    viewTool,
    startEdit,
    isLoading
  }
}

/*查看工具详情弹框*/
export const useToolModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{ type, warehouseId }, setViewToolId] = useUrlQueryParam([
    "type", "warehouseId"
  ])

  const { data: viewTool, isLoading } = useGetMaterialDetail(
    Number(type), Number(warehouseId)
  )

  const close = () => setUrlParams({ type: "", warehouseId: "" });
  const startEdit = (type: number, warehouseId: number) =>
    setViewToolId({ type, warehouseId });

  return {
    ModalOpen: Boolean(type) && Boolean(warehouseId),
    close,
    viewTool,
    startEdit,
    isLoading
  }
}
