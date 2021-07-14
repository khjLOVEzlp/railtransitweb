import {Button, Form, Input, message, Modal, Select, Space, Spin} from "antd";
import 'moment/locale/zh-cn';
import {rules} from "utils/verification";
import TextArea from "antd/lib/input/TextArea";
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {usePlanTypeModal} from '../util'
import {useAdd, useMod} from "utils/plan/planType";
import {useEffect} from "react";
import {useMaterialType} from 'utils/warehouse/materialType'
import {useSetUrlSearchParam} from "hook/useUrlQueryParam";

const {Option} = Select;

export const ModalForm = () => {
  const [form] = Form.useForm();
  const setUrlParams = useSetUrlSearchParam();

  const {ModalOpen, close, isLoading, editingPlanType, editingPlanTypeId} = usePlanTypeModal()
  const title = editingPlanType ? "修改" : "新增"
  const msg = editingPlanType ? () => {
    message.success("修改成功")
    close()
  } : () => {
    message.success("新增成功")
    close()
    setUrlParams({index: 1, createPlanType: ""})
  }
  const useMutateProject = editingPlanType ? useMod : useAdd;
  const {mutateAsync, isLoading: mutateLoading} = useMutateProject();
  const {data: material} = useMaterialType()

  useEffect(() => {
    form.setFieldsValue(editingPlanType?.data)
  }, [form, editingPlanType])

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({...editingPlanType, ...value, id: editingPlanTypeId}).then(() => {
      msg()
      form.resetFields()
    })
  }

  const materialListChange = (value: any) => {

  }

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal
      title={title}
      width={800}
      maskClosable={false}
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
            autoComplete="off"
            onFinish={onFinish}
            form={form}
            labelAlign="right"
            layout={"vertical"}
          >
            <Form.Item
              label="作业类型"
              name="type"
              rules={rules}
            >
              <Input/>
            </Form.Item>

            <Form.List name="materialList">
              {(fields, {add, remove}) => (
                <>
                  {fields.map(({key, name, fieldKey, ...restField}) => (
                    <Space key={key} style={{display: 'flex', marginBottom: 8}} align="baseline">
                      <Form.Item
                        style={{width: '100%'}}
                        {...restField}
                        name={[name, 'materialId']}
                        fieldKey={[fieldKey, 'materialId']}
                        rules={rules}
                      >
                        <Select
                          onChange={materialListChange}
                        >
                          {
                            material?.data.map((item: any) => <Option value={item.id}
                                                                      key={item.id}>{item.name}</Option>)
                          }
                        </Select>
                      </Form.Item>
                      <Form.Item
                        style={{width: '100%'}}
                        {...restField}
                        name={[name, 'num']}
                        fieldKey={[fieldKey, 'num']}
                        rules={rules}

                      >
                        <Input placeholder="数量"/>
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)}/>
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                      添加物料
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.List name="toolList">
              {(fields, {add, remove}) => (
                <>
                  {fields.map(({key, name, fieldKey, ...restField}) => (
                    <Space key={key} style={{display: 'flex', marginBottom: 8, width: '100%'}} align="baseline">
                      <Form.Item
                        style={{width: '100%'}}
                        {...restField}
                        name={[name, 'toolId']}
                        fieldKey={[fieldKey, 'toolId']}
                        rules={rules}
                      >
                        <Select
                          onChange={materialListChange}
                        >
                          {
                            material?.data.map((item: any) => <Option value={item.id}
                                                                      key={item.id}>{item.name}</Option>)
                          }
                        </Select>
                      </Form.Item>
                      <Form.Item
                        style={{width: '100%'}}
                        {...restField}
                        name={[name, 'num']}
                        fieldKey={[fieldKey, 'num']}
                        rules={rules}

                      >
                        <Input placeholder="数量"/>
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)}/>
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                      添加工具
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item
              label="备注"
              name="remark"
            >
              <TextArea rows={1}/>
            </Form.Item>
          </Form>
        )
      }
    </Modal>
  );
};