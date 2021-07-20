import React, {useEffect} from "react";
import {Button, DatePicker, Form, Input, message, Modal, Radio, Spin, TreeSelect, Upload} from "antd";
import locale from 'antd/es/date-picker/locale/zh_CN';
import {rules} from "utils/verification";
import {usePersonModal, useImportModal} from '../util'
import {useAdd, useMod} from 'utils/person/personManage'
import {InboxOutlined} from '@ant-design/icons';
import {useAuth} from "../../../../../context/auth-context";
import {useSetUrlSearchParam} from "hook/useUrlQueryParam";
import {useInit} from 'utils/system/department'
import moment from "moment";

const apiUrl = process.env.REACT_APP_API_URL;

export const ModalForm = () => {
  const [form] = Form.useForm();
  const setUrlParams = useSetUrlSearchParam();

  const {ModalOpen, editingPersonId, editingPerson, isLoading, close, isSuccess} = usePersonModal()
  const title = editingPerson ? "修改" : "新增"
  const msg = editingPerson ? () => {
    message.success("修改成功")
    close()
  } : () => {
    message.success("新增成功")
    close()
    setUrlParams({index: 1, createPerson: ""})
  }
  const useMutateProject = editingPerson ? useMod : useAdd;
  const {mutateAsync, isLoading: mutateLoading} = useMutateProject();

  useEffect(() => {
    if (isSuccess && editingPerson) {
      form.setFieldsValue({
        ...editingPerson?.data,
        birthday: editingPerson?.data?.birthday === null ? "" : moment(editingPerson?.data?.birthday)
      })
    }
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
      } else {
        message.error(res.msg)
      }
    })
  }

  const {data: departmentList} = useInit()

  const onChange = (value: any) => {
    form.setFieldsValue({departmentId: value})
  };

  const disabledDate = (current: any) => {
    return current && current > moment().endOf('day');
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
              rules={[
                {
                  required: true, message: "请输入身份证号"
                },
                {
                  pattern: new RegExp(/(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/),
                  message: "请输入正确的身份证"
                }
              ]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="联系方式"
              name="phone"
              rules={[
                {
                  required: true, message: "请输入联系方式"
                },
                {
                  pattern: new RegExp(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/),
                  message: "请输入正确的联系方式"
                }
              ]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              label="员工卡号"
              name="number"
              rules={rules}
            >
              {/*<Select
                showSearch
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }>
                {data?.data.map((item: any) => <Option value={item.rfid} key={item.id}>{item.rfid}</Option>)}
              </Select>*/}
              <Input/>
            </Form.Item>

            <Form.Item
              label="归属部门"
              name="departmentId"
              rules={rules}
            >
              <TreeSelect
                getPopupContainer={triggerNode => triggerNode.parentElement}
                style={{width: '100%'}}
                treeData={departmentList?.data}
                treeDefaultExpandAll
                onChange={onChange}
              />
            </Form.Item>

            <Form.Item
              label="出生日期"
              name="birthday"
            >
              <DatePicker disabledDate={disabledDate} locale={locale}/>
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
        return (
          <Spin size={"large"}/>
        )
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