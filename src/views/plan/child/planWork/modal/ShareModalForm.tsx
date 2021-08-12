import { Button, Card, Divider, Form, message, Modal, Select, Space, Spin, Tag } from "antd";
import { rules } from "utils/verification";
import { useUserAll } from "views/system/child/user/request";
import { useSharePlan, useCancelSharePlan } from '../request'
import { useShareModal } from '../util'
import {
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons'

const { Option } = Select

export const ShareModalForm = () => {
  const [form] = Form.useForm();
  const { mutateAsync: muta } = useCancelSharePlan()
  const { ModalOpen, close, editId, isLoading, editingPlanWork } = useShareModal()
  const { mutateAsync, isLoading: mutaLoading } = useSharePlan()
  const { data: personList } = useUserAll()

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const onFinish = (value: any) => {
    mutateAsync({ ...value, planId: editId }).then(() => {
      message.success("发布成功")
      form.resetFields()
      close()
    })
  }

  const onOk = () => {
    form.submit();
  };


  const cancel = () => {
    muta(editId).then(() => {
      message.success("取消成功")
    })
  }

  const confirmDeleteProject = (id: number | undefined) => {
    Modal.confirm({
      title: "确定取消计划吗?",
      content: "点击确定取消",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        muta(id).then(() => {
          message.success("取消成功")
        })
      },
    });
  };

  return (
    <Modal
      title={"发布计划"}
      width={800}
      visible={ModalOpen}
      onOk={onOk}
      onCancel={closeModal}
      footer={false}
    >
      {
        isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <Space direction={"horizontal"} style={{ width: "100%", alignItems: "start" }}>
              <Card title={<Tag icon={<CheckCircleOutlined />} color="success">已发布</Tag>} bodyStyle={{ width: "100%", height: "500px", overflowY: "auto" }}>
                {
                  editingPlanWork?.data["已发布"].length === 0 ? (
                    <p>没有已发布计划</p>
                  ) : (
                    editingPlanWork?.data["已发布"].map((key: any) => (
                      <div>
                        <p>接收人： {key?.userName || "无"}</p>
                        <p>发布者： {key?.shareUserName || "无"}</p>
                        <p>是否通过： {key?.isPass === 0 ? "未反馈" : key?.isPass === 1 ? "通过" : "驳回" || "无"}</p>
                        <p>备注： {key?.remark || "无"}</p>
                        <p>发布时间： {key?.createTime || "无"}</p>
                        <Divider />
                      </div>
                    ))
                  )
                }
              </Card>

              <Card title={<Tag icon={<CloseCircleOutlined />} color="error">已取消</Tag>} bodyStyle={{ width: "100%", height: "500px", overflowY: "auto" }}>
                {
                  editingPlanWork?.data["已取消"].length === 0 ? (
                    <p>没有已取消计划</p>
                  ) : (
                    editingPlanWork?.data["已取消"].map((key: any) => (
                      <div>
                        <p>接收人： {key?.userName || "无"}</p>
                        <p>发布者： {key?.shareUserName || "无"}</p>
                        <p>是否通过： {key?.isPass === 0 ? "未反馈" : key?.isPass === 1 ? "通过" : "驳回" || "无"}</p>
                        <p>备注： {key?.remark || "无"}</p>
                        <p>发布时间： {key?.createTime || "无"}</p>
                        <Divider />
                      </div>
                    ))
                  )
                }
              </Card>
            </Space>
          </>
        )
      }

      <Space direction={"horizontal"} style={{ width: "100%" }}>
        <Card title={<Tag icon={<CheckCircleOutlined />} color="processing">发布计划</Tag>} style={{ width: "100%" }}>
          <Form
            form={form}
            onFinish={onFinish}
            labelAlign="right"
            layout={"vertical"}
            style={{ marginTop: "2rem" }}
          >
            <Form.Item
              label="人员"
              name="users"
              rules={rules}
            >
              <Select allowClear mode="multiple">
                {personList?.data.map((item: any, index: number) => <Option value={item.id}
                  key={index}>{item.name}</Option>)}
              </Select>
            </Form.Item>

            <Form.Item style={{ textAlign: "right" }}>
              <Button style={{ marginRight: "1rem" }} onClick={() => confirmDeleteProject(editId)}>取消计划</Button>
              <Button key="submit" type="primary" onClick={onOk} loading={mutaLoading}>提交</Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </Modal>
  )
}
