import { Form, Modal, Select, Table } from "antd";
import { useLineList } from "../workCount/request";
import { Column } from '@ant-design/charts';
import {
  useAlarmModal,
  useAlarmStatistics,
  useAlarmPagination
} from './request'
import { useDebounce } from "hook/useDebounce";
import { useState, useEffect } from "react";
import { Header, Main } from "components/Styled";
import { noData } from "utils/verification";

export const WorkWarn = () => {
  const [form] = Form.useForm()
  const { data: lineList, isLoading: loading, isSuccess: success } = useLineList()
  const [params, setParams] = useState({
    time: "",
    subwayId: ""
  })

  useEffect(() => {
    if (success && lineList.data && lineList.data.length > 0) {
      setParams({ time: "3", subwayId: lineList.data[0].id })
    }
  }, [])

  useEffect(() => {
    if (success && lineList.data && lineList.data.length > 0) {
      form.setFieldsValue({ subwayId: lineList.data[0].id })
      setParams({ time: "3", subwayId: lineList.data[0].id })
    }
  }, [success])

  const { open } = useAlarmModal()

  const { data: alarmStatistics, isSuccess } = useAlarmStatistics(params)

  console.log(alarmStatistics);


  const lineChange = (value: string) => {
    setParams({ ...params, subwayId: String(value) })
  }

  const timeChange = (value: string) => {
    setParams({ ...params, time: String(value) })
  }

  const noData = [
    {
      name: "遗忘",
      num: 0
    },
    {
      name: "漏带",
      num: 0
    },
    {
      name: "漏点",
      num: 0
    },
    {
      name: "遗漏",
      num: 0
    },
    {
      name: "疫情",
      num: 0
    },
    {
      name: "酒精",
      num: 0
    },
    {
      name: "分离告警",
      num: 0
    },
    {
      name: "离线告警",
      num: 0
    },
    {
      name: "过时告警",
      num: 0
    },
    {
      name: "低电告警",
      num: 0
    },
    {
      name: "血压",
      num: 0
    },
    {
      name: "遗留",
      num: 0
    },
  ]

  const config = {
    data: isSuccess && alarmStatistics?.data.length > 0 ? alarmStatistics?.data : noData,
    xField: 'name',
    yField: 'num',
    maxColumnWidth: 100,
    legend: {
      layout: 'horizontal',
      position: 'right'
    },
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
      name: { alias: '类型' },
      num: { alias: '数量' },
    },
  };

  return (
    <>
      <Header>
        <Form
          form={form}
          layout={"inline"}
        >
          <Form.Item
            name={"subwayId"}
          >
            <Select
              loading={loading}
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
        <Column
          {...config}
          onReady={(plot: any) => {
            plot.on('plot:click', (evt: any) => {
              open(params.subwayId, params.time)
            });
          }}
        />

        <AlarmModal params={params} />
      </Main>
    </>
  )
}

export const AlarmModal = ({ params }: { params: { subwayId: string, time: string } }) => {
  const { ModalOpen, close } = useAlarmModal()

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

  const { data: alarmPagination, isLoading } = useAlarmPagination(useDebounce(param, 500))
  const columns = [
    {
      title: "作业名",
      dataIndex: "workName"
    },
    {
      title: "作业小组",
      dataIndex: "groupName"
    },
    {
      title: "作业时间",
      dataIndex: "warnTime"
    },
    {
      title: "作业内容",
      dataIndex: "content"
    },
  ]
  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize })
  };

  return (
    <Modal
      visible={ModalOpen}
      onCancel={close}
      title={"作业告警统计"}
      footer={false}
      width={1600}
    >
      <Table
        columns={columns}
        dataSource={alarmPagination?.data}
        pagination={{ total: alarmPagination?.count, current: param.index, pageSize: param.size }}
        loading={isLoading}
        onChange={handleTableChange}
        rowKey={(item: any, index: any) => index}
        locale={noData}
      />
    </Modal>
  )
}
