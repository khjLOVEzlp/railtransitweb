import { useAuth } from "context/auth-context";
import { useState } from "react";
import { usePlanContext } from "views/plan";
import { usePlanWorkDetail, useShare } from "./request";

export const usePlanWorkModal = () => {
  const { visible, setVisible, editId, setEditId } = useAuth()

  const { data: editingPlanWork, isLoading, isSuccess } = usePlanWorkDetail(
    Number(editId)
  );

  const open = () => setVisible(true)
  const close = () => {
    setEditId(undefined)
    setVisible(false)
  }
  const startEdit = (id: number) => {
    console.log(id);

    setEditId(id)
  }

  return {
    ModalOpen: visible === true || Boolean(editId),
    open,
    close,
    startEdit,
    editingPlanWork,
    isLoading,
    editId,
    isSuccess
  };
};

/*发布计划弹框*/
export const useShareModal = () => {
  const { editId, setEditId } = usePlanContext()

  const { data: editingPlanWork, isLoading } = useShare(
    Number(editId)
  );

  const close = () => {
    setEditId(undefined)
  }

  const startEdit = (id: number) => {
    setEditId(id)
  }

  return {
    ModalOpen: Boolean(editId),
    editId,
    startEdit,
    close,
    isLoading,
    editingPlanWork
  }
}

export const useAddToolModal = () => {
  const { visible, setVisible, detailVisible, setDetailVisible } = usePlanContext()
  const open = () => setVisible(true)
  const close = () => {
    setDetailVisible(false)
    setVisible(false)
  }
  const startEdit = (item: any) => {
    setDetailVisible(true)
    sessionStorage.setItem("group", JSON.stringify(item))
  }

  return {
    ModalOpen: visible === true || detailVisible === true,
    open,
    close,
    startEdit
  };
}