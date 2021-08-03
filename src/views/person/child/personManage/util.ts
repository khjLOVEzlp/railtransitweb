import { useAuth } from "context/auth-context";
import { useSetUrlSearchParam, useUrlQueryParam } from "hook/useUrlQueryParam";
import { usePersonDetail } from "./request";

export const usePersonModal = () => {
  const { visible, setVisible, editId, setEditId } = useAuth()

  const { data: editingPerson, isLoading, isSuccess } = usePersonDetail(
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
    editingPerson,
    isLoading,
    editId,
    isSuccess
  };
};

/*导入人员弹框*/

export const useImportModal = () => {
  const setUrlParams = useSetUrlSearchParam()

  const [{ importModal }, setImportModal] = useUrlQueryParam([
    "importModal"
  ])

  const open = () => setImportModal({ importModal: true })

  const close = () => setUrlParams({ importModal: "" })

  return {
    ModalOpen: importModal === 'true',
    open,
    close
  }
}