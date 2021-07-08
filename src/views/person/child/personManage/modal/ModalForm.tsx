import React, {useCallback, useEffect, useState} from "react";
import {Button, DatePicker, Form, Input, message, Modal, Radio, Select, Space, Spin, TreeSelect, Upload} from "antd";
import locale from 'antd/es/date-picker/locale/zh_CN';
import dayjs from "dayjs";
import {useHttp} from "utils/http";
import {rules} from "utils/verification";
import {useAllRfi} from "utils/hardware/rfi";
import {usePersonModal, useImportModal} from '../util'
import {useAdd, useMod} from 'utils/person/personManage'
import {InboxOutlined} from '@ant-design/icons';
import {useAuth} from "../../../../../context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

const {Option} = Select

export const ModalForm = () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState()
  const client = useHttp()
  const {ModalOpen, editingPersonId, editingPerson, isLoading, close} = usePersonModal()
  const title = editingPerson ? "修改" : "新增"
  const msg = editingPerson ? () => message.success("修改成功") : () => message.success("新增成功")
  const useMutateProject = editingPerson ? useMod : useAdd;
  const {mutateAsync, isLoading: mutateLoading} = useMutateProject();

  useEffect(() => {
    form.setFieldsValue(editingPerson?.data)
  }, [form, editingPerson])

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({...editingPerson, ...value, id: editingPersonId}).then((res) => {
      if (res.code === 200) {
        msg()
        form.resetFields()
        close()
      } else {
        message.error(res.msg)
      }
    })
  }

  const {data} = useAllRfi()

  const getDepartmentList = useCallback(() => {
    client(`department/getAll`).then(res => {
      const fuc = (data: any) => {
        if (data && data.length > 0) {
          data.forEach((item: any) => {
            item.title = item.name
            item.value = item.id
            item.children = fuc(item.departmentList)
          });
        } else {
          data = []
        }
        return data
      }
      setValue(fuc(res.data))
    })


  }, [client])

  useEffect(() => {
    getDepartmentList()
  }, [getDepartmentList])

  const birthday = (obj: any | null, time: string) => {
    form.setFieldsValue({birthday: time})
  }

  const onChange = (value: any) => {
    form.setFieldsValue({departmentId: value})
  };

  const disabledDate = (current: any) => {
    return current && current > dayjs().endOf('day');
  }

  const onOk = () => {
    form.submit();
  };

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
          <Spin size={"large"}/>
        ) : (
          <Form
            form={form}
            onFinish={onFinish}
            labelAlign="right"
            layout={"vertical"}
          >
            <Form.Item
              label="姓名"
              name="name"
              rules={rules}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="性别"
              name="sex"
              rules={rules}
            >
              <Radio.Group>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="身份证号"
              name="identityCard"
              rules={rules}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="联系方式"
              name="phone"
              rules={rules}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="员工卡号"
              name="number"
              rules={rules}
            >
              <Select
                showSearch
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }>
                {data?.data.map((item: any) => <Option value={item.id} key={item.id}>{item.rfid}</Option>)}
              </Select>
            </Form.Item>

            <Form.Item
              label="归属部门"
              name="departmentId"
              rules={rules}
            >
              <TreeSelect
                style={{width: '100%'}}
                treeData={value}
                treeDefaultExpandAll
                onChange={onChange}
              />
            </Form.Item>

            <Form.Item
              label="出生日期"
              name="birthday"
            >
              <Space direction="vertical" style={{width: "30rem"}}>
                <DatePicker disabledDate={disabledDate} locale={locale} onChange={birthday}/>
              </Space>
            </Form.Item>

            <Form.Item
              label="家庭住址"
              name="address"
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="备注"
              name="remark"
            >
              <Input/>
            </Form.Item>
          </Form>
        )
      }
    </Modal>
  );
};

export const ImportModal = () => {
  const {ModalOpen, close} = useImportModal()
  const {user} = useAuth()

  const props = {
    name: 'file',
    action: `${apiUrl}person/import`,
    headers: {
      authorization: `${user?.jwtToken}`,
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name}上传成功`);
        close()
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
  };

  return (
    <Modal
      title={"导入人员"}
      visible={ModalOpen}
      onCancel={close}
      footer={false}
    >
      <Upload.Dragger {...props} maxCount={1}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined/>
        </p>
        <p className="ant-upload-text">点击导入人员</p>
      </Upload.Dragger>
    </Modal>
  )
}