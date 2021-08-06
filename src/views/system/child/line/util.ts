import { useAuth } from "context/auth-context";
import { useLineDetail } from "./request";

/*抽屉*/
export const useProjectModal = () => {
  const { drawer, setDrawer, editId, setEditId } = useAuth()
  const { data: editingProject, isLoading } = useLineDetail(
    Number(editId)
  );
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
    startEdit,
    editingProject,
    isLoading,
    editId
  };
};

/*地铁弹框*/

export const useLineModal = () => {
  const { visible, setVisible, editId, setEditId } = useAuth()

  const { data: editingLine, isLoading } = useLineDetail(
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
    editingLine,
    isLoading,
    editId,
  };
};