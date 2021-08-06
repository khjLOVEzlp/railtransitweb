import { Radar } from '@ant-design/charts';
import { Modal, Spin, Table } from 'antd';
import { useAlarmStatistics, useAlarmPagination, useAlarmModal, useProjectsSearchParams } from '../request'
import { useDebounce } from "hook/useDebounce";
import { noData } from 'utils/verification';

const Page = () => {
  const { data: alarmStatistics, isLoading } = useAlarmStatistics()
  const { open } = useAlarmModal()

  const config = {
    data: alarmStatistics?.data,
    // padding: 10,
    xField: "name",
    yField: "num",
    padding: [30, 30, 30, 30],
    meta: {
      num: {
        alias: '数量',
        min: 0,
        nice: true,
      },
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
          <Spin size={"large"} />
        ) : (
          <Radar
            {...config}
            onReady={(plot: any) => {
              plot.on('plot:click', (evt: any) => {
                const { x, y } = evt;
                const tooltipData = plot.chart.getTooltipItems({ x, y });
                open(tooltipData[0].data.type)
              });
            }}
          />
        )
      }
      <OpenModal />
    </>
  )
};

export default Page;

const OpenModal = () => {
  const { ModalOpen, close, AlarmId } = useAlarmModal()
  const [param, setParam] = useProjectsSearchParams()

  const { data: Alarm, isLoading } = useAlarmPagination(useDebounce({ ...param, type: AlarmId }, 500))

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
    setParam({ ...param, index: p.current, size: p.pageSize })
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
        pagination={{ total: Alarm?.count, current: param.index, pageSize: param.size }}
        loading={isLoading}
        onChange={handleTableChange}
        rowKey={(item: any, index: any) => index}
        locale={noData}
      />
    </Modal>
  )
}
