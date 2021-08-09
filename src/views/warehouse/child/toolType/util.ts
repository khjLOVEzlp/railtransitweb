import { useAuth } from "context/auth-context";
import { useWareHouseContext } from "views/warehouse";
import { useToolTypeDetail, useViewToolDetail, useGetMaterialDetail } from "./request";

/*新增修改弹框*/
export const useToolTypeModal = () => {
  const { visible, setVisible, editId, setEditId } = useAuth()

  const { data: editingToolType, isLoading, isSuccess } = useToolTypeDetail(
    Number(editId)
  );

  const open = () => {
    setEditId(undefined)
    setVisible(true)
  }
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
    editId,
    isSuccess
  };
};

/*查看工具抽屉*/

export const useViewTool = () => {
  const { drawer, setDrawer, editId, setEditId } = useAuth()

  const { data: viewTool, isLoading } = useViewToolDetail(
    Number(editId)
  )

  const close = () => {
    setEditId(undefined)
    setDrawer(false)
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
  const { editId, setEditId } = useWareHouseContext()
  const { editId: type, setEditId: setType } = useAuth()

  const { data: viewTool, isLoading } = useGetMaterialDetail(
    Number(type), Number(editId)
  )

  const close = () => setEditId(undefined)
  const startEdit = (type: number | undefined, editId: number) => {
    setType(type)
    setEditId(editId)

  }

  return {
    ModalOpen: Boolean(type) && Boolean(editId),
    close,
    viewTool,
    startEdit,
    isLoading
  }
}
