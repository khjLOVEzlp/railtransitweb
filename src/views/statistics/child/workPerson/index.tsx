import { useLineList } from "../workCount/request";
import { Form, Modal, Select, Table } from "antd";
import { Column } from "@ant-design/charts";
import {
  useWorkStatistics,
  useWorkModal,
  useWorkStatisticsDetail
} from './request'
import { useEffect, useState } from "react";
import { Header, Main } from "components/Styled";

export const WorkPerson = () => {
  const { data: lineList } = useLineList()
  const [params, setParams] = useState({
    time: "",
    subwayId: ""
  })

  const { open } = useWorkModal()

  const { data: workStatistics, isSuccess } = useWorkStatistics(params)

  const lineChange = (value: any) => {
    setParams({ ...params, subwayId: value })
  }

  const timeChange = (value: any) => {
    setParams({ ...params, time: value })
  }

  const noData = [
    {
      className: "到岗班别",
      classId: 0
    },
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
      classId: { alias: '人数' },
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
              open(params.subwayId, params.time)
            });
          }}
        />
        <WorkPersonModal params={params} />
      </Main>
    </>
  )
}

export const WorkPersonModal = ({ params }: { params: { subwayId: string, time: string } }) => {
  const { ModalOpen, close } = useWorkModal()
  const [param, setParam] = useState({
    subwayId: "",
    time: ""
  })

  useEffect(() => {
    setParam({
      ...param,
      subwayId: params.subwayId,
      time: params.time
    })
  }, [params])

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
