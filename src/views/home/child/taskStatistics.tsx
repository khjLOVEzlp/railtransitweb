import {Line} from '@ant-design/charts';
import {useTaskStatistics, useTaskPagination, useTaskModal, useProjectsSearchParams} from 'utils/home'
import {Modal, Spin, Table} from "antd";
import {useDebounce} from "hook/useDebounce";

const PlanWorkPage = () => {
  const {data: taskStatistics, isLoading} = useTaskStatistics()
  const {open} = useTaskModal()

  const config = {
    data: taskStatistics?.data,
    xField: 'name',
    yField: 'num',
    label: {},
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: { showMarkers: false },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [{ type: 'marker-active' }],
    meta: {
      type: {alias: "类型"},
      num: {alias: "数量"}
    },
  };

  return (
    <>
      {
        isLoading ? (
          <Spin/>
        ) : (
          // @ts-ignore
          <Line
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

export const OpenModal = () => {
  const {ModalOpen, TaskId, close} = useTaskModal()
  const [param, setParam] = useProjectsSearchParams()
  const {data: Task, isLoading} = useTaskPagination(useDebounce({...param, type: TaskId}, 500))
  const columns = [
    {
      title: "计划名称",
      dataIndex: "name"
    },
    {
      title: "地铁线路",
      dataIndex: "lineName"
    },
    {
      title: "请站点",
      dataIndex: "pleaseName"
    },
    {
      title: "销站点",
      dataIndex: "pinName"
    },

    {
      title: "开始时间",
      dataIndex: "beginTime"
    },
    {
      title: "结束时间",
      dataIndex: "endTime"
    },
  ]

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setParam({...param, index: p.current, size: p.pageSize})
  };

  return (
    <Modal
      visible={ModalOpen}
      onCancel={close}
      title={"作业统计"}
      footer={false}
      width={1600}
    >
      <Table
        columns={columns}
        dataSource={Task?.data}
        pagination={{total: Task?.count, current: param.index, pageSize: param.size}}
        loading={isLoading}
        onChange={handleTableChange}
        rowKey={(item: any, index: any) => index}
      />
    </Modal>
  )
}

export default PlanWorkPage;