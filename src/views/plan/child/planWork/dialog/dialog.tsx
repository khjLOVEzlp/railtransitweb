import { Form, Input, message } from "antd"
import React from "react"
import { MyModal } from "../../../../../components/MyModal"
import { useMount } from "../../../../../hook";
import { useHttp } from "../../../../../utils/http";
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

export const Dialog = ({ setIsShow, formType, formData }: { setIsShow: (isShow: boolean) => void, formType: string, formData: object }) => {
  const [form] = Form.useForm();
  const client = useHttp()
  const submit = async () => {
    form.submit()
  }

  const onFinish = (values: any) => {
    let url
    if (formType === '新增') {
      url = 'plan/save'
    } else {
      url = 'plan/update'
    }

    client(url, { method: "POST", body: JSON.stringify(values) }).then(() => {
      message.success(`${formType}成功`)
    })
  };

  return (
    <MyModal title={formType} isWidth={"100rem"} isVisible={true} setIsShow={setIsShow} submit={submit}>
      <Form
        onFinish={onFinish}
        form={form}
        labelAlign="right"
        {...layout}
        initialValues={formData}
      >
        <Form.Item
          label="开始时间"
          name="beginTime"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="作业日期"
          name="dateTime"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="作业单位"
          name="departmentId"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="文档id集合"
          name="documentList"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="结束时间"
          name="endTime"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="是否自动提醒"
          name="isWarn"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="施工负责人职责"
          name="leaderDuty"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="施工负责人"
          name="leaderPerson"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="线路id"
          name="lineId"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="物料列表id集合"
          name="materialList"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="计划名称"
          name="name"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="计划令号"
          name="num"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="作业人员id列"
          name="personList"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="销站点"
          name="pinStand"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="请站点"
          name="pleaseStand"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="防疫专员职责"
          name="preventionDuty"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="防疫专员"
          name="preventionPerson"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="备注"
          name="remark"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="安全员职责"
          name="safeDuty"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="安全员"
          name="safePerson"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="工具列表id集合"
          name="toolList"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="作业类型"
          name="type"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="提醒时间"
          name="warnTime"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="作业区间"
          name="workAddr"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="作业计划工作量"
          name="workContent"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="作业人数"
          name="workPerson"
        >
          <Input />
        </Form.Item>
      </Form>
    </MyModal>
  )
}