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
  }, [])

  useEffect(() => {
    if (success && lineList.data && lineList.data.length > 0) {
      form.setFieldsValue({ subwayId: lineList.data[0].id })
    }
  }, [success])

  const { data: mindStatistics, isSuccess } = useMindStatistics(params)

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
        {/*@ts-ignore*/}
        {/* <Column
          {...config}
          onReady={(plot: any) => {
            plot.on('plot:click', (evt: any) => {
              open()
            });
          }}
        /> */}


        <div>
          {/*@ts-ignore*/}
          <Pie {...Aconfig} onReady={(plot: any) => {
            plot.on('plot:click', (evt: any) => {
              open(params.subwayId, params.time)
              setType("体温异常")
            });
          }} />
        </div>

        <div>
          {/*@ts-ignore*/}
          <Pie {...Bconfig} onReady={(plot: any) => {
            plot.on('plot:click', (evt: any) => {
              open(params.subwayId, params.time)
              setType("酒精异常")
            });
          }} />
        </div>

        <div>
          {/*@ts-ignore*/}
          <Pie {...Cconfig} onReady={(plot: any) => {
            plot.on('plot:click', (evt: any) => {
              open(params.subwayId, params.time)
              setType("血压异常")
            });
          }} />
        </div>
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

  console.log(mindDetail?.data);

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
      title: `${title === "体温异常" ? "体温异常率" : title === "血压异常" ? "血压异常率" : title === "酒精异常" ? "酒精异常率" : ""}`,
      dataIndex: `${title === "体温异常" ? "temRate" : title === "血压异常" ? "bloodRate" : title === "酒精异常" ? "alcRate" : ""}`
    }
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
        dataSource={title === "体温异常" ? mindDetail?.data?.temPerson : title === "酒精异常" ? mindDetail?.data?.alcPerson : title === "血压异常" ? mindDetail?.data?.bloodPerson : []}
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