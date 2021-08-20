/**
 * 管理项目新增修改弹框的状态
 */

import { createContext, ReactNode, useContext, useState } from "react";

const ModalContext = createContext<
  {
    visible: boolean
    setVisible: (visible: boolean) => void
    editId: number | undefined
    setEditId: (editId: number | undefined) => void
  } | undefined
>(undefined)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [editId, setEditId] = useState<number | undefined>(undefined)
  return (
    <ModalContext.Provider value={{ visible, setVisible, editId, setEditId }} children={children} />
  )
}

export const useModalContext = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw Error("useModalContext必须在ModalProvider组件中使用")
  }
  return context
}