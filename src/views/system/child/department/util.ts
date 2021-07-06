import {useSetUrlSearchParam, useUrlQueryParam} from "hook/useUrlQueryParam";
import {useDepartmentDetail} from "utils/system/department";

export const useDepartmentModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{createDepartment}, setCreateDepartment] = useUrlQueryParam([
    "createDepartment"
  ])

  const [{editingDepartmentId}, setEditingDepartmentId] = useUrlQueryParam([
    "editingDepartmentId",
  ]);

  const {data: editingDepartment, isLoading} = useDepartmentDetail(
    Number(editingDepartmentId)
  );

  const open = () => setCreateDepartment({createDepartment: true})
  const close = () => setUrlParams({editingDepartmentId: "", createDepartment: ""});
  const startEdit = (id: number) =>
    setEditingDepartmentId({editingDepartmentId: id});

  return {
    ModalOpen: createDepartment === "true" || Boolean(editingDepartmentId),
    open,
    close,
    startEdit,
    editingDepartment,
    isLoading,
    editingDepartmentId
  };
};