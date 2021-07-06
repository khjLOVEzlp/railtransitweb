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

  const {data: editingPerson, isLoading} = usePersonDetail(
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
    editingPersonId
  };
};