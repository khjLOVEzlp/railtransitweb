import {Column} from '@ant-design/charts';
import {Modal, Spin, Table} from 'antd';
import {usePlanStatistics, usePlanPagination, usePlanModal, useProjectsSearchParams} from 'utils/home'
import {useDebounce} from "hook/useDebounce";

const PlanType = () => {
  const {open} = usePlanModal()
  const {data: planStatistics, isLoading} = usePlanStatistics()

  const config = {
    data: planStatistics?.data,
    xField: 'name',
    yField: 'num',
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
      type: {alias: "类型"},
      num: {alias: "数量"}
    },
  }

  return <>
    {
      isLoading ? (
        <Spin/>
      ) : (
        // @ts-ignore
        <Column
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
};

const OpenModal = () => {
  const {ModalOpen, close, PlanId} = usePlanModal()
  const [param, setParam] = useProjectsSearchParams()

  const {data: Plan, isLoading} = usePlanPagination(useDebounce({...param, type: PlanId}, 500))
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
      footer={false}
      visible={ModalOpen}
      onCancel={close}
      title={"计划统计"}
      width={1600}
    >
      <Table
        columns={columns}
        dataSource={Plan?.data}
        pagination={{total: Plan?.count, current: param.index, pageSize: param.size}}
        loading={isLoading}
        onChange={handleTableChange}
        rowKey={(item: any, index: any) => index}
      />
    </Modal>
  )
}

export default PlanType;