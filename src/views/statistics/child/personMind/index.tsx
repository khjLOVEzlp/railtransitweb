import styled from "@emotion/styled";
import {useLineList} from "utils/statistics/taskStatistics";
import {Form, Modal, Select, Table} from "antd";
import {Column} from "@ant-design/charts";
import {
  useProjectsSearchParams,
  useMindModal,
  useMindStatistics,
  useMindStatisticsDetail
} from 'utils/statistics/mindStatistics'

export const PersonMind = () => {
  const {data: lineList} = useLineList()
  const {open} = useMindModal()
  const [param = {subwayId: lineList?.data[0].id, time: 3}, setParam] = useProjectsSearchParams()
  const {data: mindStatistics, isLoading, isError} = useMindStatistics(param)

  const lineChange = (value: any) => {
    setParam({subwayId: value})
  }

  const timeChange = (value: any) => {
    setParam({time: value})
  }

  const data = [
    {
      "className": "变电七分部",
      "type": "体温异常率",
      "value": 66,
    },
    {
      "className": "变电七分部",
      "type": "酒精异常率",
      "value": 66,
    },
    {
      "className": "变电七分部",
      "type": "血压异常率",
      "value": 66,
    },
    {
      "className": "变电二班",
      "type": "体温异常率",
      "value": 66,
    },
    {
      "className": "变电二班",
      "type": "酒精异常率",
      "value": 66,
    },
    {
      "className": "变电二班",
      "type": "血压异常率",
      "value": 66,
    },
    {
      "className": "变电三班",
      "type": "体温异常率",
      "value": 66,
    },
    {
      "className": "变电三班",
      "type": "酒精异常率",
      "value": 66,
    },
    {
      "className": "变电三班",
      "type": "血压异常率",
      "value": 66,
    },
  ]

  const config = {
    data: data,
    xField: "className",
    yField: "value",
    seriesField: "type",
    maxColumnWidth: 100,
    isGroup: "true",
    columnStyle: {
      radius: [20, 20, 0, 0]
    }
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

        <PersonMindModal/>
      </Main>
    </>
  )
}

const PersonMindModal = () => {
  const {ModalOpen, close} = useMindModal()
  const [param] = useProjectsSearchParams()
  const {data: mindDetail} = useMindStatisticsDetail(param)

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
      <Table columns={columns} pagination={false}/>
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
  width: 100%;
  border-radius: 1rem;
  padding: 1.5rem 1.5rem;
  //display: flex;

  > * {
    flex: 1;
  }
`
