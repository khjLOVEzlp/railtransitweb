import styled from "@emotion/styled";
import {Form, Modal, Select, Table} from "antd";
import {useLineList} from "utils/statistics/taskStatistics";
import {Column} from '@ant-design/charts';
import {
  useProjectsSearchParams,
  useAlarmModal,
  useAlarmStatistics,
  useAlarmPagination
} from 'utils/statistics/alarmStatistics'
import {useDebounce} from "hook/useDebounce";
import {useEffect} from "react";

export const WorkWarn = () => {
  const {data: lineList} = useLineList()
  const [param, setParam] = useProjectsSearchParams()

  useEffect(() => {
    if (lineList) {
      setParam({subwayId: lineList?.data[0]?.id, time: 3, index: 1, size: 10})
    }
  }, [lineList])
  const {open} = useAlarmModal()
  const {data: alarmStatistics, isLoading, isError} = useAlarmStatistics(param)

  const lineChange = (value: any) => {
    setParam({subwayId: value})
  }

  const timeChange = (value: any) => {
    setParam({time: value})
  }

  const config = {
    data: isLoading || isError ? [] : alarmStatistics?.data,
    xField: 'name',
    yField: 'num',
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
      name: {alias: '类型'},
      num: {alias: '数量'},
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
              style={{width: 120}}
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
              style={{width: 120}}
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
              open()
            });
          }}
        />

        <AlarmModal/>
      </Main>
    </>
  )
}

export const AlarmModal = () => {
  const {ModalOpen, close} = useAlarmModal()
  const [param, setParam] = useProjectsSearchParams()
  const {data: alarmPagination, isLoading} = useAlarmPagination(useDebounce(param, 500))
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
    setParam({...param, index: p.current, size: p.pageSize})
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
        pagination={{total: alarmPagination?.count, current: param.index, pageSize: param.size}}
        loading={isLoading}
        onChange={handleTableChange}
        rowKey={(item: any, index: any) => index}
      />
    </Modal>
  )
}

const Header = styled.div`
  height: 12.5rem;
  background: #fff;
  margin-bottom: 1rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  justify-content: space-between;
`

const Main = styled.div`
  background: #fff;
  height: 100%;
  border-radius: 1rem;
  box-sizing: border-box;
  padding: 1.5rem 1.5rem;
`