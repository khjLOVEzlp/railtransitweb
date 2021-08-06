import { useLineList } from "../workCount/request";
import { Form, Modal, Select, Table } from "antd";
import { Column, Pie } from "@ant-design/charts";
import {
  useMindModal,
  useMindStatistics,
  useMindStatisticsDetail
} from './request'
import { useState } from "react";
import { Header, Main } from "components/Styled";
import { useStatisticsContext } from "views/statistics";

export const PersonMind = () => {
  const { data: lineList } = useLineList()
  const { open } = useMindModal()
  const [param, setParam] = useState({
    time: "",
    subwayId: ""
  })

  const { data: mindStatistics, isSuccess } = useMindStatistics(param)
  console.log(mindStatistics);

  const lineChange = (value: any) => {
    setParam({ ...param, subwayId: value })
  }

  const timeChange = (value: any) => {
    setParam({ ...param, time: value })
  }

  /* const config = {
    data: data,
    xField: "className",
    yField: "value",
    seriesField: "type",
    maxColumnWidth: 100,
    isGroup: "true",
    columnStyle: {
      radius: [20, 20, 0, 0]
    }
  }; */

  const noDataA = [
    {
      temRate: 0,
      className: "体温异常班别"
    }
  ]

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
        <Pie {...Aconfig} />
        {/*@ts-ignore*/}
        <Pie {...Bconfig} />
        {/*@ts-ignore*/}
        <Pie {...Cconfig} />
        <PersonMindModal />
      </Main>
    </>
  )
}

const PersonMindModal = () => {
  const { ModalOpen, close } = useMindModal()
  const { param: modalParam } = useStatisticsContext()
  const [param, setParam] = useState({
    index: 1,
    size: 10,
    subwayId: modalParam.subwayId,
    time: modalParam.time
  })
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
        rowKey={(item: any, index: any) => index}
      />
    </Modal>
  )
}

