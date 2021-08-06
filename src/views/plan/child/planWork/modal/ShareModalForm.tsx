import { Button, Col, Form, message, Modal, Row, Select, Spin } from "antd";
import { rules } from "utils/verification";
import { useUserAll } from "views/system/child/user/request";
import { useSharePlan } from '../request'
import { useShareModal } from '../util'

const { Option } = Select

export const ShareModalForm = () => {
  const [form] = Form.useForm();
  const { ModalOpen, close, editId, isLoading, editingPlanWork } = useShareModal()
  const { mutateAsync, isLoading: mutaLoading } = useSharePlan()
  const { data: personList } = useUserAll()
  console.log(editingPlanWork?.data);

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

  const isStatus = (id: number) => {
    if (id === 2) {
      return "驳回"
    } else if (id === 1) {
      return "通过"
    } else {
      return "未反馈"
    }
  }

  return (
    <Modal
      title={"发布计划"}
      width={800}
      visible={ModalOpen}
      onOk={onOk}
      onCancel={closeModal}
      footer={[
        <Button key="back" onClick={closeModal}>取消</Button>,
        <Button key="submit" type="primary" onClick={onOk} loading={mutaLoading}>提交</Button>
      ]}
    >
      {
        isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
              <span style={{ fontWeight: 700, fontSize: "2rem" }}>已发布：</span>
              <Button type={"primary"}>取消计划</Button>
            </div>
            {editingPlanWork?.data["已发布"].length === 0 ? (
              <div>没有已发布计划</div>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {
                  editingPlanWork?.data["已发布"].map((key: any) => <div style={{ marginBottom: "2rem", width: "50%" }}>
                    <div>
                      接收人： {key?.userName || "无"}
                    </div>
                    <div>
                      发布者： {key?.shareUserName || "无"}
                    </div>
                    <div>
                      是否通过： {key?.isPass === 0 ? "未反馈" : key?.isPass === 1 ? "通过" : "驳回" || "无"}
                    </div>
                    <div>
                      备注： {key?.remark || "无"}
                    </div>
                    <div>
                      发布时间： {key?.createTime || "无"}
                    </div>
                  </div>
                  )
                }
              </div>
            )
            }

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
              <span style={{ fontWeight: 700, fontSize: "2rem" }}>已取消：</span>
            </div>
            {
              editingPlanWork?.data["已取消"].length === 0 ? (
                <div>没有已取消计划</div>
              ) : (
                editingPlanWork?.data["已取消"].map((key: any) => <div style={{ marginBottom: "2rem", display: "flex" }}>
                  <div style={{ width: "50%" }}>
                    <div>
                      接收人： {key?.userName || "无"}
                    </div>
                    <div>
                      发布者： {key?.shareUserName || "无"}
                    </div>
                    <div>
                      是否通过： {key?.isPass === 0 ? "未反馈" : key?.isPass === 1 ? "通过" : "驳回" || "无"}
                    </div>
                    <div>
                      备注： {key?.remark || "无"}
                    </div>
                    <div>
                      发布时间： {key?.createTime || "无"}
                    </div>
                  </div>
                </div>
                )
              )
            }
          </>
        )
      }

      <div style={{ marginTop: "2rem", fontWeight: 700, fontSize: "2rem" }}>
        发布计划：
      </div>
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
      </Form>
    </Modal>
  )
}
