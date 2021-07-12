import {Radar} from '@ant-design/charts';
import {Modal, Spin, Table} from 'antd';
import {useAlarmStatistics, useAlarmPagination, useAlarmModal, useProjectsSearchParams} from 'utils/home'
import {useDebounce} from "hook/useDebounce";

export const getType = (type: number) => {
  switch (type) {
    case 1:
      return "防遗忘"
    case 2:
      return "防漏带"

    case 3:
      return "防漏点"

    case 4:
      return "防遗漏"

    case 5:
      return "防疫情"

    case 6:
      return "防酒精"

    case 7:
      return "分离告警"

    case 8:
      return "离线告警"

    case 9:
      return "过时告警"

    case 10:
      return "低电告警"

    case 11:
      return "防血压"

    case 12:
      return "防遗留"

    default:
      break;
  }
}

const Page = () => {
  const {data: alarmStatistics, isLoading} = useAlarmStatistics()
  const {open} = useAlarmModal()

  const config = {
    data: alarmStatistics?.data,
    width: 400,
    height: 400,
    xField: "name",
    yField: "num",
    meta: {
      type: {alias: "类型"},
      num: {alias: "数量"}
    },
    xAxis: {
      line: null,
      tickLine: null,
    },
    yAxis: {
      label: false,
      grid: {
        alternateColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
    // 开启辅助点
    point: {},
    area: {},
  }

  return (
    <>
      {
        isLoading ? (
          <Spin size={"large"}/>
        ) : (
          <Radar
            {...config}
            onReady={(plot: any) => {
              plot.on('plot:click', (evt: any) => {
                const {x, y} = evt;
                const tooltipData = plot.chart.getTooltipItems({x, y});
                open(tooltipData[0].data.type)
              });
            }}
          />
        )
      }
      <OpenModal/>
    </>
  )
};

export default Page;

const OpenModal = () => {
  const {ModalOpen, close, AlarmId} = useAlarmModal()
  const [param, setParam] = useProjectsSearchParams()

  const {data: Alarm, isLoading} = useAlarmPagination(useDebounce({...param, type: AlarmId}, 500))

  const columns = [
    {
      title: "作业名称",
      dataIndex: 'workName',
    },
    {
      title: "工具名称",
      dataIndex: 'toolName',
    },
    {
      title: '小组名称',
      dataIndex: 'groupName',
    },
    {
      title: '创建时间',
      dataIndex: 'warnTime',
    },
    {
      title: '解除时间',
      dataIndex: 'relieveTime',
    },
    {
      title: '设备编号',
      dataIndex: 'groupId',
    },
    {
      title: '绑定人',
      dataIndex: 'createBy',
    },
    {
      title: '告警时间',
      dataIndex: 'createTime',
    },
    {
      title: '告警内容',
      dataIndex: 'content',
    },
  ]

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setParam({...param, index: p.current, size: p.pageSize})
  };

  return (
    <Modal
      visible={ModalOpen}
      onCancel={close}
      title={"告警统计"}
      footer={false}
      width={1600}
    >
      <Table
        columns={columns}
        dataSource={Alarm?.data}
        pagination={{total: Alarm?.count, current: param.index, pageSize: param.size}}
        loading={isLoading}
        onChange={handleTableChange}
        rowKey={(item: any, index: any) => index}
      />
    </Modal>
  )
}