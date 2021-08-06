import { useLineList } from "../workCount/request";
import { Form, Modal, Select, Table } from "antd";
import { Column } from "@ant-design/charts";
import {
  useWorkStatistics,
  useWorkModal,
  useWorkStatisticsDetail
} from './request'
import { useState } from "react";
import { Header, Main } from "components/Styled";
import { useStatisticsContext } from "views/statistics";

export const WorkPerson = () => {
  const { data: lineList } = useLineList()
  const [param, setParam] = useState({
    time: "",
    subwayId: ""
  })

  const { open, ModalOpen } = useWorkModal()

  const { data: workStatistics, isSuccess } = useWorkStatistics(param)

  const lineChange = (value: any) => {
    setParam({ ...param, subwayId: value })
  }

  const timeChange = (value: any) => {
    setParam({ ...param, time: value })
  }

  const noData = [
    {
      className: "到岗班别",
      classId: 0
    }
  ]

  const config = {
    data: isSuccess ? workStatistics?.data : noData,
    xField: 'className',
    yField: 'classId',
    maxColumnWidth: 100,
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      className: { alias: '班别' },
      classId: { alias: '数量' },
    },
  };

  return (
    <>
      <Header>
        <Form
          layout={"inline"}
        >
          <Form.Item
            name={"subwayId"}
          >
            <Select
              style={{ width: 120 }}
              placeholder={"地铁路线"}
              showSearch
              onChange={lineChange}
              filterOption={(input, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {
                lineList?.data.map((item: any) => (
                  <Select.Option value={item.id}>{item.name}</Select.Option>
                ))
              }
            </Select>
          </Form.Item>

          <Form.Item
            name={"time"}
          >
            <Select
              placeholder={"时间"}
              style={{ width: 120 }}
              onChange={timeChange}
            >
              <Select.Option value={1}>本日</Select.Option>
              <Select.Option value={2}>本周</Select.Option>
              <Select.Option value={3}>本月</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Header>

      <Main>
        {/*@ts-ignore*/}
        <Column
          {...config}
          onReady={(plot: any) => {
            plot.on('plot:click', (evt: any) => {
              open(param.subwayId, param.time)
            });
          }}
        />
        <WorkPersonModal />
      </Main>
    </>
  )
}

export const WorkPersonModal = () => {
  const { ModalOpen, close } = useWorkModal()
  const { param: modalParam } = useStatisticsContext()
  const [param, setParam] = useState({
    index: 1,
    size: 10,
    subwayId: modalParam.subwayId,
    time: modalParam.time
  })
  const { data: alarmDetail, isLoading } = useWorkStatisticsDetail(param)
  const columns = [
    {
      title: "部门",
      dataIndex: "className"
    },
    {
      title: "姓名",
      dataIndex: "personName"
    },
    {
      title: "到岗人数",
      dataIndex: "isWork"
    }
  ]
  /*const handleTableChange = (p: any, filters: any, sorter: any) => {
    setParam({...param, index: p.current, size: p.pageSize})
  };*/
  return (
    <Modal
      visible={ModalOpen}
      onCancel={close}
      title={"到岗统计"}
      footer={false}
      width={1600}
    >
      <Table
        columns={columns}
        pagination={false}
        dataSource={alarmDetail?.data}
        // pagination={{total: alarmPagination?.count, current: param.index, pageSize: param.size}}
        loading={isLoading}
        // onChange={handleTableChange}
        rowKey={(item: any, index: any) => index}
      />
    </Modal>
  )
}
