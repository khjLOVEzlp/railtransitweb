import { Col, Modal, Row, Spin, Table, Tabs, Space, Card, Upload, Image, Button, Divider, Tag, List } from "antd";
import { useState } from "react";
import { Type } from "views/home/request";
import { useHistoryModal } from '../util'
const { TabPane } = Tabs;

export const ModalForm = () => {
  const { ModalOpen, planHistory, close, isLoading } = useHistoryModal()
  const [visible, setVisible] = useState(false);
  const [bodyStyle, setBodyStyle] = useState({ width: "100%", height: "400px", overflow: "auto" })
  function callback(key: string) {
    console.log(key);
  }

  const props = {
    defaultFileList: planHistory?.data.documentList
  };

  const dataList = [
    {
      groupName: "养护小组1",
      leaderName: "张三",
      remark: "养护小组1作业",
      personList: [
        {
          personName: "张三"
        },
        {
          personName: "李四"
        },
        {
          personName: "王五"
        },
        {
          personName: "马六"
        },
      ],
      planToolList: [
        {
          name: "铁锤",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
      ],
      planMaterialList: [
        {
          name: "铁锤",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
      ],
      groupToolList: [
        {
          name: "铁锤",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
        {
          name: "榔头",
          num: 5
        },
      ],
      groupMaterialList: [
        {
          name: "铁锤",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
        {
          name: "榔头",
          num: 5
        },
      ],
      legacyToolList: [
        {
          name: "铁锤",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
        {
          name: "榔头",
          num: 5
        },
      ],
      photoList: [
        {
          img: "../../../../../icon/login.png"
        }
      ]
    },
    {
      groupName: "养护小组2",
      leaderName: "李四",
      remark: "养护小组2作业",
      personList: [
        {
          personName: "张三"
        },
        {
          personName: "李四"
        },
        {
          personName: "王五"
        },
        {
          personName: "马六"
        },
      ],
      planToolList: [
        {
          name: "铁锤",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
      ],
      planMaterialList: [
        {
          name: "铁锤",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
      ],
      groupToolList: [
        {
          name: "铁锤",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
        {
          name: "榔头",
          num: 5
        },
      ],
      groupMaterialList: [
        {
          name: "铁锤",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
        {
          name: "榔头",
          num: 5
        },
      ],
      legacyToolList: [
        {
          name: "铁锤",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
        {
          name: "榔头",
          num: 5
        },
      ],
      photoList: [
        {
          img: "../../../../../icon/login.png"
        }
      ]
    },
    {
      groupName: "养护小组4",
      leaderName: "马六",
      remark: "养护小组4作业",
      personList: [
        {
          personName: "张三"
        },
        {
          personName: "李四"
        },
        {
          personName: "王五"
        },
        {
          personName: "马六"
        },
      ],
      planToolList: [
        {
          name: "铁锤",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
      ],
      planMaterialList: [
        {
          name: "铁锤",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
      ],
      groupToolList: [
        {
          name: "铁锤",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
        {
          name: "榔头",
          num: 5
        },
      ],
      groupMaterialList: [
        {
          name: "铁锤",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
        {
          name: "榔头",
          num: 5
        },
      ],
      legacyToolList: [
        {
          name: "铁锤",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
        {
          name: "榔头",
          num: 5
        },
      ],
      photoList: [
        {
          img: "../../../../../icon/login.png"
        }
      ]
    },
    {
      groupName: "养护小组3",
      leaderName: "王五",
      remark: "养护小组3作业",
      personList: [
        {
          personName: "张三"
        },
        {
          personName: "李四"
        },
        {
          personName: "王五"
        },
        {
          personName: "马六"
        },
      ],
      planToolList: [
        {
          name: "铁锤",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
      ],
      planMaterialList: [
        {
          name: "铁锤",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
      ],
      groupToolList: [
        {
          name: "铁锤",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
        {
          name: "榔头",
          num: 5
        },
      ],
      groupMaterialList: [
        {
          name: "铁锤",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
        {
          name: "榔头",
          num: 5
        },
      ],
      legacyToolList: [
        {
          name: "铁锤",
          num: 5
        },
        {
          name: "扳手",
          num: 5
        },
        {
          name: "榔头",
          num: 5
        },
      ],
      photoList: [
        {
          img: "../../../../../icon/login.png"
        },
        {
          img: "../../../../../icon/login.png"
        },
        {
          img: "../../../../../icon/login.png"
        },
      ]
    },
  ]

  const status = (id: number) => {
    switch (id) {
      case 0:
        return <Tag color="processing">无状态</Tag>
      case 1:
        return <Tag color="success" >已完成</Tag>
      case 2:
        return <Tag color="error">未完成</Tag>
      default:
        break
    }
  }

  return (
    <Modal
      title={"作业历史"}
      width={1200}
      visible={ModalOpen}
      onCancel={close}
      footer={null}>
      {
        isLoading ? (
          <Spin size={"large"} />
        ) : (
          <Row>
            <Col style={mb} span={8}>计划名称：{planHistory?.data.name}</Col>
            <Col span={8}>作业部门：{planHistory?.data.departmentName}</Col>

            <Col style={mb} span={8}>施工负责人：{planHistory?.data.leaderName}</Col>
            <Col span={8}>线路：{planHistory?.data.lineName}</Col>

            <Col style={mb} span={8}>作业区域：{planHistory?.data.workAddr}</Col>
            <Col span={8}>请站点：{planHistory?.data.pleaseName}</Col>

            <Col style={mb} span={8}>销站点：{planHistory?.data.pinName}</Col>
            <Col span={8}>作业类型：{planHistory?.data.workAddr}</Col>

            <Col style={mb} span={8}>开始时间：{planHistory?.data.beginTime}</Col>
            <Col span={8}>结束时间：{planHistory?.data.endTime}</Col>

            <Col style={mb} span={8}>提醒时间：{planHistory?.data.warnTime || "无"}</Col>
            <Col span={8}>作业日期：{planHistory?.data.dateTime || "无"}</Col>

            <Col style={mb} span={8}>是否自动提醒：{planHistory?.data.isWarn === 0 ? "否" : "是"}</Col>
            <Col span={8}>作业人数：{planHistory?.data.workPerson || "无"}</Col>

            <Col style={mb} span={8}>作业内容：{planHistory?.data.workContent || "无"}</Col>
            <Col span={8}>计划令号：{planHistory?.data.num || "无"}</Col>

            <Col style={mb} span={8}>
              文档：
              <Upload {...props} style={{ width: "100%" }}>
              </Upload>
            </Col>
            <Col style={mb} span={8}>备注：{planHistory?.data.remark || "无"}</Col>

            <Tabs defaultActiveKey="1" onChange={callback} style={{ width: "100%" }}>
              <TabPane tab="养护小组" key="1" style={{ height: "100vh", overflowY: "auto" }}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  {
                    dataList.map((item: any) => (
                      <Card title={<Tag color="#2db7f5">{item.groupName}</Tag>} extra={<><Tag color="geekblue">小组成员</Tag>{item.personList.map((key: any) => (<span>{key.personName}，</span>))}</>} style={{ width: "100%" }}>
                        <Space direction="horizontal" style={{ width: "100%" }}>
                          <Card
                            title={"计划需要的工具"}
                            bodyStyle={bodyStyle}
                          >
                            {
                              item.planToolList.map((key: any) => (
                                <p style={{ display: "flex", justifyContent: "space-between" }}>
                                  <span>{key.name}</span>
                                  <span>{key.num}</span>
                                </p>
                              ))
                            }
                          </Card>

                          <Card
                            title={"计划需要的物料"}
                            bodyStyle={bodyStyle}
                          >
                            {
                              item.planMaterialList.map((key: any) => (
                                <p style={{ display: "flex", justifyContent: "space-between" }}>
                                  <span>{key.name}</span>
                                  <span>{key.num}</span>
                                </p>
                              ))
                            }
                          </Card>

                          <Card
                            title={"领用归还的工具"}
                            bodyStyle={bodyStyle}
                          >
                            {
                              item.groupToolList.map((key: any) => (
                                <p style={{ display: "flex", justifyContent: "space-between" }}>
                                  <span>{key.name}</span>
                                  <span>{key.num}</span>
                                </p>))
                            }
                          </Card>

                          <Card
                            title={"领用归还的未绑定标签"}
                            bodyStyle={bodyStyle}
                          >
                            {
                              item.groupMaterialList.map((key: any) => (
                                <p style={{ display: "flex", justifyContent: "space-between" }}>
                                  <span>{key.name}</span>
                                  <span>{key.num}</span>
                                </p>))
                            }
                          </Card>

                          <Card
                            title={"拾取的工具材料"}
                            bodyStyle={bodyStyle}
                          >
                            {
                              item.legacyToolList.map((key: any) => (
                                <p style={{ display: "flex", justifyContent: "space-between" }}>
                                  <span>{key.name}</span>
                                  <span>{key.num}</span>
                                </p>))
                            }
                          </Card>

                          <Card
                            title={"清点归还拍照"}
                            bodyStyle={bodyStyle}
                          >
                            <div onClick={() => setVisible(true)}>
                              <Image preview={false} src={"../../../../../icon/a.png"} alt="" />
                            </div>
                          </Card>
                        </Space>
                      </Card>
                    ))
                  }
                </Space>
              </TabPane>
              <TabPane tab="签到人员" key="2">
                <Table
                  pagination={false}
                  columns={[
                    {
                      title: "签到人员",
                      dataIndex: "personName"
                    },
                    {
                      title: "签到时间",
                      dataIndex: "createTime"
                    }
                  ]}
                  dataSource={planHistory?.data.registrationList}
                  rowKey={(item: any) => item.id}
                />
              </TabPane>

              <TabPane tab="告警记录" key="3">
                <Table
                  pagination={false}
                  columns={[
                    {
                      title: "告警类型",
                      render: (item: any) => <>{Type(item.type)}</>
                    },
                    {
                      title: "小组名称",
                      dataIndex: "groupName"
                    },
                    {
                      title: "时间",
                      dataIndex: "warnTime"
                    },
                    {
                      title: "告警内容",
                      dataIndex: "content"
                    }
                  ]}
                  dataSource={planHistory?.data.warnList}
                  rowKey={(item: any) => item.id}
                />
              </TabPane>

              <TabPane tab="工场清单及签字图片" key="4">
                <List>
                  <List.Item>
                    {
                      status(planHistory?.data.signature.stepA)
                    }
                    所有参与人员提前一小时到达车站
                  </List.Item>
                  <List.Item>
                    {
                      status(planHistory?.data.signature.stepB)
                    }
                    作业分工
                  </List.Item>
                  <List.Item>
                    {
                      status(planHistory?.data.signature.stepC)
                    }
                    开展安全交底
                  </List.Item>
                  <List.Item>
                    {
                      status(planHistory?.data.signature.stepD)
                    }
                    所有参与作业人员进行安全交底确认签字
                  </List.Item>
                  <List.Item>
                    {
                      status(planHistory?.data.signature.stepE)
                    }
                    安全交底信息及影像反馈
                  </List.Item>
                  <List.Item>
                    {
                      status(planHistory?.data.signature.stepF)
                    }
                    工器具及材料清点人清点材料工具并进行登记、签名
                  </List.Item>
                  <List.Item>
                    {
                      status(planHistory?.data.signature.stepG)
                    }
                    工器具及材料确认人复核清点材料工具并签名
                  </List.Item>
                  <List.Item>
                    {
                      status(planHistory?.data.signature.stepH)
                    }
                    工器具及材料清点信息及影像反馈
                  </List.Item>
                  <List.Item>
                    {
                      status(planHistory?.data.signature.stepI)
                    }
                    设置工器具及材料摆放点
                  </List.Item>
                  <List.Item>
                    {
                      status(planHistory?.data.signature.stepJ)
                    }
                    确认作业过程中是否有新增发现的材料、工器具、遗留物等情况
                  </List.Item>
                  <List.Item>
                    {
                      status(planHistory?.data.signature.stepK)
                    }
                    提前半小时进行出清
                  </List.Item>
                  <List.Item>
                    {
                      status(planHistory?.data.signature.stepL)
                    }
                    检查作业覆盖区域
                  </List.Item>
                  <List.Item>
                    {
                      status(planHistory?.data.signature.stepM)
                    }
                    位于撤离队伍后方进行最后检查把关
                  </List.Item>
                  <List.Item>
                    {
                      status(planHistory?.data.signature.stepN)
                    }
                    是否有原属于轨行区物件需出清到轨行区外，确保在清点清单中登记确认
                  </List.Item>
                  <List.Item>
                    {
                      status(planHistory?.data.signature.stepO)
                    }
                    工器具及材料清点人清点出清工具及材料、签名
                  </List.Item>
                  <List.Item>
                    {
                      status(planHistory?.data.signature.stepP)
                    }
                    工器具及材料清点人复核清点材料工器具出清情况并签名
                  </List.Item>
                  <List.Item>
                    {
                      status(planHistory?.data.signature.stepQ)
                    }
                    工器具及材料清点信息及影像反馈
                  </List.Item>

                </List>
                <Space direction="horizontal" style={{ width: "100%" }}>
                  <Card title={"施工负责人电子签名"} bodyStyle={bodyStyle}>
                    <Image src={`http://192.168.2.182:8088/file/perview/${planHistory?.data.signature.leaderSignature}`} />
                  </Card>
                  <Card title={"施工负责人签字"} bodyStyle={bodyStyle}>
                    <Image src={`http://192.168.2.182:8088/file/perview/${planHistory?.data.signature.leaderName}`} />
                  </Card>
                  <Card title={"安全员点子签名"} bodyStyle={bodyStyle}>
                    <Image src={`http://192.168.2.182:8088/file/perview/${planHistory?.data.signature.safeSignature}`} />
                  </Card>
                  <Card title={"安全员签名"} bodyStyle={bodyStyle}>
                    <Image src={`http://192.168.2.182:8088/file/perview/${planHistory?.data.signature.safeName}`} />
                  </Card>
                  <Card title={"清点人电子签名"} bodyStyle={bodyStyle}>
                    <Image src={`http://192.168.2.182:8088/file/perview/${planHistory?.data.signature.countSignature}`} />
                  </Card>
                </Space>
                <Space>
                  <Card title={"清点人签字"} bodyStyle={bodyStyle}>
                    <Image src={`http://192.168.2.182:8088/file/perview/${planHistory?.data.signature.countName}`} />
                  </Card>
                  <Card title={"出清负责人电子签名"} bodyStyle={bodyStyle}>
                    <Image src={`http://192.168.2.182:8088/file/perview/${planHistory?.data.signature.clearSignature}`} />
                  </Card>
                  <Card title={"出清负责人签字"} bodyStyle={bodyStyle}>
                    <Image src={`http://192.168.2.182:8088/file/perview/${planHistory?.data.signature.clearName}`} />
                  </Card>
                  <Card title={"确认人电子签名"} bodyStyle={bodyStyle}>
                    <Image src={`http://192.168.2.182:8088/file/perview/${planHistory?.data.signature.confirmSignature}`} />
                  </Card>
                </Space>
              </TabPane>
            </Tabs>
          </Row>
        )
      }

      <Modal
        title={"清点归还图片"}
        width={1200}
        visible={visible}
        footer={false}
        onCancel={() => setVisible(false)}
      >
        <Image.PreviewGroup>
          <Image width={100} src="icon/a77868e405d1bd47c3bf099e5b35bca.png" />
          <Image width={100} src="../../../../../icon/1a33a92c887583ccc7b1b4d5c910e93.png" />
          <Image width={100} src="../../../../../icon/248b0aa6840b18efe025302b2cfdadc.png" />
          <Image width={100} src="../../../../../icon/3a7840e35bd263d321587a914af11f3.png" />
          <Image width={100} src="../../../../../icon/84b2b1b535507f98870768aaace02bc.png" />
          <Image width={100} src="../../../../../icon/944e8dbf0e738c21eac0ef05ee61359.png" />
          <Image width={100} src="../../../../../icon/94b6ce20639502d88d8e921ba705efa.png" />
          <Image width={100} src="../../../../../icon/9c525f7b5af3c0c2755b20b394d07cb.png" />
          <Image width={100} src="../../../../../icon/a77868e405d1bd47c3bf099e5b35bca.png" />
          <Image width={100} src="../../../../../icon/b0a4ef9edbe3c4de2c1bc90a86ea531.png" />

        </Image.PreviewGroup>
      </Modal>
    </Modal>
  )
}

const mb = { marginBottom: "1rem" }
