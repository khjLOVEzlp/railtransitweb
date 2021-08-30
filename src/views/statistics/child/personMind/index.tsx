import { useLineList } from "../workCount/request";
import { Form, Modal, Select, Table } from "antd";
import * as echarts from 'echarts';
import {
  useMindModal,
  useMindStatistics,
  useMindStatisticsDetail
} from './request'
import { useEffect, useState } from "react";
import { Header } from "components/Styled";
import styled from "@emotion/styled";

export const PersonMind = () => {
  const { data: lineList, isSuccess: success } = useLineList()
  const [form] = Form.useForm()
  const { open } = useMindModal()
  const [params, setParams] = useState({
    time: "",
    subwayId: "",
  })

  const [type, setType] = useState<string>("")

  useEffect(() => {
    if (success && lineList.data && lineList.data.length > 0) {
      setParams({ time: "3", subwayId: lineList.data[0].id })
    }
  }, [success, lineList?.data])

  useEffect(() => {
    if (success && lineList.data && lineList.data.length > 0) {
      form.setFieldsValue({ subwayId: lineList.data[0].id })
    }
  }, [success, form, lineList?.data])

  const { data: mindStatistics, isSuccess } = useMindStatistics(params)

  const lineChange = (value: any) => {
    setParams({ ...params, subwayId: value })
  }

  const timeChange = (value: any) => {
    setParams({ ...params, time: value })
  }

  const newList = [
    {
      className: "班别名称",
      "体温异常率": "0",
      "血压异常率": "0",
      "酒精异常率": "0",
    },
  ];

  const newData = isSuccess && mindStatistics?.data && mindStatistics?.data.length > 0 ? mindStatistics?.data : newList

  const option = {
    legend: {},
    tooltip: {},
    grid: {
      x: 50,
      y: 50,
      x2: 50,
      y2: 50,
    },
    dataset: {
      dimensions: ['className', '体温异常率', '酒精异常率', '血压异常率'],
      source: newData
    },
    xAxis: { type: 'category' },
    yAxis: {},
    series: [
      { type: 'bar', barWidth: 50 },
      { type: 'bar', barWidth: 50 },
      { type: 'bar', barWidth: 50 }
    ]
  };

  useEffect(() => {
    const Echarts = echarts.init(document.getElementById('mind') as HTMLElement)
    Echarts.setOption(option)
    Echarts.on('click', (param: any) => {
      open(params.subwayId, params.time)
      setType(param.seriesName)
    })

    window.addEventListener('resize', () => {
      if (Echarts != null) {
        Echarts.resize()
      }
    })
  }, [option])

  return (
    <>
      <Header>
        <Form
          layout={"inline"}
          form={form}
        >
          <Form.Item
            name={"subwayId"}
          >
            <Select
              style={{ width: 120 }}
              placeholder={"地铁路线"}
              onChange={lineChange}
              showSearch
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
            initialValue={"3"}
          >
            <Select
              placeholder={"时间"}
              style={{ width: 120 }}
              onChange={timeChange}
            >
              <Select.Option value={"1"}>本日</Select.Option>
              <Select.Option value={"2"}>本周</Select.Option>
              <Select.Option value={"3"}>本月</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Header>

      <Main>
        <div id={"mind"} style={{ height: "100%", width: "100%" }}></div>
      </Main>
      <PersonMindModal params={params} type={type} />
    </>
  )
}

const PersonMindModal = ({ params, type }: { params: { subwayId: string, time: string }, type: string }) => {
  const { ModalOpen, close } = useMindModal()

  const [param, setParam] = useState({
    index: 1,
    size: 10,
    subwayId: "",
    time: ""
  })

  const title = type

  useEffect(() => {
    setParam({
      ...param,
      subwayId: params.subwayId,
      time: params.time
    })
  }, [params])

  const { data: mindDetail } = useMindStatisticsDetail(param)

  const dataSource = title === "体温异常率" ? mindDetail?.data?.temPerson : title === "酒精异常率" ? mindDetail?.data?.alcPerson : title === "血压异常率" ? mindDetail?.data?.bloodPerson : []

  const columns = [
    {
      title: "姓名",
      dataIndex: "personName"
    },
    {
      title: "班别",
      dataIndex: "className"
    },
  ]

  return (
    <Modal
      visible={ModalOpen}
      onCancel={close}
      title={title}
      footer={false}
      width={1600}
    >
      <Table
        columns={columns}
        pagination={false}
        dataSource={dataSource}
        rowKey={(item: any, index: any) => index}
      />
    </Modal>
  )
}

const Main = styled.div`
  flex: 8;
  background: #fff;
  border-radius: 1rem;
  padding: 0 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`