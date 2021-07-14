import {useSetUrlSearchParam, useUrlQueryParam} from "hook/useUrlQueryParam";
import {usePersonDetail} from "utils/person/personManage";

export const usePersonModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{createPerson}, setCreatePerson] = useUrlQueryParam([
    "createPerson"
  ])

  const [{editingPersonId}, setEditingPersonId] = useUrlQueryParam([
    "editingPersonId",
  ]);

  const {data: editingPerson, isLoading, isSuccess} = usePersonDetail(
    Number(editingPersonId)
  );

  const open = () => setCreatePerson({createPerson: true})
  const close = () => setUrlParams({editingPersonId: "", createPerson: ""});
  const startEdit = (id: number) =>
    setEditingPersonId({editingPersonId: id});

  return {
    ModalOpen: createPerson === "true" || Boolean(editingPersonId),
    open,
    close,
    startEdit,
    editingPerson,
    isLoading,
    editingPersonId,
    isSuccess
  };
};

/*导入人员弹框*/

export const useImportModal = () => {
  const setUrlParams = useSetUrlSearchParam()

  const [{importModal}, setImportModal] = useUrlQueryParam([
    "importModal"
  ])

  const open = () => setImportModal({importModal: true})

  const close = () => setUrlParams({importModal: ""})

  return {
    ModalOpen: importModal === 'true',
    open,
    close
  }
}