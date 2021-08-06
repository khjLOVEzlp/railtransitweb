import { Funnel } from '@ant-design/charts';
import { useTaskStatistics, useTaskPagination, useTaskModal, useProjectsSearchParams } from '../request'
import { Modal, Spin, Table } from "antd";
import { useDebounce } from "hook/useDebounce";
import { noData } from 'utils/verification';

const PlanWorkPage = () => {
  const { data: taskStatistics, isLoading, isError, isIdle } = useTaskStatistics()
  const { open } = useTaskModal()

  const config = {
    data: isLoading || isError || isIdle ? [] : taskStatistics?.data,
    xField: 'name',
    yField: 'num',
    isTransposed: true,
    autoFit: true,
    minSize: 0.5,
    maxSize: 0.8,
    conversionTag: false,
    legend: {
      layout: 'horizontal',
      position: 'top'
    }
  };

  return (
    <>
      {
        isLoading ? (
          <Spin />
        ) : (
          // @ts-ignore
          <Funnel
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

export const OpenModal = () => {
  const { ModalOpen, TaskId, close } = useTaskModal()
  const [param, setParam] = useProjectsSearchParams()
  const { data: Task, isLoading } = useTaskPagination(useDebounce({ ...param, type: TaskId }, 500))
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
    setParam({ ...param, index: p.current, size: p.pageSize })
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
        pagination={{ total: Task?.count, current: param.index, pageSize: param.size }}
        loading={isLoading}
        onChange={handleTableChange}
        rowKey={(item: any, index: any) => index}
        locale={noData}
      />
    </Modal>
  )
}

export default PlanWorkPage;