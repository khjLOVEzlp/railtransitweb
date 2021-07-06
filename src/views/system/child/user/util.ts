import {useSetUrlSearchParam, useUrlQueryParam} from "hook/useUrlQueryParam";
import {useUserDetail} from "utils/system/user";

export const useUserModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{createUser}, setCreateUser] = useUrlQueryParam([
    "createUser"
  ])

  const [{editingUserId}, setEditingUserId] = useUrlQueryParam([
    "editingUserId",
  ]);

  const {data: editingUser, isLoading} = useUserDetail(
    Number(editingUserId)
  );

  const open = () => setCreateUser({createUser: true})
  const close = () => setUrlParams({editingUserId: "", createUser: ""});
  const startEdit = (id: number) =>
    setEditingUserId({editingUserId: id});

  return {
    ModalOpen: createUser === "true" || Boolean(editingUserId),
    open,
    close,
    startEdit,
    editingUser,
    isLoading,
    editingUserId
  };
};