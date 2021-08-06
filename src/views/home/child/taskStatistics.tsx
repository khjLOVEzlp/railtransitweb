// import { Funnel } from '@ant-design/charts';
// import { useTaskStatistics, useTaskPagination, useTaskModal, useProjectsSearchParams } from '../request'
// import { Modal, Spin, Table } from "antd";
// import { useDebounce } from "hook/useDebounce";
// import { noData } from 'utils/verification';

// const PlanWorkPage = () => {
//   const { data: taskStatistics, isLoading, isError, isIdle } = useTaskStatistics()
//   const { open } = useTaskModal()

//   const config = {
//     data: isLoading || isError || isIdle ? [] : taskStatistics?.data,
//     xField: 'name',
//     yField: 'num',
//     isTransposed: true,
//     autoFit: true,
//     minSize: 0.5,
//     maxSize: 0.8,
//     conversionTag: false,
//     legend: {
//       layout: 'horizontal',
//       position: 'top'
//     }
//   };

//   return (
//     <>
//       {
//         isLoading ? (
//           <Spin />
//         ) : (
//           // @ts-ignore
//           <Funnel
//             {...config}
//             onReady={(plot: any) => {
//               plot.on('plot:click', (evt: any) => {
//                 const { x, y } = evt;
//                 const tooltipData = plot.chart.getTooltipItems({ x, y });
//                 open(tooltipData[0].data.type)
//               });
//             }}
//           />
//         )
//       }

//       <OpenModal />
//     </>
//   )
// };

// export const OpenModal = () => {
//   const { ModalOpen, TaskId, close } = useTaskModal()
//   const [param, setParam] = useProjectsSearchParams()
//   const { data: Task, isLoading } = useTaskPagination(useDebounce({ ...param, type: TaskId }, 500))
//   const columns = [
//     {
//       title: "计划名称",
//       dataIndex: "name"
//     },
//     {
//       title: "地铁线路",
//       dataIndex: "lineName"
//     },
//     {
//       title: "请站点",
//       dataIndex: "pleaseName"
//     },
//     {
//       title: "销站点",
//       dataIndex: "pinName"
//     },

//     {
//       title: "开始时间",
//       dataIndex: "beginTime"
//     },
//     {
//       title: "结束时间",
//       dataIndex: "endTime"
//     },
//   ]

//   const handleTableChange = (p: any, filters: any, sorter: any) => {
//     setParam({ ...param, index: p.current, size: p.pageSize })
//   };

//   return (
//     <Modal
//       visible={ModalOpen}
//       onCancel={close}
//       title={"作业统计"}
//       footer={false}
//       width={1600}
//     >
//       <Table
//         columns={columns}
//         dataSource={Task?.data}
//         pagination={{ total: Task?.count, current: param.index, pageSize: param.size }}
//         loading={isLoading}
//         onChange={handleTableChange}
//         rowKey={(item: any, index: any) => index}
//         locale={noData}
//       />
//     </Modal>
//   )
// }

// export default PlanWorkPage;

import { useEffect } from "react"
import * as echarts from 'echarts';

export default () => {
  /* const paperDataURI = 'data:image/png;base64,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';
  const option = {
    series: [{
      type: 'pictorialBar',
      name: 'all',
      hoverAnimation: true,
      label: {
        show: true,
        position: 'top',
        formatter: '{c} m',
        fontSize: 16,
        color: '#e54035'
      },
      data: [{
        value: 1000,
        symbol: 'image://' + paperDataURI,
        symbolRepeat: true,
        symbolSize: ['120%', '30%'],
        symbolOffset: [0, 10],
        symbolMargin: '60%',
        animationDelay: function (dataIndex: any, params: any) {
          return params.index * 30;
        }
      }],
    }]
  }

  useEffect(() => {
    // @ts-ignore
    echarts.init(document.getElementById('task') as HTMLElement).setOption(option)
  }, []) */

  return (
    <div id="task" style={{ height: "100%" }}></div>
  )
}