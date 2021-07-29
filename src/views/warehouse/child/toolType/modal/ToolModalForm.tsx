import { Button, DatePicker, Form, Input, message, Modal, Spin } from "antd"
import locale from 'antd/es/date-picker/locale/zh_CN';
import { useForm } from "antd/lib/form/Form";
import { useToolModal } from '../util'
import React, { useEffect } from "react";
import moment from "moment";

export const ToolModalForm = () => {
  const [form] = useForm()
  const { ModalOpen, close, isLoading, viewTool } = useToolModal()

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onOk = () => {
    form.submit();
  };

  return (
    <>
      <Modal
        title="详情"
        width={800}
        onOk={onOk}
        visible={ModalOpen}
        onCancel={closeModal}
        style={{ zIndex: 10000 }}
        footer={false}
      >
        {
          isLoading ? (
            <Spin />
          ) : (
            viewTool?.data.map((item: any) => (
              <div key={item.id} style={{ marginBottom: "1rem" }}>
                <div>标签：{item.labelNum ? item.labelNum : "无"}</div>
                <div>使用状态：{item.useStatus === 0 ? "未使用" : "使用中"}</div>
                <div>失效状态：{item.status === 0 ? "正常" : "快过期"}</div>
                <div>失效时间：{item.invalidTimemoment ? (item.invalidTime).format("YYYY-MM-DD HH:mm:ss") : "无"}</div>
              </div>
            ))
          )
        }
      </Modal>
    </>
  )
}