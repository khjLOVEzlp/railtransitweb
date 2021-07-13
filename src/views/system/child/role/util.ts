import {useSetUrlSearchParam, useUrlQueryParam} from "hook/useUrlQueryParam";
import {useRoleDetail} from "utils/system/role";

export const useRoleModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{createRole}, setCreateRole] = useUrlQueryParam([
    "createRole"
  ])

  const [{editingRoleId}, setEditingRoleId] = useUrlQueryParam([
    "editingRoleId",
  ]);

  const {data: editingRole, isLoading, isSuccess} = useRoleDetail(
    Number(editingRoleId)
  );

  const open = () => setCreateRole({createRole: true})
  const close = () => setUrlParams({editingRoleId: "", createRole: ""});

  const startEdit = (id: number) =>
    setEditingRoleId({editingRoleId: id});

  return {
    ModalOpen: createRole === "true" || Boolean(editingRoleId),
    open,
    close,
    startEdit,
    editingRole,
    isLoading,
    editingRoleId,
    isSuccess
  };
};