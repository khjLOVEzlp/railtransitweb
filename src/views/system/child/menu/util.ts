import { useSetUrlSearchParam, useUrlQueryParam } from "hook/useUrlQueryParam";
import { useMenuDetail } from "./request";

export const useMenuModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{ createMenu }, setCreateMenu] = useUrlQueryParam([
    "createMenu"
  ])

  const [{ editingMenuId }, setEditingMenuId] = useUrlQueryParam([
    "editingMenuId",
  ]);

  const { data: editingMenu, isLoading } = useMenuDetail(
    Number(editingMenuId)
  );

  const open = () => setCreateMenu({ createMenu: true })
  const close = () => setUrlParams({ editingMenuId: "", createMenu: "" });
  const startEdit = (id: number) =>
    setEditingMenuId({ editingMenuId: id });

  return {
    ModalOpen: createMenu === "true" || Boolean(editingMenuId),
    open,
    close,
    startEdit,
    editingMenu,
    isLoading,
    editingMenuId
  };
};