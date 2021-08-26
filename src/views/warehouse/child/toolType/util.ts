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
  const { drawerId, setDrawerId } = useWareHouseContext()

  const { data: viewTool, isLoading } = useViewToolDetail(
    Number(drawerId)
  )

  const close = () => {
    setDrawerId(undefined)
  }

  const startEdit = (id: number) => {
    setDrawerId(id)
  }

  return {
    ModalOpen: Boolean(drawerId),
    close,
    drawerId,
    viewTool,
    startEdit,
    isLoading
  }
}

/*查看工具详情弹框*/
export const useToolModal = () => {
  const { drawerId, setDrawerId, editId, setEditId } = useWareHouseContext()

  const { data: viewTool, isLoading } = useGetMaterialDetail(
    Number(drawerId), Number(editId)
  )

  const close = () => setEditId(undefined)
  const startEdit = (drawerId: number | undefined, editId: number | undefined) => {
    setDrawerId(drawerId)
    setEditId(editId)
  }

  console.log(drawerId, editId);


  return {
    ModalOpen: Boolean(drawerId) && Boolean(editId),
    close,
    viewTool,
    startEdit,
    isLoading
  }
}
