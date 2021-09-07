import { Button, Checkbox, Form, Input, message, Modal, Radio, Select, Spin, Tag, Upload } from "antd";
import { useAuth } from "context/auth-context";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { rules } from "utils/verification";
import { useWarehouse } from "views/warehouse/child/toolType/request";
import { useAdd, useImportModal, useMod } from './request'
import { useLabModal } from './util'
import { InboxOutlined } from '@ant-design/icons';
const apiUrl = process.env.REACT_APP_API_URL;
type Props = {
  param: {
    index: number
    size: number
    name: string
  }
  setParam: (param: Props["param"]) => void
}

export const ModalForm = ({ param, setParam }: Props) => {
  const [form] = Form.useForm();
  const [checked, setChecked] = useState(['2.4G'])
  const { ModalOpen, isLoading, close, editingLab, editId } = useLabModal()
  const title = editingLab ? "修改" : "新增"
  const msg = editingLab ? () => {
    message.success("修改成功")
  } : () => {
    message.success("新增成功")
    setParam({ ...param, index: 1 })
  }
  const useMutateProject = editingLab ? useMod : useAdd;
  const { mutateAsync, isLoading: mutateLoading } = useMutateProject();

  useEffect(() => {
    form.setFieldsValue(editingLab?.data)
  }, [form, editingLab])

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({ ...editingLab?.data, ...value, id: editId }).then((res) => {
      form.resetFields()
      closeModal()
      msg()
    }).catch(err => {
      message.error(err.msg)
    })
  }

  const { data: warehouse } = useWarehouse()

  const onOk = () => {
    form.submit();
  };

  function onChange(checkedValues: any) {
    setChecked(checkedValues)
  }

  const plainOptions = ['915M', '2.4G'];

  return (
    <Modal
      title={title}
      width={800}
      visible={ModalOpen}
      onOk={onOk}
      onCancel={closeModal}
      footer={[
        <Button key="back" onClick={closeModal}>取消</Button>,
        <Button key="submit" type="primary" onClick={onOk} loading={mutateLoading}>提交</Button>
      ]}
    >
      {
        isLoading ? (
          <Spin />
        ) : (
          <Form
            form={form}
            onFinish={onFinish}
            labelAlign="right"
            layout={"vertical"}
          >
            <Form.Item
              label="编码类型"
              name="type"
              initialValue={['2.4G']}
              rules={rules}
            >
              <Checkbox.Group options={plainOptions} defaultValue={checked} onChange={onChange} />
            </Form.Item>

            {
              checked.find((key: any) => key === '2.4G') && <Form.Item
                label="2.4G编码"
                name="codeHex10"
                rules={rules}
              >
                <Input />
              </Form.Item>
            }

            {
              checked.find((key: any) => key === '915M') && <Form.Item
                label="915编码"
                name="codeHex915"
                rules={rules}
              >
                <Input />
              </Form.Item>
            }

            <Form.Item
              label="归属仓库"
              name="warehouseId"
              rules={rules}
            >
              <Select
                showSearch
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {warehouse?.data.map((item: any) => <Select.Option value={item.id}
                  key={item.id}>{item.name}</Select.Option>)}
              </Select>
            </Form.Item>

            <Form.Item
              label="是否使用"
              name="isUse"
              initialValue={"1"}
            >
              <Radio.Group>
                <Radio value={"1"}>否</Radio>
                <Radio value={"0"}>是</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        )
      }
    </Modal>
  );
};


export const ImportModal = () => {
  const { ModalOpen, close } = useImportModal()
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const props = {
    name: 'file',
    action: `${apiUrl}hardware/label/import`,
    headers: {
      authorization: `${user?.jwtToken}`,
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
      }

      if (info.file.status === 'done' && info.file.response?.code === 200) {
        message.success(`${info.file.name}上传成功`);
        queryClient.invalidateQueries('label')
        close()
      } else if (info.file.status === 'error' || info.file.response?.code != 200) {
        if (info?.file?.response?.msg) {
          message.error(info?.file?.response?.msg)
        }
      }
    },
  };

  return (
    <Modal
      title={"导入标签"}
      visible={ModalOpen}
      onCancel={close}
      footer={false}
      destroyOnClose={true}
    >
      <Upload.Dragger {...props} maxCount={1}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击导入标签</p>
      </Upload.Dragger>
      <Tag style={{ marginTop: "10px" }} color="processing">请上传 xls 或者 xlsx 格式文件</Tag>
    </Modal>
  )
}