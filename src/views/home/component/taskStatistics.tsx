import * as echarts from "echarts";
import { useDebounce } from "hook/useDebounce";

import { useState, useEffect } from "react";
import { Modal, Table } from "antd";
import {
  useTaskModal,
  useTaskPagination,
  useTaskStatistics,
} from "api/home/work-statistics";
import { type } from "utils";
import { FullPageLoading } from "components/FullPageLoading";

const PlanWorkPage = ({ show }: { show: boolean }) => {
  const { data: list, isLoading } = useTaskStatistics();
  const { open } = useTaskModal();

  let xLabel = ["今日", "本周", "本月", "本季度", "半年", "今年"];
  const option = {
    tooltip: {},
    animation: false,
    grid: {
      top: "25%",
      bottom: "10%", //也可设置left和right设置距离来控制图表的大小
    },
    xAxis: {
      data: xLabel,
      axisLine: {
        show: true, //隐藏X轴轴线
        lineStyle: {
          color: "#11417a",
        },
      },
      axisTick: {
        show: false, //隐藏X轴刻度
      },
      axisLabel: {
        show: true,
        margin: 14,
        fontSize: 14,
        textStyle: {
          color: "#A3C0DF", //X轴文字颜色
        },
      },
    },
    yAxis: [
      {
        type: "value",
        gridIndex: 0,
        min: 0,
        max: 100,
        interval: 25,
        // splitNumber: 4,
        splitLine: {
          show: true,
          lineStyle: {
            color: "#113763",
            width: 1,
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#11417a",
          },
        },
        axisLabel: {
          show: true,
          margin: 14,
          fontSize: 14,
          textStyle: {
            color: "#A3C0DF", //X轴文字颜色
          },
        },
      },
    ],
    series: [
      {
        name: "计划数量",
        type: "bar",
        barWidth: 20,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#07ecd9",
              },
              {
                offset: 1,
                color: "#034881",
              },
            ]),
          },
        },
        data: list?.data.map((item: any) => item.num),
        z: 10,
        zlevel: 0,
        label: {
          show: true,
          position: "top",
          distance: 10,
          fontSize: 16,
          color: "#01fff4",
        },
      },
      {
        // 分隔
        type: "pictorialBar",
        itemStyle: {
          normal: {
            color: "#0F375F",
          },
        },
        symbolRepeat: "fixed",
        symbolMargin: 6,
        symbol: "rect",
        symbolClip: true,
        symbolSize: [20, 2],
        symbolPosition: "start",
        symbolOffset: [0, -1],
        // symbolBoundingData: this.total,
        data: list?.data.map((item: any) => item.num),
        width: 25,
        z: 0,
        zlevel: 1,
      },
    ],
  };

  useEffect(() => {
    const myEcharts = echarts.init(
      document.getElementById("statistics") as HTMLElement
    );
    myEcharts.resize();
    myEcharts.setOption(option);
    myEcharts.on("click", (params: any) => {
      open(type(params.name));
    });
  }, [option, list, show]);

  return (
    <>
    {isLoading && <FullPageLoading />}
    <div id="statistics" style={{ height: "100%", width: "100%" }}></div>

      <OpenModal />
    </>
  );
};

export const OpenModal = () => {
  const { ModalOpen, taskId, close } = useTaskModal();
  const [param, setParam] = useState({
    index: 1,
    size: 10,
    type: "",
  });
  const { data: Task, isLoading } = useTaskPagination(
    useDebounce({ ...param, type: taskId }, 500)
  );
  const columns = [
    {
      title: "计划名称",
      dataIndex: "name",
    },
    {
      title: "地铁线路",
      dataIndex: "lineName",
    },
    {
      title: "请站点",
      dataIndex: "pleaseName",
    },
    {
      title: "销站点",
      dataIndex: "pinName",
    },
    {
      title: "开始时间",
      dataIndex: "beginTime",
    },
    {
      title: "结束时间",
      dataIndex: "endTime",
    },
  ];
  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize });
  };
  return (
    <Modal
      forceRender={true}
      visible={ModalOpen}
      onCancel={close}
      title={"作业统计"}
      footer={false}
      width={1600}
    >
      <Table
        columns={columns}
        dataSource={Task?.data}
        pagination={{
          total: Task?.count,
          current: param.index,
          pageSize: param.size,
        }}
        loading={isLoading}
        onChange={handleTableChange}
        rowKey={(item) => item.key}
      />
    </Modal>
  );
};

export default PlanWorkPage;
