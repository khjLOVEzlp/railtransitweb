import {useSetUrlSearchParam, useUrlQueryParam} from "hook/useUrlQueryParam";
import {useMaterialDetail} from "utils/warehouse/materialType";

export const useMaterialModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{createMaterial}, setCreateMaterial] = useUrlQueryParam([
    "createMaterial"
  ])

  const [{editingMaterialId}, setEditingMaterialId] = useUrlQueryParam([
    "editingMaterialId",
  ]);

  const {data: editingMaterial, isLoading} = useMaterialDetail(
    Number(editingMaterialId)
  );

  const open = () => setCreateMaterial({createMaterial: true})
  const close = () => setUrlParams({editingMaterialId: "", createMaterial: ""});
  const startEdit = (id: number) =>
    setEditingMaterialId({editingMaterialId: id});

  return {
    ModalOpen: createMaterial === "true" || Boolean(editingMaterialId),
    open,
    close,
    startEdit,
    editingMaterial,
    isLoading,
    editingMaterialId
  };
};
