import { Column, RadialBar } from '@ant-design/charts';
import { Modal, Spin, Table } from 'antd';
import { usePlanStatistics, usePlanPagination, usePlanModal, useProjectsSearchParams } from 'utils/home'
import { useDebounce } from "hook/useDebounce";

const PlanType = () => {
  const { open } = usePlanModal()
  const { data: planStatistics, isLoading } = usePlanStatistics()

  /* const config = {
    data: planStatistics?.data,
    xField: 'name',
    yField: 'num',
    padding: [10, 0, 20, 20],
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
      type: { alias: "类型" },
      num: { alias: "数量" }
    },
    point: {},
  } */

  var config = {
    data: planStatistics?.data,
    xField: 'name',
    yField: 'num',
    maxAngle: 250,
    radius: 0.8,
    innerRadius: 0.1,
    maxBarWidth: 10,
    /* legend: {
      layout: 'horizontal',
      position: 'bottom'
    }, */
    tooltip: {
      formatter: function formatter(datum: any) {
        return {
          name: '数量',
          value: datum.num,
        };
      },
    },
    barStyle: { lineCap: 'round' },
    meta: {
      type: { alias: "类型" },
      num: { alias: "数量" }
    },
    colorField: 'name',
    color: function color(_ref: any) {
      var star = _ref.name;
      switch (star) {
        case "今日":
          return "#33E598"
        case "本月":
          return "#FF585D"
        case "本周":
          return "#62C4E9"
        case "本季度":
          return "#FFD876"
        case "半年":
          return "#9E5AFA"
        case "今年":
          return "#5A7FFA"
        default:
          break;
      }
    },
  };

  return <>
    {
      isLoading ? (
        <Spin />
      ) : (
        // @ts-ignore
        <RadialBar
          {...config}
          onReady={(plot: any) => {
            plot.on('plot:click', (evt: any) => {
              const { x, y } = evt;
              const tooltipData = plot.chart.getTooltipItems({ x, y });
              open(tooltipData[0]?.data?.type)
            });
          }}
        />
      )
    }
    <OpenModal />
  </>
};

const OpenModal = () => {
  const { ModalOpen, close, PlanId } = usePlanModal()
  const [param, setParam] = useProjectsSearchParams()

  const { data: Plan, isLoading } = usePlanPagination(useDebounce({ ...param, type: PlanId }, 500))
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
      footer={false}
      visible={ModalOpen}
      onCancel={close}
      title={"计划统计"}
      width={1600}
    >
      <Table
        columns={columns}
        dataSource={Plan?.data}
        pagination={{ total: Plan?.count, current: param.index, pageSize: param.size }}
        loading={isLoading}
        onChange={handleTableChange}
        rowKey={(item: any, index: any) => index}
      />
    </Modal>
  )
}

export default PlanType;