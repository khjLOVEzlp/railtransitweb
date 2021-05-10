import { Modal, Button } from 'antd';
import { ReactNode, useState } from 'react';

export const MyModal = ({ children, title, isVisible, setIsShow, isWidth, submit }: { children: ReactNode, title: string, isVisible: boolean, setIsShow: (isShow: boolean) => void, isWidth: string, submit: () => void }) => {
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(isVisible)
  const handleOk = () => {
    submit()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setVisible(false)
      setIsShow(false)
    }, 1000)
  }

  const handleCancel = () => {
    setVisible(false)
    setIsShow(false)
  }

  return (
    <Modal
      width={isWidth}
      visible={visible}
      title={title}
      onOk={handleOk}
      onCancel={handleCancel}
      keyboard={false}
      maskClosable={false}
      footer={[
        <Button key="back" onClick={handleCancel}>
          取消
            </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          提交
            </Button>,
      ]}
    >
      {children}
    </Modal>
  )
}
