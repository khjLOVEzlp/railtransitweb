import { useLineList } from "../workCount/request";
import { Form, Modal, Select, Table } from "antd";
import { Pie } from "@ant-design/charts";
import {
  useMindModal,
  useMindStatistics,
  useMindStatisticsDetail
} from './request'
import { useEffect, useState } from "react";
import { Header } from "components/Styled";
import styled from "@emotion/styled";

export const PersonMind = () => {
  const { data: lineList } = useLineList()
  const { open } = useMindModal()
  const [params, setParams] = useState({
    time: "",
    subwayId: ""
  })

  const { data: mindStatistics, isSuccess } = useMindStatistics(params)
  console.log(mindStatistics?.data);

  const lineChange = (value: any) => {
    setParams({ ...params, subwayId: value })
  }

  const timeChange = (value: any) => {
    setParams({ ...params, time: value })
  }

  const noDataB = [
    {
      alcRate: 0,
      className: "酒精异常班别"
    }
  ]

  const noDataC = [
    {
      bloodRate: 0,
      className: "血压异常班别"
    }
  ]

  const noDataA = [
    {
      temRate: 0,
      className: "体温异常班别"
    }
  ]

  const Bconfig = {
    appendPadding: 10,
    data: isSuccess ? mindStatistics?.data : noDataB,
    angleField: 'alcRate',
    colorField: 'className',
    radius: 0.8,
    innerRadius: 0.64,
    label: {
      type: 'inner',
      offset: '-50%',
      // @ts-ignore
      content: ({ percent }) => `${percent * 100}%`,
      style: {
        fill: '#fff',
        fontSize: 14,
        textAlign: 'center',
      },
    },
    statistic: null,
  };

  const Cconfig = {
    appendPadding: 10,
    data: isSuccess ? mindStatistics?.data : noDataC,
    angleField: 'bloodRate',
    colorField: 'className',
    radius: 0.8,
    innerRadius: 0.64,
    label: {
      type: 'inner',
      offset: '-50%',
      // @ts-ignore
      content: ({ percent }) => `${percent * 100}%`,
      style: {
        fill: '#fff',
        fontSize: 14,
        textAlign: 'center',
      },
    },
    statistic: null,
  };

  const Aconfig = {
    appendPadding: 10,
    data: isSuccess ? mindStatistics?.data : noDataA,
    angleField: 'temRate',
    colorField: 'className',
    radius: 0.8,
    innerRadius: 0.64,
    label: {
      type: 'inner',
      offset: '-50%',
      // @ts-ignore
      content: ({ percent }) => `${percent * 100}%`,
      style: {
        fill: '#fff',
        fontSize: 14,
        textAlign: 'center',
      },
    },
    statistic: null,
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
        {/* <Column
          {...config}
          onReady={(plot: any) => {
            plot.on('plot:click', (evt: any) => {
              open()
            });
          }}
        /> */}
        {/*@ts-ignore*/}
        <Pie {...Aconfig} onReady={(plot: any) => {
          plot.on('plot:click', (evt: any) => {
            open(params.subwayId, params.time)
          });
        }} />
        {/*@ts-ignore*/}
        <Pie {...Bconfig} onReady={(plot: any) => {
          plot.on('plot:click', (evt: any) => {
            open(params.subwayId, params.time)
          });
        }} />
        {/*@ts-ignore*/}
        <Pie {...Cconfig} onReady={(plot: any) => {
          plot.on('plot:click', (evt: any) => {
            open(params.subwayId, params.time)
          });
        }} />
        <PersonMindModal params={params} />
      </Main>
    </>
  )
}

const PersonMindModal = ({ params }: { params: { subwayId: string, time: string } }) => {
  const { ModalOpen, close } = useMindModal()

  const [param, setParam] = useState({
    index: 1,
    size: 10,
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

  const { data: mindDetail } = useMindStatisticsDetail(param)

  const columns = [
    {
      title: "姓名",
      dataIndex: "personName"
    },
    {
      title: "班别",
      dataIndex: "className"
    },
    {
      title: "体温异常率",
      dataIndex: "temRate"
    },
    {
      title: "酒精异常率",
      dataIndex: "alcRate"
    },
    {
      title: "血压异常率",
      dataIndex: "bloodRate"
    }
  ]

  return (
    <Modal
      visible={ModalOpen}
      onCancel={close}
      title={"精神状态"}
      footer={false}
      width={1600}
    >
      <Table
        columns={columns}
        pagination={false}
        dataSource={mindDetail?.data}
        rowKey={(item: any, index: any) => index}
      />
    </Modal>
  )
}

const Main = styled.div`
  flex: 8;
  background: #fff;
  border-radius: 1rem;
  padding: 0 1.5rem;
  overflow-y: auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
`