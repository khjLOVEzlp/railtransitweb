import { useAuth } from "context/auth-context";
import { useSetUrlSearchParam, useUrlQueryParam } from "hook/useUrlQueryParam";
import { useToolTypeDetail, useViewToolDetail, useGetMaterialDetail } from "utils/warehouse/toolType";

/*新增修改弹框*/
export const useToolTypeModal = () => {
  const { visible, setVisible, editId, setEditId } = useAuth()

  const { data: editingToolType, isLoading } = useToolTypeDetail(
    Number(editId)
  );

  const open = () => setVisible(true)
  const close = () => {
    setEditId(undefined)
    setVisible(false)
  }
  const startEdit = (id: number) => {
    setEditId(id)
    setVisible(true)
  }

  return {
    ModalOpen: visible === true,
    open,
    close,
    startEdit,
    editingToolType,
    isLoading,
    editId
  };
};

/*查看工具抽屉*/

export const useViewTool = () => {
  const { drawer, setDrawer, editId, setEditId } = useAuth()

  const { data: viewTool, isLoading } = useViewToolDetail(
    Number(editId)
  )

  const close = () => {
    setDrawer(false)
    setEditId(undefined)
  }

  const startEdit = (id: number) => {
    setDrawer(true)
    setEditId(id)
  }

  return {
    ModalOpen: drawer === true,
    close,
    editId,
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
