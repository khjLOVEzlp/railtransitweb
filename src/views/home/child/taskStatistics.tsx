import { useEffect, useState } from "react"
import * as echarts from 'echarts';
import { useTaskModal, useTaskPagination, useTaskStatistics } from "../request";
import {Modal, Table} from 'antd'
import { useDebounce } from "hook/useDebounce";
import {type} from 'utils'

export default () => {
  const { data: list, isSuccess, isLoading } = useTaskStatistics()
  console.log(list);
  
  const { open } = useTaskModal()
  const data = [
    {
      value: 3,
      // symbol: 'image://' + paperDataURI,
      symbol: 'diamond',
      symbolRepeat: true,
      symbolSize: ['100%', '50%'],
      symbolOffset: [0, 10],
      symbolMargin: '-10%',
      animationDelay: function (dataIndex: any, params: any) {
        return params.index * 30;
      },
      itemStyle: {
        color: 'rgba(255,0,0, 0.2)'
      }
    }, {
      value: 4,
      // symbol: 'image://' + paperDataURI,
      symbol: 'diamond',
      z: 20,
      symbolRepeat: true,
      symbolSize: ['100%', '50%'],
      symbolOffset: [0, 10],
      symbolMargin: '-10%',
      animationDelay: function (dataIndex: any, params: any) {
        return params.index * 30;
      },
      itemStyle: {
        color: 'rgba(255,165,0, 0.5)'
      }
    }, {
      value: 5,
      // symbol: 'image://' + paperDataURI,
      symbol: 'diamond',
      z: 20,
      symbolRepeat: true,
      symbolSize: ['100%', '50%'],
      symbolOffset: [0, 10],
      symbolMargin: '-10%',
      animationDelay: function (dataIndex: any, params: any) {
        return params.index * 30;
      },
      itemStyle: {
        color: 'rgba(205,205,205, 0.5)'
      }
    }, {
      value: 6,
      // symbol: 'image://' + paperDataURI,
      symbol: 'diamond',
      z: 20,
      symbolRepeat: true,
      symbolSize: ['100%', '50%'],
      symbolOffset: [0, 10],
      symbolMargin: '-10%',
      animationDelay: function (dataIndex: any, params: any) {
        return params.index * 30;
      },
      itemStyle: {
        color: 'rgba(0,100,0, 0.2)'
      }
    }, {
      value: 7,
      // symbol: 'image://' + paperDataURI,
      symbol: 'diamond',
      z: 20,
      symbolRepeat: true,
      symbolSize: ['100%', '50%'],
      symbolOffset: [0, 10],
      symbolMargin: '-10%',
      animationDelay: function (dataIndex: any, params: any) {
        return params.index * 30;
      },
      itemStyle: {
        color: 'rgba(0,127,255, 0.5)'
      }
    }, {
      value: 9,
      // symbol: 'image://' + paperDataURI,
      symbol: 'diamond',
      z: 20,
      symbolRepeat: true,
      symbolSize: ['100%', '50%'],
      symbolOffset: [0, 10],
      symbolMargin: '-10%',
      animationDelay: function (dataIndex: any, params: any) {
        return params.index * 30;
      },
      itemStyle: {
        color: 'rgba(0,0,255, 0.2)'
      }
    }
  ]

  const option = {
    tooltip: {},
    xAxis: [{
      data: ['今日', '本周', '本月', '本季度', '半年', '今年'],
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        margin: 20,
        textStyle: {
          color: '#000',
          fontSize: 14
        }
      },
    }],
    yAxis: {
      splitLine: { show: false },
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { show: false },
    },

    series: [{
      type: 'pictorialBar',
      hoverAnimation: true,
      label: {
        show: true,
        position: 'top',
        formatter: '{c}',
        fontSize: 16,
        color: '#000'
      },
      data,

    }]
  };

  useEffect(() => {
    const myEcharts = echarts.init(document.getElementById('task') as HTMLElement)
    myEcharts.setOption(option)
    myEcharts.on('click', (params: any) => {
      console.log(type(params.name));
      open(type(params.name))
    })
  }, [data])

  if (isSuccess) {
    data.forEach((key: { [key: string]: unknown }, index: number) => {
      key["value"] = list.data[index]["num"]
      key["modal"] = list.data[index]['type']
    })
  }

  return (
    <>
    <div id="task" style={{ height: "100%" }}></div>
    <OpenModal />
    </>
  )
}

export const OpenModal = () => {
  const { ModalOpen, taskId, close } = useTaskModal()
  const [param, setParam] = useState({
    index: 1,
    size: 10,
    type: ""
  })
  const { data: Task, isLoading } = useTaskPagination(useDebounce({ ...param, type: taskId }, 500))
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
      />
    </Modal>
  )
}